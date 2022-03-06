import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SpendingList = ({ budget, total }) => {
    const [selected, setSelected] = useState([]);
    const [direction, setDirection] = useState('asc');
    

    const options = [
        { value: 'Date', label: 'Date' },
        { value: 'Category', label: 'Category' },
        { value: 'Amount', label: 'Amount' },
        { value: 'Description', label: 'Description' },
    ];

    const handleDirections = (e) => {
        if (direction === 'asc') {
            setDirection('desc');
        } else {
            setDirection('asc');
        }
    };

    useEffect(() => {
        switch (selected.value) {
            case 'Date':
                direction === 'asc' ?
                    budget.sort((a, b) => (new Date(a.Date) - new Date(b.Date))) :
                    budget.sort((a, b) => (new Date(b.Date) - new Date(a.Date)));
                break;
            case 'Category':
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Category.localeCompare(b.Category))) :
                    budget.sort((a, b) => (b.Category.localeCompare(a.Category)));
                break;
            case 'Amount':
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Amount - b.Amount)) :
                    budget.sort((a, b) => (b.Amount - a.Amount));
                break;
            case 'Description':
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Description.localeCompare(b.Description))) :
                    budget.sort((a, b) => (b.Description.localeCompare(a.Description)));
                break;
            default:
                break;
        }
    }, [budget, selected, direction]);

    return (
        <div className="spending-list">
            <div className="spending-list-header">
                <label>Total spent: {total}$</label>
            </div>
            <div className="spending-list-select">
                <Select options={options} onChange={(e) => setSelected(e)} />
                <button onClick={() => handleDirections()}>{direction === 'asc' ? 'Ascending' : 'Descending'}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Amount}</td>
                            <td>{item.Date}</td>
                            <td>{item.Category}</td>
                            <td>{item.Description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SpendingList;