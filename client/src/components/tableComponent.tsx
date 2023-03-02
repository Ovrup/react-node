import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { tableAction } from '../store/tableSlice';
import ColumnAttribute from './../models/model.column';
import CustomDevexpress from './customDevexpress';
import './tableComponent.css'

const TableComponent: React.FC = () => {

    const tableData = useAppSelector((state) => state.table.tableData)
    const dispatch = useAppDispatch();


    const columns = [
        new ColumnAttribute('type', 'Type', 'string', 'left', true, true),
        new ColumnAttribute('severity', 'Severity', 'string', 'left', true, false),
        new ColumnAttribute('kill_chain_phase', 'Kill chain phase', 'string', 'left', true, false),
        new ColumnAttribute('timestamp', 'Timestamp', 'datetime', 'left', true, true),
        new ColumnAttribute('attacker_id', 'Attacker id', 'string', 'left', true, true),
        new ColumnAttribute('attacker_ip', 'Attacker ip', 'string', 'left', true, true),
        new ColumnAttribute('attacker_name', 'Attacker name', 'string', 'left', true, true),
        new ColumnAttribute('attacker_port', 'Attacker port', 'number', 'left', true, false),
        new ColumnAttribute('decoy_id', 'Decoy id', 'number', 'left', true, false),
        new ColumnAttribute('decoy_name', 'Decoy name', 'string', 'left', true, true),
        new ColumnAttribute('decoy_group', 'Decoy group', 'string', 'left', true, false),
        new ColumnAttribute('decoy_ip', 'Decoy ip', 'string', 'left', true, false),
        new ColumnAttribute('decoy_port', 'Decoy port', 'number', 'left', true, false),
        new ColumnAttribute('decoy_type', 'Decoy Type', 'string', 'left', true, false)
    ];


    useEffect(() => {
        fetch('/table').then((res) => res.json()).then((res) => {
            dispatch(tableAction.addTableData(res))
        })
    }, [])

    return (
        <div className='table_container'>
            <CustomDevexpress
                dataSource={tableData}
                columnsArray={columns}
            />
        </div>
    )
}

export default TableComponent;