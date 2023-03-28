import Nav from "./components/Nav";
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Router />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
