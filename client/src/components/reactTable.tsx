import React, { useEffect, useState } from 'react';
import Filter from './filter';
import Pagination from './pagination';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Data, uniqueValueType } from '../models/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import './reactTable.css'
import { tableAction } from '../store/tableSlice';

const ReactTable: React.FC = (props) => {


    const pageSize = 20;

    const tableData = useAppSelector((state) => state.table.tableData);
    const totalPageCount = useAppSelector((state) => state.table.totalPageCount)
    const uniqueColumnVal = useAppSelector((state) => state.table.uniqueColumnVal)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredTableData, setFilteredTableData] = useState<Data[]>([]);
    const [showFilterVal, setShowFilterVal] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState<string>()
    const [index, setIndex] = useState<number>(-1)

    const [sortingAsc, setSortingAsc] = useState<boolean>(false)

    const newColumns = useAppSelector((state) => state.table.newColumns);

    const dispatch = useAppDispatch();


    useEffect(() => {
        setFilteredTableData(tableData.slice(pageSize * (currentPage - 1), pageSize * currentPage))
    }, [tableData, currentPage])

    useEffect(() => {
        showSortedTable(index)
    }, [index, sortingAsc])

    useEffect(() => {
        setColumnWidth()
    }, [])

    const setColumnWidth = () => {
        let visibleColumnHeader = Array.from(document.querySelectorAll('table.react-table thead tr th:not(.hide)'));
        let root = document.querySelectorAll<HTMLElement>(":root")[0]

        let columnWidth = (100 / visibleColumnHeader.length)
        root.style.setProperty('--table-cell-width', `${columnWidth}`)
    }


    const handleFilterValue = (selectedFilterVal: uniqueValueType, checked: boolean) => {
        if (checked) {
            setFilteredTableData(tableData.filter((row) => {
                type rowKey = keyof typeof row;
                const rowCell = selectedColumn as rowKey;
                return String(row[rowCell]).includes(selectedFilterVal.name)
            }
            ))
        }
        else {
            setFilteredTableData(tableData.filter((row) => {
                type rowKey = keyof typeof row;
                const rowCell = selectedColumn as rowKey;
                return String(row[rowCell]).includes("")
            }
            ))
        }
        let uniqueValArray: uniqueValueType[] = JSON.parse(JSON.stringify(uniqueColumnVal));

        uniqueValArray = uniqueValArray.map((val) => {
            if (val.name === selectedFilterVal.name) {
                val.checked = checked;
                return val
            }
            else {
                val.checked = false;
                return val
            }
        })
        dispatch(tableAction.setUniqueColumnVal(uniqueValArray))
    }

    const findUniqueColumnValue = (columnName: string) => {
        let uniqueVal = new Set();
        let uniqueValArray: any[] = []
        tableData.map((row) => {
            type rowKey = keyof typeof row;
            const rowCell = columnName as rowKey;
            if (!uniqueVal.has(row[rowCell])) {
                uniqueVal.add(row[rowCell])
                uniqueValArray.push({ name: row[rowCell], checked: false })
            }
        })
        dispatch(tableAction.setUniqueColumnVal(uniqueValArray))
    }

    const handleFilterSelect = (columnName: string) => {
        findUniqueColumnValue(columnName)
        setShowFilterVal(true)
        setSelectedColumn(columnName)
    }

    const handleSelectedValue = (event: React.ChangeEvent<HTMLInputElement>, val: uniqueValueType) => {
        handleFilterValue(val, event.target.checked)
    }

    const showSortedTable = (columnIndex: number) => {

        let sortingModifier = sortingAsc ? 1 : -1;
        const tBody = document.querySelector('table tbody')
        const rows = Array.from(document.querySelectorAll('table tbody tr'))

        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${columnIndex + 1})`)?.textContent?.trim();
            const bColText = b.querySelector(`td:nth-child(${columnIndex + 1})`)?.textContent?.trim();

            return ((aColText ?? 0) > (bColText ?? 0)) ? 1 * sortingModifier : -1 * sortingModifier

        })

        while (tBody?.firstChild) {
            tBody?.removeChild(tBody?.firstChild)
        }
        tBody?.append(...sortedRows)
    }

    const handleSorting = (e: React.MouseEvent<HTMLSpanElement>, columnName: string, columnIndex: number) => {

        let allHeaders = document.querySelectorAll('table.react-table thead tr th');

        allHeaders.forEach((header) => {
            header.querySelector('#asc')?.classList.remove('show');
            header.querySelector('#desc')?.classList.remove('show')
        })

        let sortedHeader = allHeaders[columnIndex]

        if (!sortingAsc) {
            sortedHeader.querySelector('#asc')?.classList.add('show')
            sortedHeader.querySelector('#desc')?.classList.add('hide')
        }
        else {
            sortedHeader.querySelector('#desc')?.classList.add('show')
            sortedHeader.querySelector('#asc')?.classList.add('hide')
        }
        setSortingAsc((currentSortingAsc) => !currentSortingAsc);
        setIndex(columnIndex)
    }

    const handlePageIncrement = () => {
        if (currentPage === totalPageCount) {
            setCurrentPage(1)
        }
        else {
            setCurrentPage((previousPage) => previousPage + 1)
        }
    }

    const handlePageDecrement = () => {
        if (currentPage === 1) {
            setCurrentPage(totalPageCount)
        }
        else {
            setCurrentPage((previousPage) => previousPage - 1)
        }
    }


    return <div>
        <div className='react-table-wrapper'>
            <table className='react-table'>
                <thead>
                    <tr>
                        {newColumns.map((column, idx) => {
                            return <th
                                key={column.dataField}
                                className={(column.visible ? 'show ' : 'hide ') + 'table-header'}
                            >
                                <span style={{ cursor: 'pointer' }} onClick={() => handleFilterSelect(column.dataField)}>
                                    <FontAwesomeIcon icon={faFilter} />
                                </span>

                                <div onClick={(e) => handleSorting(e, column.caption, idx)}>
                                    <span id='column-caption'>{column.caption}</span>
                                    <span id='asc' className='hide'>
                                        <FontAwesomeIcon icon={faArrowUp} />

                                    </span>
                                    <span id='desc' className='hide'>
                                        <FontAwesomeIcon icon={faArrowDown} />
                                    </span>
                                </div>
                            </th>
                        })}
                    </tr>
                </thead>

                <tbody>

                    {filteredTableData.map((row) => {
                        return <tr key={row.id}>
                            {newColumns.map((column) => {
                                type rowKey = keyof typeof row;
                                const rowCell = column.dataField as rowKey;

                                return <td
                                    className={(column.visible ? 'show ' : 'hide ') + 'table-data'}
                                    key={column.dataField}
                                >
                                    {(row[rowCell] || row[rowCell] === 0) ? row[rowCell] : 'NA'}
                                </td>
                            })}
                        </tr>
                    })}

                </tbody>
            </table>
            {showFilterVal && <Filter
                handleCloseFilter={() => setShowFilterVal(false)}
                handleSelectedValue={handleSelectedValue}
            />}

        </div>
        <Pagination
            currentPage={currentPage}
            handlePageIncrement={handlePageIncrement}
            handlePageDecrement={handlePageDecrement}
        />
    </div>
}

export default ReactTable;