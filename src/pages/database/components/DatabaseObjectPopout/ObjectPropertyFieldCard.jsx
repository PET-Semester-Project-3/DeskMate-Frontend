import * as React from 'react';
import dayjs from 'dayjs';
import { Box, TextField  } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/* Controller */
export default function ObjectPropertyFieldCardController({ propertyName, propertyType, propertyValue, onPropertyEdit, required }) {
  
  const [value, setValue] = React.useState('');
  const [valueErrorText, setValueErrorText] = React.useState('');
  
  const onValueChange = (e) => {
    if (propertyType == 'Date') {
      const newValue = e;
      setValue(newValue);
      onPropertyEdit(propertyName, newValue);
      return;
    }
    let newValue = e.target.value;
    switch (propertyType){
      case 'String':
        setValue(newValue);
        break;
      case 'Number':
        if (!isNaN(newValue)){
            setValue(newValue);
            if (valueErrorText != '') setValueErrorText('');
          }
        else
          setValueErrorText(`${newValue} is not a Number`);
        break;
      case 'Array':
        newValue = newValue.split(',')
        if (Array.isArray(newValue)){
          setValue(newValue);
          if (valueErrorText != '') setValueErrorText('');
        }
        else
          setValueErrorText(`${newValue} is not an Array`);
        break;
      default:
        setValue(newValue);
        break;
    };
    onPropertyEdit(propertyName, newValue);
  }

  React.useEffect(() => {
    if (propertyType == 'Date' && propertyValue){
      setValue(dayjs(propertyValue.toISOString()));
    }
    else if (propertyValue == ' ')
      setValue('');
    else
      setValue(propertyValue);
    if (valueErrorText)
      setValueErrorText('');
    onPropertyEdit(propertyName, propertyValue);
  }, [propertyValue])

  return (
    <ObjectPropertyFieldCard 
      name={propertyName}
      type={propertyType}
      value={value}
      errorText={valueErrorText}
      onValueChange={onValueChange}
      required={required}
    />
  )
}

/* View */
export function ObjectPropertyFieldCard({ name, type, value, errorText, onValueChange, required }) {
  return (
    <Box component='div' id='object-property-field-card' >
      {type == 'object' ?
            null
            : (
              <Box component='section' id='object-property-field-card-input-container' sx={{ m: 1, width: 230 }}>
                {type == 'Date' ?
                      <DatePicker 
                        component='form' 
                        id='object-property-field-card-input-datepicker' 
                        value={value == '' ? dayjs('2001-01-01T00:00') : value}
                        onChange={onValueChange}
                      />
                    : <TextField
                        component='form'
                        id='object-property-field-card-input-textfield'
                        required={required}
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