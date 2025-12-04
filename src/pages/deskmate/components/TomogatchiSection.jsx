import * as React from 'react';
import { Box, Typography, Button, Card, LinearProgress, CircularProgress,
    Chip, Divider, Badge, IconButton, List, Backdrop, TextField
} from '@mui/material';
import {
    Gauge
} from '@mui/x-charts'
import ChangeValuePopout from '../../profile/components/ChangeValuePopout';
import { asyncGetDeskMateByUser, asyncPostDeskMate, asyncPutDeskMateStreak } from '../../../models/api-comm/APIDeskMate'
import { calculateDaysDiff, dateToString } from '../../../models/DateTimeCal'
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function TomogatchiSectionController({ session }) {

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const [deskmate, setDeskmate] = React.useState(null);
    
    const today = Date.now();

    const [timerTime, setTimerTime] = React.useState(0)
    const [isTimerRunning, setIsTimerRunning] = React.useState(false)

    const [popupOpen, setPopupOpen] = React.useState(false)
    const [name, setName] = React.useState('')
    const [nameErrorText, setNameErrorText] = React.useState('')

    const onCreateNewDeskmateClick = async () => {
        setWaitingForResponse(true);
        const deskmate = await asyncPostDeskMate({ user_id: session?.user?.id, name });
        if (deskmate) {
            setDeskmate(deskmate);
            setPopupOpen(false);
        }
        else
            setNameErrorText('Failed to create Deskmate')
        setWaitingForResponse(false);
    }

    const extendStreak = async () => {
        setWaitingForResponse(true);
        const deskmate = asyncPutDeskMateStreak(deskmate.id);
        if (deskmate) {
            setDeskmate(deskmate);
            setPopupOpen(false);
        }
        else
            console.log('Failed to extend streak');
        setWaitingForResponse(false);
    }

    React.useEffect(() => {
        let timer = null;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setTimerTime((prevTime) => {
                    if (prevTime >= 15*60) {
                        clearInterval(timer);
                        setIsTimerRunning(false);
                        extendStreak();
                        return prevTime;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else if (!isTimerRunning && timer !== null) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isTimerRunning]);

    const getDeskmate = async (id) => {
        setWaitingForResponse(true);
        const deskmate = await asyncGetDeskMateByUser(id);
        setDeskmate(deskmate);
        setWaitingForResponse(false);
    }
    React.useEffect(() => {
        getDeskmate(session?.user?.id);
    }, [session?.user?.id]);

    return (
        <TomogatchiSection
            waitingForResponse={waitingForResponse}
            deskmate={deskmate}
            today={today}
            timerTime={timerTime}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            name={name}
            setName={setName}
            nameErrorText={nameErrorText}
            onCreateNewDeskmateClick={onCreateNewDeskmateClick}
        />
    )
}

/* View */
export function TomogatchiSection({ 
    waitingForResponse, deskmate, today, timerTime, 
    isTimerRunning, setIsTimerRunning, popupOpen, setPopupOpen,
    name, setName, nameErrorText, onCreateNewDeskmateClick
}) {
    return (
        <Box component='section' id='tomogatchi-section' sx={{ height: '100%', width: '100%' }}>
            {
                waitingForResponse ? (
                    <CircularProgress/>
                )
                : !deskmate ? (
                    /* Create a new deskmate */
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                        <Typography sx={{ maxWidth: 550, textAlign: 'center' }}>
                            No Deskmate found. Create a new Deskmate to care for (while taking care of your own health) and compete with other colleagues and their Deskmates. 
                        </Typography>
                        <Button
                            variant='outlined'
                            onClick={() => setPopupOpen(true)}
                            sx={{ 
                                height: 65,
                                minWidth: 150,
                             }}
                        >
                            <Typography>
                                Create a new Deskmate
                            </Typography>
                        </Button>
                    </Box>
                 ) : (
                    /* Show deskmate */
                    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                        <Card
                            sx={{ 
                                p: 2, 
                                height: '60%',
                                minHeight: 550, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: 2,
                                border: '2px solid',
                                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                                },
                            }}
                        >
                            <Box 
                                sx={{ 
                                    p: 4,
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    height: '100%', 
                                    width: '100%', 
                                    justifyContent: 'top', 
                                    alignItems: 'center', 
                                    gap: 1,
                                }}>
                                <Typography variant='h4'>
                                    {deskmate.name}
                                </Typography>
                                <Typography>
                                    {`I've been with you since ${dateToString(new Date(deskmate.created_at))}`}
                                </Typography>
                                <Typography variant='body2' color='secondary' >
                                    {`Current Streak: ${deskmate.streak} day${deskmate.streak !== 1 ? 's' : ''}`}
                                </Typography>
                                <Typography variant='body2' color='secondary' >
                                    {`Days since last streak: ${deskmate.last_streak ? Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) : 'N/A'}`}
                                </Typography>
                                <Typography variant='body2' color='secondary' >
                                    {`Last Streak: ${deskmate.last_streak ? dateToString(new Date(deskmate.last_streak)) : 'N/A'}`}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{ mt: 2 }}
                                >
                                    Want to change my name?
                                </Typography>
                                <Button
                                    variant='outlined'
                                    onClick={() => setPopupOpen(true)}
                                    sx={{ 
                                        height: 40,
                                        minWidth: 100,
                                        }}
                                >
                                    <Typography>
                                        Change Name
                                    </Typography>
                                </Button>
                                <Box
                                    component='img'
                                    id='tomogatchi-desk-image'
                                    src={deskImage}
                                    alt='Deskmate sitting at a desk'
                                    sx={{
                                        height: 250,
                                        width: 'auto',
                                        mt: 2,
                                    }}
                                />
                            </Box>
                        </Card>
                        <Card
                            sx={{ 
                                p: 4, 
                                height: '60%',
                                minHeight: 550,
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'top',
                                alignItems: 'center', 
                                gap: 2,
                                border: '2px solid',
                                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <Typography variant='h4'>
                                    { deskmate.last_streak ? Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) < 2 ? 'I am happy, let\'s keep it up!'
                                    : Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) < 5 ? 'I am okay, but we should stand up again soon.'
                                    : 'I am sad... please stand up with me!' : 'Let\'s start our first stand up together!'}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ mb: 2 }}
                                >
                                    {`Take care of me and you by standing up at work for 15 minutes, every day to keep my streak going!`}
                                </Typography>
                                <Typography>
                                    {`Current Streak: ${deskmate.streak} day${deskmate.streak !== 1 ? 's' : ''}`}
                                </Typography>
                                <Gauge
                                    component='div'
                                    id='tomogatchi-timer-gauge'
                                    height={250}
                                    width={250}
                                    value={timerTime}
                                    valueMax={15*60}
                                    min={0}
                                    max={15}
                                    text={(value) => `${value.value >= 15*60 ? 'Good Job!' : ((value.value / 60) > 10 ? Number.parseInt((value.value / 60)) : '0' + Number.parseInt((value.value / 60))) + ':' + ((value.value % 60) > 10 ? (value.value % 60) : '0' + (value.value % 60)) + '0'.slice(String(value.value % 60).length) + ' / 15:00'}`}
                                />
                                <Button
                                    variant='contained'
                                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                                    sx={{ 
                                        height: 50,
                                        minWidth: 150,
                                    }}
                                >
                                    <Typography>
                                        {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                                    </Typography>
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                    
                )
            }
            <ChangeValuePopout header={!deskmate ? 'Name Deskmate' : 'Change ' + deskmate.name} onSaveClick={onCreateNewDeskmateClick} isOpen={popupOpen} setIsOpen={setPopupOpen}>
                <TextField
                    component='div'
                    id='deskmate-info-name-textfield'
                    error={nameErrorText == '' ? false : true}
                    label='Name'
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    helperText={nameErrorText}
                    variant='outlined'
                    sx={{ width: '100%', m: 1 }} 
                />
            </ChangeValuePopout>
        </Box>
    )
}
