import React from 'react';
import { uniqueValueType } from '../models/model';
import './reactTable.css'
import './header.css'
import { useAppSelector } from '../store/hooks';

// This Filter component enables user to toggle the header filter row in data grid table.
const Filter: React.FC<{ selectedColumn: string | undefined, handleCloseFilter: () => void, handleFilterValue: (checked: boolean, val: uniqueValueType) => void }> = (props) => {

    const uniqueColumnVal = useAppSelector((state) => state.table.uniqueColumnVal)

    console.log('uniqueColumnVal in filter', uniqueColumnVal);


    return <div className='filter-container'>
        <button className='close-button' onClick={props.handleCloseFilter}>X</button>
        {Object.entries(uniqueColumnVal).map((entry) => {
            let [key, value] = entry
            if (key === props.selectedColumn) {
                return value.map((uniqueVal: uniqueValueType) => {
                    return <div className='filter-content' key={uniqueVal.name}>
                        <input type='checkbox' id='filter' checked={uniqueVal.checked} name='filter-value' onChange={(event) => props.handleFilterValue(event.target.checked, uniqueVal)} />
                        <label htmlFor='filter'>{uniqueVal.name}</label>
                    </div>
                })
            }
        })}
    </div>
}

export default Filter