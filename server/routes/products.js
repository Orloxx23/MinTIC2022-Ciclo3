const Product = require("../models/Product");
const router = require("express").Router();

// Add product
router.post('/', async (req, res) => {
    const { description, price, state } = req.body;
    let newProduct = new Product({ description, price, state });
    newProduct.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Something went wrong...'
            })
        } else {
            res.json('Product Saved');
        }
    })
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const { description, price, state } = req.body;
        const newProduct = { description, price, state };
        await Product.findByIdAndUpdate(req.params.id, newProduct);
        res.json('Product Updated');
    } catch (error) {
        console.log(error);
        res.json(error);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get all products
router.get('/', async (req, res) => {
    const product = await Product.find();
    res.json(product);
});

module.exports = router;