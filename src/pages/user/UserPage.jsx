import * as React from 'react';
import { Box, Avatar, Typography, CircularProgress, Chip, TextField, IconButton  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import useSession from '../../models/SessionContext';
import { asyncGetUserDesks, asyncGetUserScheduledTasks } from '../../models/api-comm/APIUsers';
import SmallDeskCard from './components/SmallDeskCard';
import SmallScheduledTaskCard from './components/SmallScheduledTaskCard';
import useWindowDimensions from '../../models/WindowDimensions'

/* Controller */
export default function UserPageController() {

    const [waitingForDeskResponse, setWaitingForDeskResponse] = React.useState(false);
    const [waitingForScheduledTaskResponse, setWaitingForScheduledTasksResponse] = React.useState(false);

    const { height, width } = useWindowDimensions();
    
    const [desks, setDesks] = React.useState([]);
    const [scheduledTasks, setScheduledTasks] = React.useState([]);
    const {session} = useSession();
    
    React.useEffect(() => {
        async function getDesks(id) {
          setWaitingForDeskResponse(true);
          const desks = await asyncGetUserDesks(id);
          setDesks(desks);
          setWaitingForDeskResponse(false);
        }
        async function getScheduledTasks(id) {
          setWaitingForScheduledTasksResponse(true);
          const tasks = await asyncGetUserScheduledTasks(id);
          console.log(tasks)
          setScheduledTasks(tasks);
          setWaitingForScheduledTasksResponse(false);
        }
        getDesks(session?.user?.id);
        getScheduledTasks(session?.user?.id);
      }, []);

    return (
        <UserPage
            windowHeight={height}
            userEmail={session?.user?.email}
            userPages={session?.pages}
            scheduledTasks={scheduledTasks}
            desks={desks}
            waitingForDeskResponse={waitingForDeskResponse}
            waitingForScheduledTaskResponse={waitingForScheduledTaskResponse}
        />
    )
}

/* View */
export function UserPage({ windowHeight, userEmail, userPages, scheduledTasks, desks, waitingForDeskResponse, waitingForScheduledTaskResponse }) {
    return (
        <Box component='main' id='user-page' sx={{ display: 'flex', gap: 5, p: 3 }}>
            <Box 
                component='section' 
                id='user-info-container' 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '20%',
                    minHeight: 550,
                    height: windowHeight-500,
                    minWidth: 450,
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                    },
                }} >
                <Box component='section' id='user-avatar-container' sx={{ display: 'flex', justifyContent: 'center', m: 8, mb: 3 }}>
                    <Avatar 
                        variant="square" 
                        sx={{ 
                            width: 150, 
                            height: 150, 
                            fontSize: 48, 
                            bgcolor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                            },
                        }}>
                            {userEmail ? userEmail.split('@').map(part => part[0].toUpperCase()) : '??'}
                    </Avatar>
                </Box>
                <Typography component='h5' id='user-info-header' variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {userEmail}
                </Typography>
                <Box component='section' id='user-info-pages-container' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 4, width: '80%', height: '20%' }}>
                    <Typography component='h6' id='user-info-pages-header' variant="h6" sx={{ mb: 1, fontWeight: '600' }}>
                        Assigned Pages:
                    </Typography>
                    <Box component='div' id='user-info-pages-chips' sx={{ display: 'flex' }} >
                        {userPages && userPages.length > 0 ? (
                            userPages.map((page) => (
                                <Chip
                                    label={page.label}
                                    size="small"
                                    sx={{ mb: 1, width: '100%' }}
                                />
                            ))
                        ) : (
                            <Typography component='p' id='user-info-no-pages-text' variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                No pages assigned
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box component='section' id='user-desks-container' sx={{ display:'flex', flexDirection: 'row', width: '40%', gap: 2, flexWrap: 'wrap', pl: 2 }}>
                <Box component='section' id='user-desks-container' sx={{ width: '100%' }}>
                    <Typography
                        component='h4'
                        id='user-desks-header'
                        variant="h5"    
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: '#764ba2',
                        }}
                    >
                        Your Desks:
                    </Typography>
                        {
                             waitingForDeskResponse ? (
                                    <Box component={'section'} id='user-desks-loading-container' sx={{ display: 'flex', p: 5 }}>
                                        <CircularProgress
                                            component='div'
                                            id='user-desks-circularprogress'
                                            size={60}
                                            sx={{
                                                color: 'primary.main',
                                            }}
                                        />
                                    </Box>
                            ) : (
                                <Box component='div' id='user-desks-list' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
                                    {desks.map((desk) => (
                                        <SmallDeskCard key={desk.id} desk={desk} isOnline={desk.is_online} />
                                    ))}
                                </Box>
                            )
                        }
                 </Box>
            </Box>
            <Box component='section' id='user-scheduled-tasks-container'  sx={{ width: '40%' }}>
                <Typography
                    component='h4'
                    id='user-scheduled-tasks-header'
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: '#fa709a',
                    }}
                >
                    Scheduled Tasks:
                </Typography>
                <Box component='div' id='user-scheduled-tasks-list' sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                    {
                        waitingForScheduledTaskResponse ? (
                            <Box component={'section'} id='user-scheduled-tasks-loading-container' sx={{ display: 'flex', p: 5 }}>
                                <CircularProgress
                                    component='div'
                                    id='user-scheduled-tasks-circularprogress'
                                    size={60}
                                    sx={{
                                        color: 'primary.main',
                                    }}
                                />
                            </Box>
                        ) : (
                            scheduledTasks.map((task) => (
                                <SmallScheduledTaskCard key={task.id} scheduledTask={task} />
                            ))
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}