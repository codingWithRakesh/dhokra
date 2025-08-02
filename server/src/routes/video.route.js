import { Router } from "express";
import {
   addVideo,
    deleteVideo,
    getAllVideos,
    getVideoById
} from "../controllers/video.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(verifyLogin, upload.single("video"), addVideo);
router.route("/delete/:id").delete(verifyLogin, deleteVideo);
router.route("/getAll").get(getAllVideos);
router.route("/getById/:id").get(getVideoById);

export default router;