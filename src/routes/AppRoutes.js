import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TransactionPage from "../pages/TransactionPage";

function AppRoutes({userEmail, setUserEmail, accountTransaction, setAccountTransaction}) {
    return (
        <Routes>
            <Route path="/" element={<HomePage userEmail={userEmail}/>}/>
            <Route path="/withdrawal" element={<TransactionPage type="withdrawal" accountTransaction={accountTransaction} setAccountTransaction={setAccountTransaction}/>}/>
            <Route path="/deposit" element={<TransactionPage type="deposit" accountTransaction={accountTransaction} setAccountTransaction={setAccountTransaction}/>}/>
            <Route path="/login" element={<LoginPage setUserEmail={setUserEmail}/>}/>
        </Routes>
    );
}

export default AppRoutes;