import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getAvailableProductByName,
    getProductsByCategory,
    getAvailableProductsByCategory,
    updateProduct,
    toggleProductAvailability,
    getTotalProductsCount,
    getProductCountByCategory,
    deleteProduct,
    deleteProductImage
} from "../controllers/products.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(verifyLogin, upload.array("images"), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);
router.route("/getProductByName/:name").get(getProductByName);
router.route("/getAvailableProductByName/:name").get(getAvailableProductByName);
router.route("/getProductsByCategory/:category").get(getProductsByCategory);
router.route("/getAvailableProductsByCategory/:category").get(getAvailableProductsByCategory);
router.route("/update/:id").put(verifyLogin, upload.array("images"), updateProduct);
router.route("/toggleAvailability/:id").put(verifyLogin, toggleProductAvailability);
router.route("/getTotalProductsCount").get(getTotalProductsCount);
router.route("/getProductCountByCategory/:category").get(getProductCountByCategory);
router.route("/delete/:id").delete(verifyLogin, deleteProduct);
router.route("/deleteImage/:id").delete(verifyLogin, deleteProductImage);

export default router;