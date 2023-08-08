// Import express router and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Create an asynchronous GET request to the /api/categories endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // get the data from the Category table
    const allCategoryData = await Category.findAll({
      // include the Product table
      include: [{ model: Product }],
    });
    // if data is found, return the data
    res.status(200).json(allCategoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// Create an asynchronous GET request to the /api/categories/:id endpoint
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // get the data from the Category table
    const getCategoryData = await Category.findByPk(req.params.id, {
      // include the Product table
      include: [{ model: Product }],
    });
    // if no data is found, return an error
    if (!getCategoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(getCategoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// Create an asynchronous POST request to the /api/categories endpoint
router.post('/', async (req, res) => {
  // create a new category
  try {
    // get the data from the Category table
    const postCategoryData = await Category.create(req.body);
    // if data is found, return the data
    res.status(200).json(postCategoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(400).json(err);
  }
});

// Create an asynchronous PUT request to the /api/categories/:id endpoint
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // get the data from the Category table
    const putCategoryData = await Category.update(req.body, {
      // define the id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!putCategoryData[0]) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(putCategoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});


// Create an asynchronous DELETE request to the /api/categories/:id endpoint
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // get the data from the Category table
    const deleteCategoryData = await Category.destroy({
      // define the id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!deleteCategoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(deleteCategoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

module.exports = router;