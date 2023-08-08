// Import express router and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Create a an asynchronous GET request to the /api/categories endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // get the data from the Category table
    const categoryData = await Category.findAll({
      // include the Product table
      include: [{ model: Product }],
    });
    // if data is found, return the data
    res.status(200).json(categoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// Create a an asynchronous GET request to the /api/categories/:id endpoint
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // get the data from the Category table
    const categoryData = await Category.findByPk(req.params.id, {
      // include the Product table
      include: [{ model: Product }],
    });
    // if no data is found, return an error
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(categoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    // if data is found, return the data
    res.status(200).json(categoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // get the data from the Category table
    const categoryData = await Category.update(req.body, {
      // define the id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(categoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // get the data from the Category table
    const categoryData = await Category.destroy({
      // define the id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(categoryData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

module.exports = router;