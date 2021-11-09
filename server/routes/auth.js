const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { Server } = require("socket.io");

const client = new OAuth2Client("155052294302-d7rjjhrng5ub0pfjjvkvrv3igu424uvi.apps.googleusercontent.com")

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

router.post('/login', async (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: "155052294302-d7rjjhrng5ub0pfjjvkvrv3igu424uvi.apps.googleusercontent.com" }).then(response => {
        const { email_verified, name, email, picture } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                } else {
                    if (user) {
                        try {
                            const token = jwt.sign({
                                _id: user._id
                            }, process.env.JWT_SECRET, { expiresIn: "3d" })
                            const { _id, name, email, picture, state, role } = user;
                            io.emit("newUser", user);
                            res.json({
                                token,
                                user: { _id, name, email, picture, state, role }
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        let newUser = new User({ name, email, picture });
                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }
                            try {
                                const token = jwt.sign({
                                    _id: data._id
                                }, process.env.JWT_SECRET, { expiresIn: "3d" })
                                const { _id, name, email, picture, state, role } = newUser;
                                res.json({
                                    token,
                                    user: { _id, name, email, picture, state, role }
                                })
                            } catch (error) {
                                console.log(error);
                            }
                        })

                    }
                }
            })
        }
    });

    console.log();
})

module.exports = router;



