const router = require("express").Router();

router.use("/friends", require("./friends"));
router.use("/bdaylist", require("./bdaylist"));
router.use("/api-docs", require("./swagger"));

const passport = require("passport");
const isLoggedIn = require("../middleware/auth");
router.get("/", isLoggedIn, (req, res) => {
  res.send(`Hello world ${req.user.displayName}`);
});

router.get("/login", (req, res) => {
  passport.authenticate("github", { scope: ["user:email"] })(req, res);
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return res.send(err);
    }
  });
  res.redirect("/");
});

module.exports = router;
