import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import './pagination.css'

const Pagination: React.FC<{ currentPage: number, handlePageIncrement: () => void, handlePageDecrement: () => void }> = (props) => {

    const [pageSliceStart, setPageSliceStart] = useState<number>(0);
    const totalPageCount = useAppSelector((state) => state.table.totalPageCount)


    let pagingArray = Array.from({ length: totalPageCount }, (_, idx) => idx + 1)
    let pagingSlicedArray: number[] = pagingArray.slice(pageSliceStart, pageSliceStart + 5)

    useEffect(() => {
        pagingSlicedArray = pagingArray.slice(pageSliceStart, pageSliceStart + 5)
        console.log(pageSliceStart);

    }, [pageSliceStart])



    useEffect(() => {
        let allPages = document.querySelectorAll('div.pagination-container div.page-pill-container div');
        allPages.forEach((page) => {
            page?.classList.remove('active')
        })

        let activePage = document.querySelector(`div.pagination-container div.page-pill-container div:nth-child(${props.currentPage > 5 ? 5 : props.currentPage
            })`)

        activePage?.classList.add('active')

    }, [props.currentPage, totalPageCount, pageSliceStart])

    const handleNextPage = () => {

        if (props.currentPage >= 5 && pageSliceStart < (totalPageCount - 5)) {
            setPageSliceStart((previous) => previous + 1)
        }
        else {
            setPageSliceStart(0)
        }

        props.handlePageIncrement();
    }

    const handlePreviousPage = () => {
        if (props.currentPage === 1) {
            setPageSliceStart(totalPageCount - 5)
        }
        else if (pageSliceStart > 0) {
            setPageSliceStart((previous) => previous - 1)
        }
        else {
            setPageSliceStart(0)
        }
        props.handlePageDecrement()
    }


    return <div className="pagination-container">
        <button onClick={() => handlePreviousPage()}>Previous</button>
        <div className="page-pill-container">
            {pagingSlicedArray.map((page) => {
                return <div className="page-number">{page}</div>
            })}
        </div>
        <button onClick={() => handleNextPage()}>Next</button>
    </div>
}

export default Pagination