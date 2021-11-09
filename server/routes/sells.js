const Sell = require("../models/Sell");
const router = require("express").Router();

function makeid(length) {
    var fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
    const segundo = fecha.getSeconds();
    const suma = hora+minuto+segundo;

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + '' + dia + '' + mes + '' + anio + '-' + suma;
}

// Add sell
router.post('/', async (req, res) => {
    const { amount, product, date, clientId, clientName, sellerId } = req.body;
    const value = (product.price * amount);
    id = makeid(2);
    let newSell = new Sell({ id, value, amount, product, date, clientId, clientName, sellerId });
    newSell.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Something went wrong...'
            })
        } else {
            res.json('Sell Saved');
        }
    })
});

// Upsate sell
router.put('/:id', async (req, res) => {
    try {
        const { amount, product, date, clientId, clientName, sellerId, state } = req.body;
        const value = (product.price * amount);
        let newSell = { value, amount, product, date, clientId, clientName, sellerId, state };
        await Sell.findByIdAndUpdate(req.params.id, newSell);
        res.json('Sell Updated');
    } catch (error) {
        console.log(error);
        res.json(error);
    }

});

// Delete sell
router.delete("/:id", async (req, res) => {
    try {
        await Sell.findByIdAndDelete(req.params.id);
        res.status(200).json('Sell has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get sell
router.get('/:id', async (req, res) => {
    try {
        const sell = await Sell.findById(req.params.id);
        res.status(200).json(sell);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get all sell
router.get('/', async (req, res) => {
    const sell = await Sell.find();
    res.json(sell);
});

module.exports = router;