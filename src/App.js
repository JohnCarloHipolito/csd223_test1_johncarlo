import './App.css';
import Navigation from "./components/Navigation";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <nav className="container-fluid">
                <Navigation/>
            </nav>
            <main className="container-fluid">
                <AppRoutes/>
            </main>
            <footer className="bg-dark-subtle py-4">
                <Footer/>
            </footer>
        </Router>
    );
}

export default App;
