import React, { useEffect, useRef, useState } from 'react';
import Filter from './filter';
import Pagination from './pagination';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Data, uniqueValueType, uniqueColumnType } from '../models/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faFilter } from '@fortawesome/free-solid-svg-icons';
import './reactTable.css'
import { tableAction } from '../store/tableSlice';

const ReactTable: React.FC = (props) => {


    const pageSize = 20;

    const tableData = useAppSelector((state) => state.table.tableData);
    const [filteredTableData, setFilteredTableData] = useState<Data[]>([])
    const totalPageCount = useAppSelector((state) => state.table.totalPageCount)
    const uniqueColumnVal = useAppSelector((state) => state.table.uniqueColumnVal)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginatedTableData, setPaginatedTableData] = useState<Data[]>([]);
    const [showFilterVal, setShowFilterVal] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState<string>()
    const [index, setIndex] = useState<number>(-1)
    const [initialFilterSelect, setInitialFilterSelect] = useState<boolean>(true)

    const uniqueVal = useRef(new Set())

    const [sortingAsc, setSortingAsc] = useState<boolean>(false)

    const newColumns = useAppSelector((state) => state.table.newColumns);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setFilteredTableData(tableData)
    }, [tableData])


    useEffect(() => {
        setPaginatedTableData(tableData.slice(pageSize * (currentPage - 1), pageSize * currentPage))
    }, [tableData, currentPage])

    useEffect(() => {
        setPaginatedTableData(filteredTableData.slice(pageSize * (currentPage - 1), pageSize * currentPage))
    }, [filteredTableData, currentPage])

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


    const handleFilterValue = (checked: boolean, selectedFilterVal: uniqueValueType) => {

        if (checked) {

            let currentFilteredRows = tableData.filter((row) => {
                type rowKey = keyof typeof row;
                const rowCell = selectedColumn as rowKey;
                return String(row[rowCell]).includes(selectedFilterVal.name)
            }
            )

            let totalFilteredRows = currentFilteredRows.length + filteredTableData.length

            if (initialFilterSelect) {
                setFilteredTableData(currentFilteredRows)
                dispatch(tableAction.addTotalPageCount(Math.ceil(currentFilteredRows.length / 20)))
                setInitialFilterSelect(false)
            }
            else {
                setFilteredTableData((previousData) => [...previousData, ...currentFilteredRows])
                dispatch(tableAction.addTotalPageCount(Math.ceil(totalFilteredRows / 20)))
            }

        }
        else {
            let remainingFilterData = filteredTableData.filter((row) => {
                type rowKey = keyof typeof row;
                const rowCell = selectedColumn as rowKey;
                return !String(row[rowCell]).includes(selectedFilterVal.name)
            })


            if (remainingFilterData.length === 0) {
                setFilteredTableData(tableData);
                dispatch(tableAction.addTotalPageCount(Math.ceil(tableData.length / 20)))
            }
            else {
                setFilteredTableData(remainingFilterData);
                dispatch(tableAction.addTotalPageCount(Math.ceil(remainingFilterData.length / 20)))
            }

        }

        let uniqueValArray: uniqueColumnType = JSON.parse(JSON.stringify(uniqueColumnVal));
        console.log('uniqueValArray check error', uniqueValArray);
        console.log('selectedFilterVal check error', selectedFilterVal);


        Object.entries(uniqueValArray).map(([key, value]) => {

            if (key === selectedColumn) {
                value.map((uniqueVal: uniqueValueType) => {
                    if (uniqueVal.name === selectedFilterVal.name) {
                        uniqueVal.checked = checked
                        return uniqueVal
                    }
                    else {
                        return uniqueVal
                    }
                })
            }
            else {
                return value
            }
        })
        console.log('uniqueValArray after select', uniqueValArray);
        dispatch(tableAction.setUniqueColumnVal(uniqueValArray))
    }

    const findUniqueColumnValue = (columnName: string) => {

        let uniqueValArray = JSON.parse(JSON.stringify(uniqueColumnVal))
        tableData.map((row) => {
            type rowKey = keyof typeof row;
            const rowCell = columnName as rowKey;
            if (!uniqueVal.current.has(row[rowCell])) {
                uniqueVal.current.add(row[rowCell])
                uniqueValArray[columnName].push({ name: row[rowCell], checked: false })
            }
        })
        dispatch(tableAction.setUniqueColumnVal(uniqueValArray))
    }

    const handleFilterSelect = (columnName: string) => {
        findUniqueColumnValue(columnName)
        setShowFilterVal(true)
        setSelectedColumn(columnName)

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
        console.log('in page increment', tableData);
        console.log('in page increment', filteredTableData);

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

    const updateCurrentPage = (buttonIndex: number) => {
        setCurrentPage(buttonIndex)
    }

    const handleCloseFilter = () => {
        setShowFilterVal(false)
        dispatch(tableAction.addTableData(filteredTableData))
        setInitialFilterSelect(true)
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
                                <span className='cursor' onClick={() => handleFilterSelect(column.dataField)}>
                                    <FontAwesomeIcon icon={faFilter} />
                                </span>

                                <div className='cursor' onClick={(e) => handleSorting(e, column.caption, idx)}>
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

                    {paginatedTableData.map((row) => {
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
                selectedColumn={selectedColumn}
                handleCloseFilter={handleCloseFilter}
                handleFilterValue={handleFilterValue}
            />}

        </div>
        <Pagination
            currentPage={currentPage}
            handlePageIncrement={handlePageIncrement}
            handlePageDecrement={handlePageDecrement}
            updateCurrentPage={updateCurrentPage}
        />
    </div>
}

export default ReactTable;