import express from "express";
import middleware from "../controllers/middleware.js";
import loginController from "../controllers/loginController.js";
import addUserController from "../controllers/addUserController.js";
import addCartController from "../controllers/addCartController.js";
import getCartController from "../controllers/getCartController.js";
import contactController from "../controllers/contactController.js";
import allUsersController from "../controllers/allUsersController.js";
import addProductController from "../controllers/addProductController.js";
import middlewareUploadFile from "../controllers/middlewareUploadFile.js";
import updateUserController from "../controllers/updateUserController.js";
import uploadFileController from "../controllers/uploadFileController.js";
import checkTokenController from "../controllers/checkTokenController.js";
import allProductsController from "../controllers/allProductsController.js";
import getUserByIdController from "../controllers/getUserByIdController.js";
import deleteToCartController from "../controllers/deleteToCartController.js";
import searchFilterController from "../controllers/searchFilterController.js";
import getThematiqueController from "../controllers/getThematiqueController.js";
import updateUserByIdController from "../controllers/updateUserByIdController.js";
import deleteUserByIdController from "../controllers/deleteUserByIdController.js";
import getProductByIdController from "../controllers/getProductByIdController.js";
import updateAvatarByIdController from "../controllers/updateAvatarByIdController.js";
import deleteProductByIdController from "../controllers/deleteProductByIdController.js";
import updateProductByIdController from "../controllers/updateProductByIdController.js";
import detailProductByIdController from "../controllers/detailProductByIdController.js";



const router = express.Router();

// GET

router.get("/allProducts", allProductsController);
router.get("/allUsers", middleware, allUsersController);
router.get("/searchFilter", searchFilterController);
router.get("/relogged", checkTokenController);
router.get("/getThematique", getThematiqueController);

// POST

router.post("/login", middleware, loginController);
router.post("/addUser", middlewareUploadFile ,addUserController);
router.post("/addProduct",middlewareUploadFile, addProductController);
router.post("/deleteUserById", deleteUserByIdController);
router.post("/deleteProductById", deleteProductByIdController);
router.post("/addCart", addCartController);
router.post("/uploadFile", middlewareUploadFile, uploadFileController);
router.post("/getCart", getCartController);
router.post("/updateUser", updateUserController);
router.post("/updateUserById", updateUserByIdController);
router.post("/getUserById", getUserByIdController);
router.post("/getProductById", getProductByIdController);
router.post("/updateAvatarById", middlewareUploadFile ,updateAvatarByIdController);
router.post("/updateProductById", updateProductByIdController);
router.post("/deleteToCart", deleteToCartController);
router.post("/contact", contactController);
router.post("/detailProductById", detailProductByIdController);

export default router;