import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { tableAction } from '../store/tableSlice';
import ColumnAttribute from './../models/model.column';
import FieldChooser from './fieldChooser';
import ReactTable from './reactTable';
import './tableComponent.css';
import './header.css'

const TableComponent: React.FC = () => {

    const newColumns = useAppSelector((state) => state.table.newColumns);
    const dispatch = useAppDispatch();

    const [showFieldChooser, setShowFieldChooser] = useState<boolean>(false)

    let columns = newColumns;


    useEffect(() => {
        fetch('/table').then((res) => res.json()).then((res) => {
            dispatch(tableAction.addTableData(res))
        })
    }, [])


    const handleFieldSelect = (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
        columns = columns.map((column) => {
            if (columnName == column.caption) {
                column.visible = Boolean(event.target.checked);
                return column
            }
            else {
                return column
            }
        })
        dispatch(tableAction.setNewColumns(columns))
    }

    return (
        <div className='table_container'>
            <div className='field-chooser-container'>
                <button className='button-class button-position' onClick={() => setShowFieldChooser((prevVal) => !prevVal)}>Fields</button>
                {showFieldChooser && <FieldChooser handleFieldSelect={handleFieldSelect} handleHideFieldChooser={() => setShowFieldChooser(false)} />}
            </div>
            <ReactTable />
        </div>
    )
}

export default TableComponent;