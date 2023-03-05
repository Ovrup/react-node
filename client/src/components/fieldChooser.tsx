import React from 'react';
import { useAppSelector } from '../store/hooks';
import ColumnAttribute from '../models/model.column';
import './header.css'

/* Field chooser component enables user to display the list of table fields. The default fields will be selected beforehand. Any
field can be selected/removed from that list and this will display/hide that field from the grid table
*/
const FieldChooser: React.FC<{ handleFieldSelect: (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => void, handleHideFieldChooser: () => void }> = (props) => {

    const newColumns = useAppSelector((state) => state.table.newColumns);

    return <div className='field-chooser'>
        <button className='close-button' onClick={props.handleHideFieldChooser}>X</button>
        {newColumns.map((column) => {
            return <div>
                <input type='checkbox' checked={column.visible} onChange={(event) => props.handleFieldSelect(event, column.caption)} id='field' />
                <label htmlFor='field'>{column.caption}</label>
            </div>
        })}
    </div>
}

export default FieldChooser