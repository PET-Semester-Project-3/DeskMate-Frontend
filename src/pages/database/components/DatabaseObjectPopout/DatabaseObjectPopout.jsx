import * as React from 'react';
import { Paper, Box, Backdrop, Button, Typography } from '@mui/material';
import ObjectPropertyFieldCard from './ObjectPropertyFieldCard'

/* Controller */
export default function DatabaseObjectPopoutController({ selectedEntry, isOpen, onEditingStateChange, schematicObject, onSaveClick, blackListedProperties, requiredProperties }) {
    
  const [properties, setProperties] = React.useState([]);
  const [object, setObject] = React.useState({});
  
  function onPropertyEdit(name, value){
    if (name == null || value == null)
      return;
    let o = {...object};
    o[name.toLowerCase()] = value;
    setObject(o);
  }

  const onSaveClickInternal = (obj) => {
    properties.forEach(prop => {
      if (prop.value != null)
        prop.value = ' ';
    });
    onSaveClick(obj);
  }
  
  React.useEffect(() => {
    let o;
    if (selectedEntry != null)
      o = {...selectedEntry};
    if (o == null && schematicObject != null)
      o = {...schematicObject};
    if (o == null)
      return;
    var properties = [];
    Object.getOwnPropertyNames(o).forEach(property => {
      if (blackListedProperties != null && blackListedProperties.includes(property))
        return;
      const headerName = property.toUpperCase();
      const type = o[property] != null ? o[property].constructor.name : 'Undefined';
      var value = '';
      if (selectedEntry)
        value = o[property] != null ? o[property] : '';
      properties.push({
        headerName: headerName,
        type: type,
        value: value,
        required: requiredProperties != null ? requiredProperties.includes(property) : false
      });
    });
    setProperties(properties);
    setObject(selectedEntry != null ? {...selectedEntry} : {});
  }, [selectedEntry, schematicObject, blackListedProperties, requiredProperties]);
  
  return (
    <DatabaseObjectPopout 
      isOpen={isOpen} 
      onEditingStateChange={onEditingStateChange} 
      propertiesSchematic={properties}
      onSaveClick={onSaveClickInternal}
      object={object}
      onPropertyEdit={onPropertyEdit}
    />
  )
}

/* View */
export function DatabaseObjectPopout({ isOpen, onEditingStateChange, propertiesSchematic, onSaveClick, object, onPropertyEdit }) {
  return (
    <Backdrop
      component='div'
      id='database-data-object-popout'
      open={isOpen}
      sx={{ zIndex: 200 }}
    >
      <Box
        component='section'
        id='database-data-object-popout-sized-container'
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '75%',
            height: '75%',
            maxWidth: 1000, 
            maxHeight: 650,
          }}
      >
        {/* Close Button */}
        <Box
          component='section'
          id='database-data-object-popout-close-button-container'
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
          <Button
            component='button'
            id='database-data-object-popout-close-button'
            variant='contained'
            onClick={onEditingStateChange}
            sx={{ width: 50, height: 45, mb: 1 }}
          >X</Button>
        </Box>
        {/* Window */}
        <Paper
          component='section'
          id='database-data-object-popout-window-container'
          sx={{ 
            width: '100%',
            height: '100%',
          }}
        >
          <Box component='section' id='database-data-object-popout-window-header-container' sx={{ height: '87%' }}>
            <Typography
              component='h4'
              id='database-data-object-popout-window-header'
              variant="h4"
              sx={{
                fontWeight: 700,
                m: 2,
                color: '#667eea'
              }}
            >Object Schema</Typography>
            <Box component='section' id='database-data-object-popout-window-form-container' sx={{ m: 1, display: 'flex', flexWrap: 'wrap', overflow: 'auto' }} >
              {propertiesSchematic.map(schematic => {
                  return (
                    <ObjectPropertyFieldCard 
                      propertyName={schematic.headerName}
                      propertyType={schematic.type} 
                      propertyValue={schematic.value}
                      originalSchematic={schematic}
                      onPropertyEdit={onPropertyEdit}
                      required={schematic.required}
                    />
                  )
                })
              }
            </Box>
          </Box>
          {/* Save Button */}
          <Box
            component='section'
            id='database-data-object-popout-window-save-button-container'
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              height: '10%'
            }}
          >
            <Button
              component='button'
              id='database-data-object-popout-window-save-button'
              variant='contained'
              onClick={() => onSaveClick(object)}
              sx={{ width: 75, height: 35, m: 2 }}
            >Save</Button>
        </Box>
        </Paper>
      </Box>
    </Backdrop>
  );
}