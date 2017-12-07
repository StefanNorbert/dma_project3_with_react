import React from 'react';
import Cell from './Cell';

export default function Table(props) {
    const renderCell = (i) => {
        return (
            <Cell
                key={i}
                value={props.values[i]}
            />
        );
    };

    return (
        <div className='container'>
            {props.values.map( (value, i) => renderCell(i))}
        </div>
    );
}