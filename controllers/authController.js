const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_get_sign_up = (req, res) => {
  res.render("sign_up", { title: "Sign Up" });
};

const user_post_sign_up = (req, res, next) => {
  try {
    // const salt = bcrypt.genSaltSync(10);
    // bcrypt.hash(req.body.password, salt, (err, hashres) => {
    // const user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashres,
    //   confirmpassword: hashres,
    // });
    const newUser = User.create(req.body);

    newUser.save().then((result) => {
      res.redirect("/user/log_in");
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

//   if (err) {
//     console.log(err);
//     req.redirect("/user/sign-up");
//   }
//   user.save().then((result) => {
//     res.redirect("/user/log_in");
//   });
// });
//   } catch {
//     res.redirect("/user/sign_up");
//   }
// };

const user_get_log_in = (req, res) => {
  res.render("log_in", { title: "Log In" });
};

const user_post_log_in = (req, res) => {
  const studentid = req.body.studentid;
  const password = req.body.password;
  User.findOne({ studentid: studentid }).then((user) => {
    if (!user) {
      res.redirect("/user/sign_up");
    }
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const token = jwt.sign({ _id: user._id }, "secret");
        res.cookie("token", token, { expire: new Date() + 9999 });
        res.redirect("/user/profile");
      } else {
        res.redirect("/user/log_in");
      }
    });
  });
};

const user_delete = (req, res) => {
  //   const id = req.params.id;
  //   Order.findByIdAndDelete(id)
  //     .then(result => {
  //       res.json({ redirect: '/orders' });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
};

const user_profile = (req, res) => {
  res.render("profile", { title: "Profile" });
  //   const id = req.params.id;
  //   Order.findById(id)
  //     .then(result => {
  //       res.render('details', { order: result, title: 'Order Details' });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.render('404', { title: 'Order not found' });
  //     });
};

module.exports = {
  user_get_sign_up,
  user_post_sign_up,
  user_get_log_in,
  user_post_log_in,
  user_profile,
  user_delete,
};
