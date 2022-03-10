import React, { useState, useEffect } from 'react';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';

const SpendingList = ({ budget, total }) => {
    const [table, setTable] = useState(budget);
    const [sort, setSort] = useState(JSON.parse(localStorage.getItem('sort')) ? JSON.parse(localStorage.getItem('sort')).sort : 1);
    const [direction, setDirection] = useState(JSON.parse(localStorage.getItem('sort')) ? JSON.parse(localStorage.getItem('sort')).direction : 'asc');
    localStorage.setItem('sort', JSON.stringify({sort, direction}));

    useEffect(() => {
        localStorage.setItem('sort', JSON.stringify({sort, direction}));
        switch (sort) {
            case 1:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Amount - b.Amount)) :
                    budget.sort((a, b) => (b.Amount - a.Amount));
                setTable(budget);
                break;
            case 2:
                direction === 'asc' ?
                    budget.sort((a, b) => (new Date(a.Date) - new Date(b.Date))) :
                    budget.sort((a, b) => (new Date(b.Date) - new Date(a.Date)));
                setTable(budget);
                break;
            case 3:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Category.localeCompare(b.Category))) :
                    budget.sort((a, b) => (b.Category.localeCompare(a.Category)));
                setTable(budget);
                break;
            case 4:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Description.localeCompare(b.Description))) :
                    budget.sort((a, b) => (b.Description.localeCompare(a.Description)));
                setTable(budget);
                break;
            default:
                break;
        }
    }, [table, sort, direction, budget]);

    return (
        <div className="spending-list">
            <div className="spending-list-header">
                <label>Total spent: {total}$</label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => setSort(1)}>Amount { sort === 1 ? direction === 'asc' ? <BsSortDownAlt onClick={() => setDirection('dsc')} /> : <BsSortUpAlt onClick={() => setDirection('asc')}/> : null}</th>
                        <th onClick={() => setSort(2)}>Date  { sort === 2 ? direction === 'asc' ? <BsSortDownAlt onClick={() => setDirection('dsc')}/> : <BsSortUpAlt onClick={() => setDirection('asc')}/> : null}</th>
                        <th onClick={() => setSort(3)}>Category { sort === 3 ? direction === 'asc' ? <BsSortDownAlt onClick={() => setDirection('dsc')}/> : <BsSortUpAlt onClick={() => setDirection('asc')}/> : null}</th>
                        <th onClick={() => setSort(4)}>Description { sort === 4 ? direction === 'asc' ? <BsSortDownAlt onClick={() => setDirection('dsc')}/> : <BsSortUpAlt onClick={() => setDirection('asc')}/> : null}</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Amount}$</td>
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