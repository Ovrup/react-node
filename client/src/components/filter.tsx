import React from 'react';
import { uniqueValueType } from '../models/model';
import './reactTable.css'
import './header.css'
import { useAppSelector } from '../store/hooks';

// This Filter component enables user to toggle the header filter row in data grid table.
const Filter: React.FC<{ handleCloseFilter: () => void, handleSelectedValue: (event: React.ChangeEvent<HTMLInputElement>, val: uniqueValueType) => void }> = (props) => {

    const uniqueColumnVal = useAppSelector((state) => state.table.uniqueColumnVal)

    console.log('uniqueColumnVal in filter', uniqueColumnVal);


    return <div className='filter-container'>
        <button className='close-button' onClick={props.handleCloseFilter}>X</button>
        {uniqueColumnVal.map((val) => {
            return <div className='filter-content' key={val.name}>
                <input type='checkbox' checked={val.checked} id='filter' name='filter-value' onChange={(event) => props.handleSelectedValue(event, val)} />
                <label htmlFor='filter'>{val.name}</label>
            </div>
        })}
    </div>
}

export default Filter