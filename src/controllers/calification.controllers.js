const Calification = require( "../model/calification.model");

const createCalification = async (req, res, next) => {
    try {
      const Calification = new Calification(req.body);
      await Calification.save();
      res.redirect("/");
    } catch (error) {
      return res.render("error", { errorMessage: error.message });
    }
  };