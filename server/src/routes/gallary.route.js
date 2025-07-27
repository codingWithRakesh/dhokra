import { Router } from "express";
import {
    addGalleryImage,
    deleteGalleryImage,
    getAllGalleryImages,
    getGalleryImageById
} from "../controllers/gallary.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(verifyLogin, upload.single("image"), addGalleryImage);
router.route("/delete/:id").delete(verifyLogin, deleteGalleryImage);
router.route("/getAll").get(getAllGalleryImages);
router.route("/getById/:id").get(getGalleryImageById);

export default router;