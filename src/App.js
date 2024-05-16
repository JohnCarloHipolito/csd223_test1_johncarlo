import './App.css';
import Navigation from "./components/Navigation";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./components/Footer";
import React, {useState} from "react";

function App() {
    const [userEmail, setUserEmail] = useState(null);
    const [accountTransaction, setAccountTransaction] = useState({});

    return (
        <Router>
            <nav className="container-fluid">
                <Navigation userEmail={userEmail}/>
            </nav>
            <main className="container-fluid">
                <AppRoutes
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    accountTransaction={accountTransaction}
                    setAccountTransaction={setAccountTransaction}
                />
            </main>
            <footer className="bg-dark-subtle py-4">
                <Footer/>
            </footer>
        </Router>
    );
}

export default App;
