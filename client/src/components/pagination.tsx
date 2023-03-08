import React, { useRef, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import './pagination.css'

const Pagination: React.FC<{
    currentPage: number,
    handlePageIncrement: () => void,
    handlePageDecrement: () => void,
    updateCurrentPage: (buttonIndex: number) => void
}> = (props) => {

    const [pageSliceStart, setPageSliceStart] = useState<number>(0);
    const totalPageCount = useAppSelector((state) => state.table.totalPageCount);
    let pageButtonCounter = useRef<number>(1);


    let pagingArray = Array.from({ length: totalPageCount }, (_, idx) => idx + 1)
    let pagingSlicedArray: number[] = pagingArray.slice(pageSliceStart, pageSliceStart + 5)

    useEffect(() => {
        pagingSlicedArray = pagingArray.slice(pageSliceStart, pageSliceStart + 5)

    }, [pageSliceStart])



    useEffect(() => {
        let allPages = document.querySelectorAll('div.pagination-container div.page-pill-container button');
        allPages.forEach((page) => {
            page?.classList.remove('active')
        })

        let activePage = document.querySelector(`div.pagination-container div.page-pill-container button:nth-child(${pageButtonCounter.current})`)

        activePage?.classList.add('active')

    }, [props.currentPage, totalPageCount, pageSliceStart])

    const handleNextPage = () => {



        if (pageButtonCounter.current === 5) {
            pageButtonCounter.current = 5;
            setPageSliceStart((previous) => previous + 1)
        }
        else {
            pageButtonCounter.current += 1
        }

        props.handlePageIncrement();
    }

    const handlePreviousPage = () => {
        if (pageButtonCounter.current === 1) {
            pageButtonCounter.current = 1;
            setPageSliceStart((previous) => previous - 1)
        }
        else {
            pageButtonCounter.current -= 1
        }
        props.handlePageDecrement()
    }

    const handlePageButtonClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        pageButtonCounter.current = index + 1;
        let clickedButton = event.target as HTMLElement;

        props.updateCurrentPage(Number(clickedButton.innerText))

    }


    return <div className="pagination-container">
        <button onClick={() => handlePreviousPage()} className={props.currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} disabled={props.currentPage === 1 ? true : false}>Previous</button>
        <div className="page-pill-container">
            {pagingSlicedArray.map((page, idx) => {
                return <button onClick={(event) => handlePageButtonClick(event, idx)} className="page-button">{page}</button>
            })}
        </div>
        <button onClick={() => handleNextPage()} className={props.currentPage === totalPageCount ? 'cursor-not-allowed' : 'cursor-pointer'} disabled={props.currentPage === totalPageCount ? true : false}>Next</button>
    </div>
}

export default Pagination