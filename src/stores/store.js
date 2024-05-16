import {create} from 'zustand';
import {produce} from "immer";

const useStore = create(set => ({
    userEmail: null,
    setUserEmail: (email) => set({userEmail: email}),
    account: null,
    setAccount: (account) => set({account: account}),
    transactions: {},
    setTransactions: (transaction) => set(produce((state) => {
        state.transactions[state.account] = state.transactions[state.account] || [];
        state.transactions[state.account].push(transaction);
    })),
}));

export default useStore;