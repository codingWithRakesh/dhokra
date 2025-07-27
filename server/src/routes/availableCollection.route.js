import { Router } from "express";
import {
    addToAvailableCollection,
    removeFromAvailableCollection,
    getAllAvailableCollectionProducts,
    getAvailableCollectionCount
} from "../controllers/availableCollection.controller.js";
import { verifyLogin } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/add").post(verifyLogin, addToAvailableCollection);
router.route("/remove/:id").delete(verifyLogin, removeFromAvailableCollection);
router.route("/getAll").get(getAllAvailableCollectionProducts);
router.route("/getCount").get(verifyLogin, getAvailableCollectionCount);

export default router;