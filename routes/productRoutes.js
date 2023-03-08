import express from "express";
import * as ProductController from "../controllers/productController.js";
import uploader from "../middleware/uploader.js";

const router = express.Router();

// Upload files
router.post('/file-upload', uploader.array("image"), ProductController.fileUpload)

router.route("/").get(ProductController.getProduct).post(ProductController.createProduct);
router.route("/:id").patch(ProductController.updateProduct)
router.route("/:id").delete(ProductController.deleteProductById)
export default router;
