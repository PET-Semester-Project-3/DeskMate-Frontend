import * as React from 'react';
import { Box, List, Typography, ListItem, Divider, Badge, CircularProgress  } from '@mui/material';
import { Whatshot, Desk, SentimentSatisfiedAltRounded, SentimentSatisfied, SentimentVeryDissatisfied } from '@mui/icons-material'
import { calculateDaysDiff, dateToString } from '../../../models/DateTimeCal'
import { asyncGetDeskMates } from '../../../models/api-comm/APIDeskMate'

/* Controller */
export default function LeaderBoardSectionController({ session }) {

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const [deskmates, setDeskmates] = React.useState(null);
    
    const today = Date.now();
        
    React.useEffect(() => {
        const getDeskmates = async () => {
            setWaitingForResponse(true);
            const deskmates = await asyncGetDeskMates();
            setDeskmates(deskmates);
            setWaitingForResponse(false);
        }
        getDeskmates();
    }, []);

    return (
        <LeaderBoardSectionSection
            waitingForResponse={waitingForResponse}
            userId={session?.user?.id}
            deskmates={deskmates}
            today={today}
        />
    )
}

/* View */
export function LeaderBoardSectionSection({ waitingForResponse, userId, deskmates, today }) {
    return (
        <Box component='section' id='leaderboard-section' sx={{  height: '100%', width: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', width: '100%', m: 2, mt: 4, justifyContent: 'center' }}>
                {
                    waitingForResponse ? (
                        <CircularProgress/>
                    ) : (
                        deskmates?.filter(dm => !dm.last_streak || calculateDaysDiff(dm.last_streak, today) <= 5).length > 0 ? (
                            <List 
                                sx={{ 
                                    width: '35%',
                                    overflow: 'auto',
                                    maxHeight: '92%'
                                }}>
                                {
                                    deskmates.sort((a, b) => b.streak - a.streak ).filter(dm => !dm.last_streak || calculateDaysDiff(dm.last_streak, today) <= 5).map(dm => {
                                        return (
                                            <Box>
                                                <ListItem
                                                    sx={{
                                                        bgcolor: dm.user_id == userId ? 'background.paper' : 'background.default',
                                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
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
                                                            {
                                                                <Badge
                                                                    badgeContent={
                                                                        !dm.last_streak ? <SentimentSatisfiedAltRounded/>
                                                                        : calculateDaysDiff(dm.last_streak, today) <= 2 ? <SentimentSatisfiedAltRounded/>
                                                                        : calculateDaysDiff(dm.last_streak, today) <= 3 ? <SentimentSatisfied/>
                                                                        : <SentimentVeryDissatisfied/>
                                                                    } 
                                                                    color={
                                                                        !dm.last_streak ? 'success' 
                                                                        : calculateDaysDiff(dm.last_streak, today) <= 2 ? 'success' 
                                                                        : calculateDaysDiff(dm.last_streak, today) <= 3 ? 'warning' 
                                                                        : 'error'
                                                                    }
                                                                    sx={{
                                                                        mr: 3,
                                                                        '& .MuiBadge-badge': {
                                                                            right: 2,
                                                                            top: 12,
                                                                            height: 25,
                                                                            width: 25,
                                                                            borderRadius: 5
                                                                        },
                                                                    }}
                                                                >
                                                                        <Desk
                                                                            color='primary'
                                                                            sx={{ 
                                                                                height: 65,
                                                                                width: 65,
                                                                            }}
                                                                        />
                                                                </Badge>
                                                            }
                                                            <List>
                                                                <Typography variant='h5' color='primary' >
                                                                    {dm.name}
                                                                </Typography>
                                                                <Typography variant='body2' color='secondary' >
                                                                    {"Streak: " + dm.streak + ' day' + (dm.streak !== 1 ? 's' : '')}
                                                                    {
                                                                        dm.last_streak != null && new Date(dm.last_streak).getDate() == new Date(today).getDate() ?
                                                                        <Whatshot sx={{ height: 20 }} /> : null
                                                                    }
                                                                    {
                                                                        dm.last_streak ? ' -> ' + dateToString(dm.last_streak) : null
                                                                    }
                                                                </Typography>
                                                            </List>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', width: '50%', justifyContent: 'flex-end' }}>
                                                            <List sx={{ justifyItems: 'right' }}>
                                                                <Typography variant='h6' color='primary' >{dm.user.email}</Typography>
                                                                <Typography variant='body2' color='secondary' >{(dm.user_id == userId ? '(You)' : '')}</Typography>
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
                        ) :
                        (
                            <Typography>
                                There was found no Deskmates, so be the first to create their Deskmate.
                            </Typography>
                        )
                    )
                }
            </Box>
        </Box>
    )
}
