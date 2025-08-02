import { Router } from "express";
import {
    addDisplayImage,
    deleteDisplayImage,
    getAllDisplayImages,
    getCurrentDisplayImage,
    setDisplayImage
} from "../controllers/fiximg.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(verifyLogin, upload.single("image"), addDisplayImage);
router.route("/delete/:id").delete(verifyLogin, deleteDisplayImage);
router.route("/getAll").get(getAllDisplayImages);
router.route("/getCurrent").get(getCurrentDisplayImage);
router.route("/setDisplay/:id").put(verifyLogin, setDisplayImage);


export default router;