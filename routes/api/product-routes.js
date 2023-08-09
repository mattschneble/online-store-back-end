// Import express router and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Create an asynchronous GET request to the /api/products endpoint
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    // get the data from the Product table
    const allProductData = await Product.findAll({
      // include the Category and Tag tables
      include: [{ model: Category }, 
                { model: Tag }],
    });
    // if data is found, return the data
    res.status(200).json(allProductData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// Create an asynchronous GET request to the /api/products/:id endpoint
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    // get the data from the Product table
    const getProductData = await Product.findByPk(req.params.id, {
      // include the Category and Tag tables
      include: [{ model: Category },
                { model: Tag }],
      });
    // if no data is found, return an error
    if (!getProductData) {
      res.status(404).json({ message: 'No product was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(getProductData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => {
          return {
            productId: product.id,
            tagId,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// create an asynchronous DELETE request to the /api/products/:id endpoint
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    // get the data from the Product table
    const deleteProductData = await Product.destroy({
      // define the id parameter in the WHERE clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!deleteProductData) {
      res.status(404).json({ message: 'No product was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(deleteProductData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

module.exports = router;
