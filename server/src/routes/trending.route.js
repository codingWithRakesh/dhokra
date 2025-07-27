import { Router } from "express";
import {
    addToTrending,
    removeFromTrending,
    getAllTrendingProducts,
    getTrendingCount
} from "../controllers/trending.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/add").post(verifyLogin, addToTrending);
router.route("/remove/:id").delete(verifyLogin, removeFromTrending);
router.route("/getAll").get(getAllTrendingProducts);
router.route("/getCount").get(verifyLogin, getTrendingCount);

export default router;