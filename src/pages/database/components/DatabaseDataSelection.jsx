import * as React from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

/* Controller */
export default function DatabaseDataSelectionController({ dbSelection, onSelectionChanged }) {
    
    const [dbDataSelections, setGridRows] = React.useState([...dbSelection]);
    const [selected, setSelected] = React.useState(dbSelection[0].name)

    const handleChangeSelected = (event) => {
        setSelected(event.target.value);
        onSelectionChanged(event.target.value);
    };
    
    return (
        <DatabaseDataSelection 
            dbDataSelections={dbDataSelections} 
            selected={selected} 
            handleChangeSelected={handleChangeSelected}
        />
    )
}

/* View */
export function DatabaseDataSelection({ dbDataSelections, selected, handleChangeSelected }) {
  return (
    <FormControl>
      <FormLabel>Available</FormLabel>
      <RadioGroup
        row
        value={selected}
        onChange={handleChangeSelected}
      >
        {
            dbDataSelections.map(selecter => {
                return <FormControlLabel value={selecter.name} control={<Radio />} label={selecter.name} />
            })
        }
      </RadioGroup>
    </FormControl>
  )
}