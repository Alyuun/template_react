import Home from "../components/Home";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Profil from "../components/Profil";
import Contact from "../components/Contact";
import AddUser from "../components/AddUser";
import AllUsers from "../components/AllUsers";
import Error404 from "../components/Error404";
import AddProduct from "../components/AddProduct";
import AllProduct from "../components/AllProducts";
import UploadFile from "../components/UploadFile";
import UpdateUser from "../components/UpdateUser";
/*import SearchFilter from "../components/SearchFilter";
*/import UpdateProduct from "../components/UpdateProduct";
import SearchProduct from "../components/SearchProduct";
import DetailProduct from "../components/DetailProduct";



const routes = [
    {path:"/", component:<Home />},
    {path:"/login" ,component:<Login />},
    {path:"/logout", component:<Logout />},
    {path:"/profil", component:<Profil />, auth:"user"},
    {path:"/addUser", component:<AddUser />},
    {path:"/allUsers", component:<AllUsers />, auth: "admin"},
    {path:"/addProduct", component:<AddProduct />, auth: "admin"},
    {path:"/allProducts", component:<AllProduct />},
    {path:"/cart", component:<Cart />},
    {path:"/uploadFile" ,component:<UploadFile />},
    {path:"/updateUser/:id", component:<UpdateUser />},
    {path:"/updateProduct/:id", component:<UpdateProduct />, auth : "admin"},
    {path:"/searchProduct", component:<SearchProduct />},
    {path:"/contact", component:<Contact />},
    {path:"/detailProductById/:id", component:<DetailProduct />},
    
    {path:"*", component:<Error404 />}
];

export default routes;