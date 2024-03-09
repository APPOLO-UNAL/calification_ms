import Calification from "../model/calification.model";

export const createCalification = async (req, res, next) => {
    try {
      const Calification = new Task(req.body);
      await Calification.save();
      res.redirect("/");
    } catch (error) {
      return res.render("error", { errorMessage: error.message });
    }
  };