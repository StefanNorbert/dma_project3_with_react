import React from 'react';

export default function Cell(props) {
    const styles = {
        0: {backgroundColor : '#fff', color: '#fff'},
        2: {backgroundColor : '#9E9E9E'},
        4: {backgroundColor : '#607D8B'},
        8: {backgroundColor : '#795548'},
        16: {backgroundColor : '#FF9800'},
        32: {backgroundColor : '#FFC107'},
        64: {backgroundColor : '#FFEB3B'},
        128: {backgroundColor : '#CDDC39'},
        256: {backgroundColor : '#8BC34A'},
        512: {backgroundColor : '#4CAF50'},
        1024: {backgroundColor : '#03A9F4'},
        2048: {backgroundColor : '#F44336'}
    };

    return (
        <div className="elements" style={styles[props.value]}>{props.value}</div>
    );
}