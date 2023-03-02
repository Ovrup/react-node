import React from 'react';
import './header.css'

/* Field chooser component enables user to display the list of table fields. The default fields will be selected beforehand. Any
field can be selected/removed from that list and this will display/hide that field from the grid table.
*/
const FieldChooser: React.FC<{ handleFieldChooser: () => void }> = (props) => {
    return <button className='button-class' onClick={() => props.handleFieldChooser()}>Fields</button>
}

export default FieldChooser