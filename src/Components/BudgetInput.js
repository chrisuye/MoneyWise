import React, {useState, useEffect} from 'react';
import SpendingList from './SpendingList';
import Select from 'react-select';
import './BudgetInput.css';

const BudgetInput = () => {
    const [budget, setBudget] = useState(JSON.parse(localStorage.getItem('budget')) || []);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [total, setTotal] = useState(budget.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0.0));

    const options = [
        { value: 'Food', label: 'Food' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Gift', label: 'Gift' },
        { value: 'Shopping', label: 'Shopping' },
    ];
    
    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
        setTotal(budget.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0.0));
    }, [budget]);

    useEffect(() => {
        if (amount < 0 || !category || !description) {
            setError('Please fill out all fields');
        } else {
            setError('');
        }
    }, [amount, category, description]);
    
    const save = () => {
        var date = new Date();

        var value ={
            'Amount': amount,
            'Date': date.toDateString(),
            'Category': category.value,
            'Description': description
        }
        setBudget([...budget, value]);
    };

    const clear = () => {
        setBudget([]);
    };
    
    return (
        <div className="budget-input">
            <label htmlFor="budget">Budget</label>
            <input type="number" placeholder="Amount" min="0" onChange={(e) => setAmount(e.target.value)}/>
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
            <Select options={options} onChange={(e) => setCategory(e)} />
            {error && <p className="error">{error}</p>}
            <button onClick={() => save()} disabled={error}>Save</button>
            <button onClick={() => clear()} disabled={budget.lengh = 0}>Clear</button>
            <SpendingList budget={budget} total={total}/>
        </div>
    );
}

export default BudgetInput;