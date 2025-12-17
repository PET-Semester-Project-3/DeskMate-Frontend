import * as React from 'react';
import useSession from '../../models/SessionContext';
import { Typography, Box, CircularProgress } from '@mui/material';
import RestrictedPage from '../restricted/RestrictedPage'
import { asyncGetUsers, asyncDeleteUser } from '../../models/api-comm/APIUsers'
import { asyncGetPermissions } from '../../models/api-comm/APIPermission'
import { asyncGetDesks } from '../../models/api-comm/APIDesk'
import { asyncPostUserDesk, asyncDeleteUserDesk } from '../../models/api-comm/APIUserDesk'
import { asyncPostUserPermission, asyncDeleteUserPermission } from '../../models/api-comm/APIUserPermission'
import UserList from './components/UserList';
import UserPopout from './components/UserPopout';
import { useSnackbar } from 'notistack';


/* Controller */
export default function ManagementPageController() {

    const { enqueueSnackbar } = useSnackbar();

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const { session } = useSession();

    const [users, setUsers] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [desks, setDesks] = React.useState([]);

    const [selectedUser, setSelectedUser] = React.useState(null)
    const [popupOpen, setPopupOpen] = React.useState(false)  

    const saveUserData = () => {
        const updateUserData = async () => {
            if (!selectedUser) return;
            setWaitingForResponse(true);
            const currentUser = users.find(user => user.id == selectedUser.id);

            // Update Permissions
            const currentPermissionIds = currentUser.userPermissions.map(up => { if (up?.permission?.id) return up.permission.id });
            const selectedPermissionIds = selectedUser.userPermissions.map(up => { if (up?.permission?.id) return up.permission.id });
            for (const pid of selectedPermissionIds) {
                if (!currentPermissionIds.includes(pid)) {
                    if (!pid) continue;
                    const response = await asyncPostUserPermission({userId: selectedUser.id, permissionId: pid});
                    if (response.id)
                        enqueueSnackbar(`Gave ${currentUser.email} permission: ${permissions.find(p => p.id == pid).label}`, { variant: 'success' });
                    else
                        enqueueSnackbar(`${response.message}`, { variant: 'error' });
                }
            }
            for (const pid of currentPermissionIds) {
                if (!selectedPermissionIds.includes(pid)) {
                    const relationId = currentUser.userPermissions.find(up => up.permission.id == pid).id;
                    const response = await asyncDeleteUserPermission(relationId);
                    if (response.success)
                        enqueueSnackbar(`Deleted ${currentUser.email} permission: ${permissions.find(p => p.id == pid).label}`, { variant: 'info' });
                    else
                        enqueueSnackbar(`${response.message}`, { variant: 'error' });
                }
            }   
            // Update Desks
            const currentDeskIds = currentUser.userDesks.map(ud => { if (ud?.desk?.id) return ud.desk.id } );
            const selectedDeskIds = selectedUser.userDesks.map(ud => { if (ud?.desk?.id) return ud.desk.id });
            for (const did of selectedDeskIds) {
                if (!currentDeskIds.includes(did)) {
                    if (!did) continue;
                    const response = await asyncPostUserDesk({userId: selectedUser.id, deskId: did});
                    if (response.id)
                        enqueueSnackbar(`Gave ${currentUser.email} desk access: ${desks.find(p => p.id == did).name}`, { variant: 'success' });
                    else
                        enqueueSnackbar(`${response.message}`, { variant: 'error' });
                }
            }
            for (const did of currentDeskIds) {
                if (!selectedDeskIds.includes(did)) {
                    const relationId = currentUser.userDesks.find(ud => ud.desk.id == did).id;
                    const response = await asyncDeleteUserDesk(relationId);
                    if (response.success)
                        enqueueSnackbar(`Deleted ${currentUser.email} desk access: ${desks.find(p => p.id == did).name}`, { variant: 'info' });
                    else
                        enqueueSnackbar(`${response.message}`, { variant: 'error' });
                }
            }

            setWaitingForResponse(false);
            setPopupOpen(false); 
            getData();
        }
        updateUserData();
    }

    const removeUserData = async () => {
        const deleteUserData = async () => {
            if (!selectedUser) return;
            if (selectedUser.userPermissions?.map(up => up.permission.route).includes('/database')){
                enqueueSnackbar(`Cannot delete ${selectedUser.email} due to high permission level  -->  Delete user through Database-Page if needed`, { variant: 'error' });
                return;
            }
            setWaitingForResponse(true);
            const response = await asyncDeleteUser(selectedUser.id);
            if (response.success)
                    enqueueSnackbar(`Deleted ${selectedUser.email} successfully`, { variant: 'info' });
                else
                    enqueueSnackbar(`${response.message}`, { variant: 'error' });
            setWaitingForResponse(false);
            setPopupOpen(false); 
            getData();
        }
        deleteUserData();
    }
    
    const selectUserClick = (user) => {
        setSelectedUser({...user});
        setPopupOpen(true);
    }

    async function getData() {
        setWaitingForResponse(true);
        const users = await asyncGetUsers();
        if (users.length)
            setUsers(users);
        const permissions = await asyncGetPermissions();
        if (permissions.length)
            setPermissions(permissions);
        const desks = await asyncGetDesks();
        if (desks.length)
            setDesks(desks);
        setWaitingForResponse(false);
    };
    React.useEffect(() => {
        getData();
    }, []);

    return (
        <RestrictedPage Page={
            <ManagementPage
                currentUser={users.find(user => user.id == session?.user?.id)}
                users={users}
                permissions={permissions}
                desks={desks}
                selectUserClick={selectUserClick}
                selectedUser={selectedUser}
                popupOpen={popupOpen}
                setPopupOpen={setPopupOpen}
                saveUserData={saveUserData}
                removeUserData={removeUserData}
                getData={getData}
                waitingForResponse={waitingForResponse}
            />
        } />
        
    )
}

/* View */
export function ManagementPage({ currentUser, users, permissions, desks, selectUserClick, selectedUser, popupOpen, setPopupOpen, saveUserData, removeUserData, getData, waitingForResponse }) {
    return (
        <Box component='main' id='management-page' sx={{ width: '100%' }}>
            <Typography
                component='h4'
                id='management-page-header'
                variant="h4"
                sx={{
                fontWeight: 700,
                mb: 3,
                color: '#5ccaf6ff'
                }}
            >
                Management
            </Typography>
            <Box component='ul' id='management-page-users-container' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {
                    waitingForResponse ?
                    <Box component={'section'} id='maintenance-page-loading-container' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
                        <CircularProgress 
                        component='div' 
                        id='maintenance-page-circularprogress'
                        size={60}
                        sx={{
                            color: 'primary.main',
                        }}
                        />
                    </Box>
                    : 
                    <UserList users={users} currentUser={currentUser} selectUserClick={selectUserClick} getData={getData} />
                }
            </Box>
            {
                selectedUser ?
                <UserPopout 
                    user={selectedUser} 
                    popupOpen={popupOpen} 
                    setPopupOpen={setPopupOpen} 
                    onSaveClick={saveUserData}
                    onDeleteClick={removeUserData}
                    permissions={currentUser?.id && currentUser?.userPermissions?.map(up => up.permission.route).includes('/database') ? permissions : currentUser.userPermissions.map(up => up.permission)}
                    desks={currentUser?.id && currentUser?.userPermissions?.map(up => up.permission.route).includes('/database') ? desks : currentUser.userDesks.map(ud => ud.desk)}
                />
                : null
            }
        </Box>
    );
}
