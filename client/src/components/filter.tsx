import React from 'react';
import './header.css'

// This Filter component enables user to toggle the header filter row in data grid table.
const Filter: React.FC<{ handleShowFilter: () => void }> = (props) => {
    return <div>
        <button className='button-class' onClick={() => props.handleShowFilter()}>Filter</button>
    </div>
}

export default Filter