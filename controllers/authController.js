const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.redirect("/user/log_in");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
    };