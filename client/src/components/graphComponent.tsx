import React, { useEffect } from 'react';
import {
    Chart, Series, ArgumentAxis,
    Legend,
    Label,
} from 'devextreme-react/chart';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { graphAction } from '../store/graphSlice';
import DatePicker from 'react-datepicker';
import './graphComponent.css';
import './header.css'
import "react-datepicker/dist/react-datepicker.css";

const GraphComponent: React.FC = () => {

    const graphData = useAppSelector(state => state.graph.graphData);
    const startDate = useAppSelector(state => state.graph.startDate);
    const endDate = useAppSelector(state => state.graph.endDate);
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetch(`/graph_range?start=${startDate!.toISOString()}&end=${endDate!.toISOString()}`).then((res) => res.json())
            .then((res) => dispatch(graphAction.addGraphData(res)))
    }, []);


    const handleStartDate = (e: Date) => {
        dispatch(graphAction.setStartDate(e))
    }

    const handleEndDate = (e: Date) => {
        dispatch(graphAction.setEndDate(e))
    }

    const handlefetchData = () => {
        fetch(`/graph_range?start=${startDate!.toISOString()}&end=${endDate!.toISOString()}`).then((res) => res.json())
            .then((res) => dispatch(graphAction.addGraphData(res)))
    }


    return <div>
        <div className='row align-items-center justify-content-start date-picker-container'>

            <div className='col-1 fw-bold' style={{ fontSize: "14px" }}>Start Date</div>
            <div className='col-2'>
                <DatePicker
                    selected={startDate}
                    onChange={(e: Date) => handleStartDate(e)}
                    showTimeSelect
                    dateFormat={'MM/dd/yyyy, hh:mm aa'}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                />
            </div>

            <div className='col-1 fw-bold' style={{ fontSize: "14px" }}>End Date</div>
            <div className='col-2'>
                <DatePicker
                    selected={endDate}
                    onChange={(e: Date) => handleEndDate(e)}
                    showTimeSelect
                    dateFormat={'MM/dd/yyyy, hh:mm aa'}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                />
            </div>

            <div className='col-2'>
                <button className='button-class' onClick={() => handlefetchData()}>Apply</button>
            </div>

        </div>

        <div className='row graph-container'>
            <Chart id="chart" dataSource={graphData}>
                <Series
                    valueField="count"
                    argumentField="_id"
                    name="Number Of attacks"
                    type="line"
                    color="#ffaa66" />
                <ArgumentAxis>
                    <Label
                        wordWrap="none"
                        overlappingBehavior={true}
                    />
                </ArgumentAxis>
                <Legend visible={true} />
            </Chart>
        </div>
    </div>
}

export default GraphComponent;