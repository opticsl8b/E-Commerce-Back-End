const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        as: "products",
      },
    ],
  }).then((tags) => {
    res.json(tags);
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      as: "products",
    },
  }).then((tag) => {
    if (!tag) {
      res.status(400).json({
        message: "No tag was found with this id",
      });
      return;
    }
    res.json(tag);
  });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((tag) => {
    res.json(tag);
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((tag) => {
    if (!tag) {
      res.status(400).json({
        message: "No tag was found under this id",
      });
      return;
    }
    res.json(tag);
  });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
    if (!tag) {
      res.status(400).json({
        message: "No tag was found under this id",
      });
      return;
    }
    res.json(tag);
  });
});

module.exports = router;
