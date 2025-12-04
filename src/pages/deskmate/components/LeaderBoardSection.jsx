import * as React from 'react';
import { Box, List, Typography, ListItem, Divider, Badge  } from '@mui/material';
import { Whatshot, Desk, SentimentSatisfiedAltRounded, SentimentSatisfied, SentimentVeryDissatisfied } from '@mui/icons-material'
import { calculateDaysDiff, dateToString } from '../../../models/DateTimeCal'
import { asyncGetDeskMates } from '../../../models/api-comm/APIDeskMate'

/*
Leaderboard page to see all deskmates in the database and their rankings
*/

/* Controller */
export default function LeaderBoardSectionController({ session }) {

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
        
    const [deskmates, setDeskmates] = React.useState(null);
    const today = Date.now();
    
        
    React.useEffect(() => {
        const getDeskmates = async (id) => {
            setWaitingForResponse(true);
            const deskmates = await asyncGetDeskMates();
            setDeskmates(deskmates);
            setWaitingForResponse(false);
        }
        getDeskmates();
    }, []);

    return (
        <LeaderBoardSectionSection
            userId={session?.user?.id}
            deskmates={deskmates}
            today={today}
        />
    )
}

/* View */
export function LeaderBoardSectionSection({ userId, deskmates, today }) {
    return (
        <Box component='section' id='leaderboard-section' sx={{  height: '100%', width: '100%' }}>
            <Box sx={{ display: 'flex', height: '100%', width: '100%', m: 2, mt: 4, justifyContent: 'center' }}>
                {
                    deskmates?.length > 0 ? (
                        <List 
                            sx={{ 
                                width: '35%',
                                overflow: 'auto',
                                maxHeight: '92%'
                            }}>
                            {
                                deskmates.sort((a, b) => b.streak - a.streak ).map(dm => {
                                    return (
                                        <Box>
                                            <ListItem
                                                sx={{
                                                    bgcolor: dm.user_id == userId ? 'background.paper' : 'background.default'
                                                }}
                                            >
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        width: '100%',
                                                    }}>
                                                    <Box sx={{ display: 'flex', width: '50%' }}>
                                                        {
                                                            dm.last_streak ? (
                                                                <Badge
                                                                    badgeContent={
                                                                        calculateDaysDiff(dm.last_streak, today) < 2 ? <SentimentSatisfiedAltRounded/>
                                                                        : calculateDaysDiff(dm.last_streak, today) < 5 ? <SentimentSatisfied/>
                                                                        : <SentimentVeryDissatisfied/>
                                                                    } 
                                                                    color={
                                                                        calculateDaysDiff(dm.last_streak, today) < 2 ? 'success' 
                                                                        : calculateDaysDiff(dm.last_streak, today) < 5 ? 'warning' 
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
                                                            ) : (
                                                                <Box>
                                                                    <Desk
                                                                        color='primary'
                                                                        sx={{ 
                                                                            height: 65,
                                                                            width: 65,
                                                                        }}
                                                                    />
                                                                </Box>
                                                            )
                                                        }
                                                        <List>
                                                            <Typography variant='h5' color='primary' >
                                                                {dm.name}
                                                            </Typography>
                                                            <Typography variant='body2' color='secondary' >
                                                                {"Streak: " + dm.streak + ' day(s)'}
                                                                {
                                                                    dm.last_streak != null && new Date(dm.last_streak).getDate() == new Date(today).getDate() ?
                                                                    <Whatshot sx={{ height: 20 }} /> : null
                                                                }
                                                                {' -> '}
                                                                {dateToString(dm.last_streak)}
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
                }
            </Box>
        </Box>
    )
}
