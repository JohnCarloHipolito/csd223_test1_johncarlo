import {Table} from 'react-bootstrap';

function TransactionTable({account, accountTransaction}) {
    const transactions = [...(accountTransaction[account] || [])].reverse();

    return (
        <Table hover className="border-top border-bottom">
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th className="text-center">Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Balance</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction, index) => (
                <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.type}</td>
                    <td className="text-center">{transaction.date}</td>
                    <td className="text-end">${transaction.amount}</td>
                    <td className="text-end">${transaction.balance}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TransactionTable;