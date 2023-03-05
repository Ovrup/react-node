import React, { useState } from "react";
import { Data } from "../models/model";
import Filter from "./filter";
import FieldChooser from "./fieldChooser";
import ColumnAttribute from "../models/model.column"
import DataGrid, { Column, FilterRow, ColumnChooser } from 'devextreme-react/data-grid';
import { RowPreparedEvent } from "devextreme/ui/data_grid";
import './header.css'

const CustomDevexpress: React.FC<{ dataSource: Data[], columnsArray: ColumnAttribute[] }> = (props) => {

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showFieldChooser, setShowFieldChooser] = useState<boolean>(false)

    const handleRowPrepared = (e: RowPreparedEvent) => {
        console.log(e);

        if (e.rowType === 'data' && e.rowIndex % 2 === 0) {
            e.rowElement.style.backgroundColor = 'rgb(173, 216, 230)'
        }

        if (e.rowType === 'header') {
            e.rowElement.style.fontWeight = '600';
            e.rowElement.style.color = 'rgb(50,50,50)'
        }

    }

    return <div className="row">
        {/* <div className="filter-header col-12">
            <Filter handleShowFilter={() => {
                setShowFilter((prevVal) => !prevVal)
            }} />
            <FieldChooser handleFieldChooser={() => setShowFieldChooser((prevVal) => !prevVal)} />
        </div>

        <div className="table-container col-12">
            <DataGrid                                       // Grid table that shows the data fetched from backend server
                dataSource={props.dataSource}
                showBorders={true}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onRowPrepared={(e) => handleRowPrepared(e)}
            >
                <FilterRow visible={showFilter} />
                <ColumnChooser enabled={showFieldChooser} mode='select' />
                {props.columnsArray.map((col: ColumnAttribute) => {
                    return <Column
                        dataField={col.dataField}
                        caption={col.caption}
                        dataType={col.dataType}
                        alignment={col.alignment}
                        allowSorting={col.allowSorting}
                        visible={col.visible}
                    />
                })}
            </DataGrid>
        </div> */}
    </div>
}

export default CustomDevexpress;