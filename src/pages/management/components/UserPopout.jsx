import * as React from 'react';
import { Box } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import GenericPopout from '../../../components/GenericPopout'

/* Controller */
export default function UserPopoutController({ user, popupOpen, setPopupOpen, onSaveClick, onDeleteClick, permissions, desks }) {

    const permissionItems = [
        {
            id: 'sites',
            label: 'Sites',
            children: permissions.sort((a, b) => a.label > b.label ? 1 : -1).map(permission => ({
                id: permission.id,
                label: permission.label,
            })),
        },
    ];
    const deskItems = [
        {
            id: 'desks',
            label: 'Desks',
            children: desks.sort((a, b) => a.name > b.name ? 1 : -1).map(desk => ({
                id: desk.id,
                label: desk.name,
            })),
        },
    ]
    const [selectedPermissionItems, setSelectedPermissionItems] = React.useState([]);
    const [selectedDeskItems, setSelectedDeskItems] = React.useState([]);

    const handleSelectedPermissionItemsChange = (event, ids) => {
        setSelectedPermissionItems(ids);
        user.userPermissions = ids ? ids.map(id => ({ permission: permissions.find(p => p.id == id) })) : [];
    }
    const handleSelectedDeskItemsChange = (event, ids) => {
        setSelectedDeskItems(ids);
        user.userDesks = ids ? ids.map(id => ({ desk: desks.find(d => d.id == id) })) : [];
    }

    React.useEffect(() => {
        setSelectedPermissionItems(
            user?.userPermissions ? user?.userPermissions?.map(up => up.permission.id) : []
        );
        setSelectedDeskItems(
            user?.userDesks ? user?.userDesks?.map(ud => ud.desk.id) : []
        );
    }, [user]);

    return (
        <UserPopout 
            user={user}
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
            permissionItems={permissionItems}
            deskItems={deskItems}
            selectedPermissionItems={selectedPermissionItems}
            handleSelectedPermissionItemsChange={handleSelectedPermissionItemsChange}
            selectedDeskItems={selectedDeskItems}
            handleSelectedDeskItemsChange={handleSelectedDeskItemsChange}
        />
    )
}

/* View */
export function UserPopout({ user, popupOpen, setPopupOpen, onSaveClick, onDeleteClick, permissionItems, deskItems, selectedPermissionItems, handleSelectedPermissionItemsChange, selectedDeskItems, handleSelectedDeskItemsChange }) {
  return (
        <Box component='section' id='user-popout' sx={{ display: 'flex', height: '100%', width: '100%', m: 2, mt: 4, justifyContent: 'center' }}>
            {
                user ? (
                    <GenericPopout header={user.email.toUpperCase()} onSaveClick={onSaveClick} onDeleteClick={onDeleteClick} isOpen={popupOpen} setIsOpen={setPopupOpen}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <RichTreeView
                                    multiSelect 
                                    checkboxSelection
                                    selectionPropagation={{parents: true, descendants: true}}
                                    sx={{ maxHeight: 500, flexGrow: 1, width: 200, overflowY: 'auto' }}
                                    items={deskItems}
                                    selectedItems={selectedDeskItems}
                                    onSelectedItemsChange={handleSelectedDeskItemsChange}
                                />
                                <RichTreeView
                                    multiSelect 
                                    checkboxSelection
                                    selectionPropagation={{parents: true, descendants: true}}
                                    sx={{ maxHeight: 500, flexGrow: 1, width: 200, overflowY: 'auto' }}
                                    items={permissionItems}
                                    selectedItems={selectedPermissionItems}
                                    onSelectedItemsChange={handleSelectedPermissionItemsChange}
                                />
                            </Box>
                    </GenericPopout>
                ) : null
            }
        </Box>
    )
}