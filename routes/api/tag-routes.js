// Import express router and models
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Create a an asynchronous GET request to the /api/tags endpoint
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // get the data from the Tag table
    const allTagData = await Tag.findAll({
      // include the Product table
      include: [{ model: Product }],
    });
    // if data is found, return the data
    res.status(200).json(allTagData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

// Create a an asynchronous GET request to the /api/tags/:id endpoint
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // get the data from the Tag table 
    const getTagData = await Tag.findByPk(req.params.id, {
      // include the Product table
      include: [{ model: Product }],
      });
      // if no data is found, return an error
      if (!getTagData) {
        res.status(404).json({ message: 'No tag was found with that id!' });
        return;
      }
      // if data is found, return the data
      res.status(200).json(getTagData);
    } catch (err) {
      // if no data is found, return an error
      res.status(500).json(err);
    }
});

// Create a an asynchronous POST request to the /api/tags endpoint
router.post('/', async (req, res) => {
  // create a new tag
  try {
    // get the data from the Tag table
    const postTagData = await Tag.create(req.body);
    // if data is found, return the data
    res.status(200).json(postTagData);
  } catch (err) {
    // if no data is found, return an error
    res.status(400).json(err);
  }
});

// Create a an asynchronous PUT request to the /api/tags/:id endpoint
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // get the data from the Tag table
    const putTagData = await Tag.update(req.body, {
      // define the Tag id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!putTagData) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(putTagData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});


// Create a an asynchronous DELETE request to the /api/tags/:id endpoint
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // get the data from the Tag table
    const deleteTagData = await Tag.destroy({
      // define the Tag id parameter in the where clause
      where: {
        id: req.params.id,
      },
    });
    // if no data is found, return an error
    if (!deleteTagData) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    // if data is found, return the data
    res.status(200).json(deleteTagData);
  } catch (err) {
    // if no data is found, return an error
    res.status(500).json(err);
  }
});

module.exports = router;
