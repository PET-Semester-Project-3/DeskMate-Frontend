import * as React from 'react';
import { Typography, Box, List, ListItem, Divider, Chip, Button } from '@mui/material';
import CreateUserPopout from '../../../components/CreateUserPopout'

/* Controller */
export default function UserListController({ users, currentUser, selectUserClick, getData }) {
  
    const [isCreateUserOpen, setIsCreateUserOpen] = React.useState(false)
  
    return (
        <UserList 
            users={users}
            currentUser={currentUser}
            selectUserClick={selectUserClick}
            isCreateUserOpen={isCreateUserOpen}
            onCreateUserClose={() => setIsCreateUserOpen(false)}
            onCreateUserOpen={() => setIsCreateUserOpen(true)}
            getData={getData}
        />
    )
}

/* View */
export function UserList({ users, currentUser, selectUserClick, isCreateUserOpen, onCreateUserClose, onCreateUserOpen, getData }) {
  return (
    <Box component='section' id='users-section' sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', m: 2, mt: 4, justifyContent: 'center' }}>
        <Box
            component="div"
            id="database-data-actions"
            sx={{ width: "96%", display: "flex", justifyContent: "flex-end" }}
            >
            <Button
                component="button"
                id="database-data-actions-create-button"
                variant="contained"
                onClick={onCreateUserOpen}
                sx={{ mb: 1 }}
                >
                Create New
            </Button>
        </Box>
        <CreateUserPopout
            isOpen={isCreateUserOpen}
            onClose={onCreateUserClose}
            onCreated={() => {
                getData();
            }}
        />
        <List 
            sx={{ 
                width: '95%',
                overflow: 'auto',
                maxHeight: '80%'
            }}>
                {
                    users.sort((a, b) => a.email > b.email ? 1 : -1).map(user => {
                        {/* User cannot give themselves more permissions or desks unless they have /database permissions*/}
                        if (user?.id == currentUser?.id && !user?.userPermissions?.map(up => up.permission.route).includes('/database')) return null;
                        return (
                            <Box>
                                <ListItem
                                    onClick={() => selectUserClick(user)}
                                    sx={{
                                        bgcolor: user?.id == currentUser?.id ? 'background.paper' : 'background.default',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                            cursor: 'pointer',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
                                        },
                                    }}
                                    >
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                width: '100%',
                                            }}>
                                                <Box sx={{ display: 'flex', width: '50%' }}>
                                                    <List>
                                                        <Typography variant='h5' color='primary' >
                                                            {user.email + (user?.id == currentUser?.id ? ' (You)' : '')}
                                                        </Typography>
                                                        <Typography variant='body2' color='secondary' >
                                                            {'Main Desk: ' + user.main_desk_id ? user.userDesks?.find(ud => ud.desk.id == user.main_desk_id) ? user.userDesks?.find(ud => ud.desk.id == user.main_desk_id).desk.name : 'N/A' : 'N/A'}
                                                        </Typography>
                                                    </List>
                                                </Box>
                                                <Box sx={{ display: 'flex', width: '50%', justifyContent: 'flex-end' }}>
                                                    <List sx={{ justifyItems: 'right' }}>
                                                        <Typography variant='h6' color='primary' >{'Desks: ' + user.userDesks?.length }</Typography>
                                                        <Box component='div' id='user-info-pages-chips' sx={{ display: 'flex' }} >
                                                            {user.userPermissions && user.userPermissions.length > 0 ? (
                                                                user.userPermissions.map(up => (
                                                                    <Chip
                                                                        label={up.permission.label}
                                                                        size="small"
                                                                        sx={{ m: 0.25, width: '100%' }}
                                                                    />
                                                                ))
                                                            ) : (
                                                                    <Typography component='p' id='user-info-no-pages-text' variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                                                        ... No pages assigned ...
                                                                    </Typography>
                                                                )
                                                            }
                                                        </Box>
                                                    </List>
                                                </Box>
                                            </Box>
                                        </ListItem>
                                        <Divider />
                                </Box>
                            )
                    })
                }
        </List>
    </Box>
  )
}