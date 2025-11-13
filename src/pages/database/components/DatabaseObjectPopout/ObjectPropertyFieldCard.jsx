import * as React from 'react';
import dayjs from 'dayjs';
import { Box, Card, CardContent, TextField  } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/* Controller */
export default function ObjectPropertyFieldCardController({ propertyName, propertyType, propertyValue, originalSchematic, onPropertyEdit }) {
  
  const [value, setValue] = React.useState('');
  const [valueErrorText, setValueErrorText] = React.useState('');
  
  const onValueChange = (e) => {
    const newValue = e.target.value;
    switch (propertyType){
      case 'string':
        setValue(newValue);
        break;
      case 'number':
        if (!isNaN(newValue)){
            setValue(newValue);
            if (valueErrorText != '') setValueErrorText('');
          }
        else
          setValueErrorText(`${newValue} is not a Number`);
        break;
      case 'date':
        //setValue(dayjs(newValue));
        break;
      default:
        setValue(newValue);
        break;
    };
    onPropertyEdit(propertyName, newValue);
  }

  React.useEffect(() => {
    if (propertyType == 'date')
      setValue(undefined);
    else
      setValue(propertyValue);
    if (valueErrorText != '')
      setValueErrorText('');
    onPropertyEdit(propertyName, value);
  }, [propertyValue])

  return (
    <ObjectPropertyFieldCard 
      name={propertyName}
      type={propertyType}
      value={value}
      errorText={valueErrorText}
      onValueChange={onValueChange}
    />
  )
}

/* View */
export function ObjectPropertyFieldCard({ name, type, value, errorText, onValueChange }) {
  return (
    <Box id='object-property-field-card' >
      {type == 'object' ?
            null
            : (
              <Box id='object-property-field-card-input-container' sx={{ m: 1, width: 230 }}>
                {type == 'date' ?
                      <DatePicker id='object-property-field-card-input-datepicker' />
                    : <TextField
                        id='object-property-field-card-input-textfield'
                        error={errorText == '' ? false : true}
                        label={name}
                        value={value} 
                        onChange={onValueChange} 
                        variant='outlined'
                        helperText={errorText}
                        sx={{ width: '100%' }} 
                      />
                  }
              </Box>
            )
      }
    </Box>
  );
}