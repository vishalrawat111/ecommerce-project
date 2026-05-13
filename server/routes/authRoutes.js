const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("Auth Routes Loaded");

const User = require("../models/User");

const router = express.Router();

/* ================= TEST ROUTE ================= */

router.get("/test", (req, res) => {

    res.json({
        message: "Auth Route Working"
    });
});

/* ================= REGISTER ROUTE ================= */

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            mobile,
            password
        } = req.body;

        // CHECK REQUIRED

        if ((!email && !mobile) || !password) {

            return res.status(400).json({

                message:
                    "Email or Mobile required"
            });
        }

        // CHECK EXISTING USER

        const existingUser =
            await User.findOne({

                $or: [

                    { email },

                    { mobile }
                ]
            });

        if (existingUser) {

            return res.status(400).json({

                message:
                    "User already exists"
            });
        }

        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // CREATE USER

        const newUser =
            new User({

                name,

                email,

                mobile,

                password: hashedPassword
            });

        await newUser.save();

        res.status(201).json({

            message:
                "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server Error"
        });
    }
});

/* ================= LOGIN ROUTE ================= */

router.post("/login", async (req, res) => {

    try {

        const {
            emailOrMobile,
            password
        } = req.body;

        // FIND USER

        const user =
            await User.findOne({

                $or: [

                    { email: emailOrMobile },

                    { mobile: emailOrMobile }
                ]
            });

        if (!user) {

            return res.status(400).json({

                message:
                    "User not found"
            });
        }

        // CHECK PASSWORD

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({

                message:
                    "Wrong password"
            });
        }

        // CREATE TOKEN

        const token =
            jwt.sign(

                {
                    id: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }
            );

        // RESPONSE

        res.json({

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                mobile: user.mobile
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server Error"
        });
    }
});

module.exports = router;