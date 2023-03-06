import express from "express";
import middleware from "../controllers/middleware.js";
import loginController from "../controllers/loginController.js";
import addUserController from "../controllers/addUserController.js";
import allUsersController from "../controllers/allUsersController.js";
import addProductController from "../controllers/addProductController.js";
import allProductsController from "../controllers/allProductsController.js";
import deleteUserByIdController from "../controllers/deleteUserByIdController.js";
import deleteProductByIdController from "../controllers/deleteProductByIdController.js";
import addCartController from "../controllers/addCartController.js";
import uploadFile from "../controllers/uploadFile.js";
import middlewareUploadFile from "../controllers/middlewareUploadFile.js";
import getCartController from "../controllers/getCartController.js";
import updateUserController from "../controllers/updateUserController.js";
import updateUserByIdController from "../controllers/updateUserByIdController.js";
import getUserByIdController from "../controllers/getUserByIdController.js";
import updateAvatarByIdController from "../controllers/updateAvatarByIdController.js";
import getProductByIdController from "../controllers/getProductByIdController.js";
import updateProductByIdController from "../controllers/updateProductByIdController.js";
import deleteToCartController from "../controllers/deleteToCartController.js";

const router = express.Router();

// GET

router.get("/allProducts", allProductsController);
router.get("/allUsers", middleware, allUsersController);

// POST

router.post("/login", loginController);
router.post("/addUser", middlewareUploadFile ,addUserController);
router.post("/addProduct",middlewareUploadFile, addProductController);
router.post("/deleteUserById", deleteUserByIdController);
router.post("/deleteProductById", deleteProductByIdController);
router.post("/addCart", addCartController);
router.post("/uploadFile", middlewareUploadFile, uploadFile);
router.post("/getCart", getCartController);
router.post("/updateUser", updateUserController);
router.post("/updateUserById", updateUserByIdController);
router.post("/getUserById", getUserByIdController);
router.post("/getProductById", getProductByIdController);
router.post("/updateAvatarById", middlewareUploadFile ,updateAvatarByIdController);
router.post("/updateProductById", updateProductByIdController);
router.post("/deleteToCart", deleteToCartController);


export default router;