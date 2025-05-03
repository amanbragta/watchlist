import { User } from "../models/user.model.js";

export const toggleSave = async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorised");
  }
  const user = await User.findById(req.user.id);
  const isSaved = user.saved.some((post) => post.id === req.body.id);
  if (!isSaved) {
    await User.findByIdAndUpdate(req.user.id, { $push: { saved: req.body } });
  } else {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { saved: { id: req.body.id } },
    });
  }

  return res.status(200).json(isSaved ? "Movie unsaved" : "Movie saved");
};
