import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Error404 from "./components/Error404.jsx";
import AddUser from "./components/AddUser.jsx";
import AllUsers from "./components/AllUsers.jsx";
import Login from "./components/Login.jsx";
import AddProduct from "./components/AddProduct.jsx";
import AllProduct from "./components/AllProducts.jsx";
import Cart from "./components/Cart.jsx";
import UploadFile from "./components/UploadFile";
import Logout from "./components/Logout.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/allUsers" element={<AllUsers />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/allProducts" element={<AllProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/uploadFile" element={<UploadFile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/updateUser/:id" element={<UpdateUser />} />
                <Route path="/updateProduct/:id" element={<UpdateProduct />} />
                
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
