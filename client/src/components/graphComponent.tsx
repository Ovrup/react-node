import React, { useEffect, useState } from 'react';
import {
    Chart, Series, ArgumentAxis,
    Legend,
    Label,
} from 'devextreme-react/chart';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { graphAction } from '../store/graphSlice';
import ColumnAttribute from '../models/model.column';
import { optionsType } from '../models/model';
import DatePicker from 'react-datepicker';
import './graphComponent.css';
import './header.css'
import "react-datepicker/dist/react-datepicker.css";
import Select from './select';

const GraphComponent: React.FC = () => {

    const graphData = useAppSelector(state => state.graph.graphData);
    const startDate = useAppSelector(state => state.graph.startDate);
    const endDate = useAppSelector(state => state.graph.endDate);
    const dispatch = useAppDispatch()




    const options = [{ name: 'Type', value: 'type' }, { name: 'Severity', value: 'severity' }]
    const [selectedOption, setSelectedOption] = useState<optionsType>(options[0])

    useEffect(() => {
        fetch(`/graph_range?start=${startDate!.toISOString()}&end=${endDate!.toISOString()}&type=${selectedOption.value}`).then((res) => res.json())
            .then((res) => dispatch(graphAction.addGraphData(res)))
    }, []);


    const handleStartDate = (e: Date) => {
        dispatch(graphAction.setStartDate(e))
    }

    const handleEndDate = (e: Date) => {
        dispatch(graphAction.setEndDate(e))
    }

    const handlefetchData = () => {
        fetch(`/graph_range?start=${startDate!.toISOString()}&end=${endDate!.toISOString()}&type=${selectedOption.value}`).then((res) => res.json())
            .then((res) => dispatch(graphAction.addGraphData(res)))
    }

    const columns = [
        new ColumnAttribute('type', 'Type', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('severity', 'Severity', 'string', 'left', true, false, '100px'),
        new ColumnAttribute('kill_chain_phase', 'Kill chain phase', 'string', 'left', true, false, '200px'),
        new ColumnAttribute('timestamp', 'Timestamp', 'datetime', 'left', true, true, '300px'),
        new ColumnAttribute('attacker_id', 'Attacker id', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('attacker_ip', 'Attacker ip', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('attacker_name', 'Attacker name', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('attacker_port', 'Attacker port', 'number', 'left', true, false, '100px'),
        new ColumnAttribute('decoy_id', 'Decoy id', 'number', 'left', true, false, '100px'),
        new ColumnAttribute('decoy_name', 'Decoy name', 'string', 'left', true, true, '100px'),
        new ColumnAttribute('decoy_group', 'Decoy group', 'string', 'left', true, false, '100px'),
        new ColumnAttribute('decoy_ip', 'Decoy ip', 'string', 'left', true, false, '100px'),
        new ColumnAttribute('decoy_port', 'Decoy port', 'number', 'left', true, false, '100px'),
        new ColumnAttribute('decoy_type', 'Decoy Type', 'string', 'left', true, false, '100px')
    ];

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(options[e.target.selectedIndex])
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

            <div className="col-4">
                <Select
                    options={options}
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
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
                    type="bar"
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