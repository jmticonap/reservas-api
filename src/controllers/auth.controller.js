const authService = require("../services/auth.service")

const authController = {
  userLogin: async (req, res, next) => {
    try {
      // email y password
      const credentials = req.body;
      const result = await authService.authenticate(credentials)
      
      if (result) {
        const { id, name, email } = result.result;
        const user = { id, name, email };
        const token = authService.genToken(user);
        user.token = token;
        res.json(user);
      } else {
        res
          .status(400)
          .json({ message: "Invalid information" });
      }
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Email or password invalid",
      });
    }
  }
}

module.exports = authController