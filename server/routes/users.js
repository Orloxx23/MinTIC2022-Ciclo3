const User = require("../models/User");
const router = require("express").Router();
const io = require("socket.io");

// update user
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// delete user
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

/*router.get("/", async (req, res) => {
    const userId = req.query._id;
    const email = req.query.email;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ email: email });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});*/

// get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;