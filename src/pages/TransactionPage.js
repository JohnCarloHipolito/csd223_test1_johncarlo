import React, {useEffect} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import TransactionTable from "../components/TransactionTable";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import useStore from "../stores/store";

function TransactionPage({type}) {
    const {transactions, setTransactions} = useStore();
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();
    const formFields = watch();
    const location = useLocation();

    useEffect(() => {
        reset();
    }, [location, reset]);

    const getLatestBalance = (account) => {
        if (transactions[account] && transactions[account].length > 0) {
            return transactions[account][transactions[account].length - 1].balance;
        } else {
            return 0;
        }
    }

    const generateTransactionId = (account) => {
        return transactions[account] ? (transactions[account].length + 1).toString() : "1";
    }

    const createTransactionEntry = (type, account, amount, balance) => {
        return {
            id: generateTransactionId(account),
            type: type,
            date: new Date().toISOString().split('T')[0],
            amount: amount,
            balance: balance
        };
    }

    const doDeposit = (account, amount, type) => {
        const depositAmount = parseFloat(amount);
        const latestBalance = getLatestBalance(account) + depositAmount;
        const transactionEntry = createTransactionEntry(type, account, depositAmount, latestBalance);

        setTransactions(account, transactionEntry);
    }

    const doWithdrawal = (account, amount, type) => {
        const withdrawalAmount = parseFloat(amount);
        let latestBalance = getLatestBalance(account) - withdrawalAmount;

        if (latestBalance < 0) {
            alert('Insufficient balance for withdrawal');
            return false;
        } else {
            const transactionEntry = createTransactionEntry(type, account, withdrawalAmount, latestBalance);
            setTransactions(account, transactionEntry);
            return true;
        }
    }

    const doTransfer = (fromAccount, toAccount, amount) => {
        if(doWithdrawal(fromAccount, amount, 'transfer - debit')) {
            doDeposit(toAccount, amount, 'transfer - credit');
        }
    }

    const onSubmit = (data) => {

        switch (type) {
            case 'deposit':
                doDeposit(data.account, data.amount, type);
                break;
            case 'withdrawal':
                doWithdrawal(data.account, data.amount, type);
                break;
            case 'transfer':
                doTransfer(data.account, data.toAccount, data.amount)
                break;
            default:
                alert('Invalid transaction type');
                break;
        }
    };

    return (
        <Container>
            <div className="d-flex gap-4 flex-column align-items-center flex-lg-row justify-content-lg-evenly align-items-lg-start m-4">
                <div className="p-2" style={{width: '350px'}}>
                    <h3 className="text-center text-lg-start text-primary">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <Form onSubmit={handleSubmit(onSubmit)} className="my-2">
                        <Form.Group controlId="formAccountNumber" className="mb-4">
                            <Form.Label>{type === 'transfer' ? 'From Account Number' : 'Account Number'}</Form.Label>
                            <Form.Control type="text" {
                                ...register('account', {
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

                        {type === 'transfer' &&
                            <Form.Group controlId="formToAccountNumber" className="mb-4">
                                <Form.Label>To Account Number</Form.Label>
                                <Form.Control type="text" {
                                    ...register('toAccount', {
                                        required: true,
                                        pattern: /^[0-9]{10}$/,
                                        validate: value => value !== formFields.account || 'To Account should not be the same as From Account'
                                    })}/>
                                {errors.toAccount && errors.toAccount.type === 'validate' &&
                                    <p className="text-danger mt-1">{errors.toAccount.message}</p>}
                                {errors.toAccount && (['required', 'pattern'].includes(errors.toAccount.type)) &&
                                    <p className="text-danger mt-1">Account number should be 10-digit long.</p>}
                            </Form.Group>
                        }


                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className="p-2 flex-fill">
                    <h3 className="text-center text-lg-start mb-4 text-primary">Transaction History</h3>
                    <h5 className="text-center flex-fill text-lg-start mb-2">{type === 'transfer' ? 'From Account: ' : 'Account: '} {formFields.account}</h5>
                    <TransactionTable account={formFields.account} key={formFields.account}/>
                    {type === 'transfer' &&
                        <div className="my-4">
                            <h5 className="text-center flex-fill text-lg-start mb-2">To Account: {formFields.toAccount}</h5>
                            <TransactionTable account={formFields.toAccount} key={formFields.toAccount}/>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
}

export default TransactionPage;