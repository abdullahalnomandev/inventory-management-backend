import express from "express";
import * as ProductController from "../controllers/productController.js";
const router = express.Router();
// router.post("/", getProduct);
// router.get("/", createProduct);
// router.patch("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

router
  .route("/")
  .get(ProductController.getProduct)
  .post(ProductController.createProduct);
  
  router.route("/:id")
  .patch(ProductController.updateProduct)

  router.route("/:id").delete(ProductController.deleteProductById)
export default router;
