import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import UpdateAvatarController from "../controllers/UpdateAvatarController";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const avatarRouter = Router();
const userAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

console.log('Avatar routes loaded');

avatarRouter.patch(
  "/",
  (req, res, next) => {
    console.log('Avatar route hit');
    console.log('Content-Type:', req.headers['content-type']);
    next();
  },
  AuthMiddleware.execute,
  (req, res, next) => {
    console.log('Before multer - Body keys:', Object.keys(req.body));
    const uploadMiddleware = upload.single("avatar");
    uploadMiddleware(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: err.message });
      }
      console.log('After multer - File:', req.file);
      console.log('After multer - Body:', req.body);
      next();
    });
  },
  userAvatarController.update.bind(userAvatarController),
);

export default avatarRouter;
