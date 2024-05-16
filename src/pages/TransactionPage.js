import React, {useEffect} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import TransactionTable from "../components/TransactionTable";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import useStore from "../stores/store";

function TransactionPage({type}) {
    const {account, setAccount, transactions, setTransactions} = useStore();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const location = useLocation();

    useEffect(() => {
        reset();
    }, [location, reset]);

    const onSubmit = (data) => {
        setAccount(data.account);
        let latestBalance = 0;

        if (transactions[data.account] && transactions[data.account].length > 0) {
            latestBalance = transactions[data.account][transactions[data.account].length - 1].balance;
        }

        const newTransactionId = transactions[data.account]
            ? (transactions[data.account].length + 1).toString()
            : "1";

        switch (type) {
            case 'deposit':
                const depositAmount = parseFloat(data.amount);
                latestBalance += depositAmount;

                const newTransaction = {
                    id: newTransactionId,
                    type: 'Deposit',
                    date: new Date().toISOString().split('T')[0],
                    amount: depositAmount,
                    balance: latestBalance
                };

                setTransactions(newTransaction);
                break;
            case 'withdrawal':
                const withdrawalAmount = parseFloat(data.amount);
                if (withdrawalAmount > latestBalance) {
                    alert('Insufficient balance for withdrawal');
                    return;
                }
                latestBalance -= withdrawalAmount;

                const newWithdrawalTransaction = {
                    id: newTransactionId,
                    type: 'Withdrawal',
                    date: new Date().toISOString().split('T')[0],
                    amount: withdrawalAmount,
                    balance: latestBalance
                };

                setTransactions(newWithdrawalTransaction);
                break;
            default:
                break;
        }
    };

    const handleAccountChange = (e) => {
        setAccount(e.target.value);
    };

    return (
        <Container>
            <div className="d-flex gap-4 flex-column align-items-stretch flex-lg-row justify-content-lg-evenly align-items-lg-stretch m-4">
                <div className="p-2 align-self-center" style={{width: '350px'}}>
                    <h3 className="text-center text-lg-start text-primary">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <Form onSubmit={handleSubmit(onSubmit)} className="my-2">
                        <Form.Group controlId="formAccountNumber" className="mb-4">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control type="text" {
                                ...register('account', {
                                    onChange: handleAccountChange,
                                    onBlur: handleAccountChange,
                                    required: true,
                                    pattern: /^[0-9]{10}$/
                                })}/>
                            {errors.account && <p className="text-danger mt-1">Account number should be 10-digit long.</p>}
                        </Form.Group>

                        <Form.Group controlId="formTransactionAmount" className="mb-4">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" {
                                ...register('amount', {
                                    required: true,
                                    pattern: /^(1000|1000.00|[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?)$/
                                })}/>
                            {errors.amount && <p className="text-danger mt-1">Valid amount is between 1 and 1000 up to two decimal places.</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className="p-2 flex-fill">
                    <h3 className="text-center text-lg-start mb-2 text-primary">Transaction History</h3>
                    <h4 className="text-center flex-fill text-lg-start mb-2">{account}</h4>
                    <TransactionTable key={account}/>
                </div>
            </div>
        </Container>
    );
}

export default TransactionPage;