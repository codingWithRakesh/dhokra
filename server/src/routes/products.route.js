import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from "../controllers/products.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(verifyLogin, upload.array("images"), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);
router.route("/getProductByName/:name").get(getProductByName);
router.route("/getProductsByCategory/:category").get(getProductsByCategory);
router.route("/update/:id").put(verifyLogin, upload.array("images"), updateProduct);
router.route("/delete/:id").delete(verifyLogin, deleteProduct);

export default router;