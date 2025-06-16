const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Product = require("./model/productModel");

passport.use(
  new LocalStrategy(async (UserName, password, done) => {
    try {

      const user = await Product.findOne({ username: UserName });

      if (!user) return done(null, false, { message: "incorrect username" });

      const isPassword = await user.comparePassword(password);
      if (!isPassword) {
        return done(null, false, { message: "incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
