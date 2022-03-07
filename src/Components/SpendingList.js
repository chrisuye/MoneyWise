import React, { useState, useEffect } from 'react';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';

const SpendingList = ({ budget, total }) => {
    const [sort, setSort] = useState(1);
    const [direction, setDirection] = useState('asc');

    useEffect(() => {
        switch (sort) {
            case 1:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Amount - b.Amount)) :
                    budget.sort((a, b) => (b.Amount - a.Amount));
                break;
            case 2:
                direction === 'asc' ?
                    budget.sort((a, b) => (new Date(a.Date) - new Date(b.Date))) :
                    budget.sort((a, b) => (new Date(b.Date) - new Date(a.Date)));
                break;
            case 3:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Category.localeCompare(b.Category))) :
                    budget.sort((a, b) => (b.Category.localeCompare(a.Category)));
                break;
            case 4:
                direction === 'asc' ?
                    budget.sort((a, b) => (a.Description.localeCompare(b.Description))) :
                    budget.sort((a, b) => (b.Description.localeCompare(a.Description)));
                break;
            default:
                break;
        }
    }, [budget, sort, direction]);

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