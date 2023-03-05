import React from "react";
import { optionsType } from "../models/model";

const Select: React.FC<{ options: optionsType[], selectedOption: optionsType, handleOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = (props) => {
    return <select onChange={(e) => props.handleOptionChange(e)}>
        {props.options.map((option) => {
            return <option value={props.selectedOption.name}>{option.name}</option>
        })}
    </select>
}

export default Select;