import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

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
    <FormControl id='database-data-selector' >
      <FormLabel id='database-data-selector-label' >Available</FormLabel>
      <RadioGroup
        id='database-data-selector-radiogroup'
        row
        value={selected}
        onChange={handleChangeSelected}
      >
        {
            dbDataSelections.map(selecter => {
                return (
                <FormControlLabel 
                  id={'database-data-selector-control-' + selecter.name.toLowerCase()} 
                  value={selecter.name} control={
                    <Radio 
                      id={'database-data-selector-control-' + selecter.name.toLowerCase() +'-radio'} 
                    />
                  } 
                  label={selecter.name} />
                )
            })
        }
      </RadioGroup>
    </FormControl>
  )
}