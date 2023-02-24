import express from "express";
//import middleware from "../controllers/middleware.js";
import testController from "../controllers/testController.js";
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

const router = express.Router();

// GET

router.get("/", testController);
router.get("/allProducts", allProductsController);
router.get("/allUsers" /*middleware*/, allUsersController);

// POST

router.post("/login", loginController);
router.post("/addUser", middlewareUploadFile ,addUserController);
router.post("/addProduct",middlewareUploadFile, addProductController);
router.post("/deleteUserById", deleteUserByIdController);
router.post("/deleteProductById", deleteProductByIdController);
router.post("/addCart", addCartController);
router.post("/uploadFile", middlewareUploadFile, uploadFile);
router.post("/getCart", getCartController);


export default router;