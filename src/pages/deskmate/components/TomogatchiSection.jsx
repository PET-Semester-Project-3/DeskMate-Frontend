import * as React from 'react';
import { Box, Typography, Button, Card, CircularProgress, Badge, TextField
} from '@mui/material';
import {
    Gauge
} from '@mui/x-charts'
import GenericPopout from '../../../components/GenericPopout';
import { asyncGetDeskMateByUser, asyncPostDeskMate, asyncPutDeskMateStreak, asyncDeleteDeskMate } from '../../../models/api-comm/APIDeskMate'
import { calculateDaysDiff, dateToString } from '../../../models/DateTimeCal'
import { Whatshot, SentimentSatisfiedAltRounded, SentimentSatisfied, SentimentVeryDissatisfied } from '@mui/icons-material'
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function TomogatchiSectionController({ session }) {

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const [deskmate, setDeskmate] = React.useState(null);

    const [justDied, setJustDied] = React.useState(false);
    
    const today = Date.now();

    const [timerTime, setTimerTime] = React.useState(0)
    const [isTimerRunning, setIsTimerRunning] = React.useState(false)

    const [popupOpen, setPopupOpen] = React.useState(false)
    const [name, setName] = React.useState('')
    const [nameErrorText, setNameErrorText] = React.useState('')

    const onCreateNewDeskmateClick = async () => {
        setWaitingForResponse(true);
        const deskmate = await asyncPostDeskMate({ user_id: session?.user?.id, name });
        if (deskmate.id) {
            setDeskmate(deskmate);
            setPopupOpen(false);
        }
        else
            setNameErrorText('Failed to create Deskmate')
        setWaitingForResponse(false);
    }

    const extendStreak = async () => {
        setWaitingForResponse(true);
        const updatedDeskmate = await asyncPutDeskMateStreak(deskmate.id);
        if (updatedDeskmate.id) {
            setDeskmate(updatedDeskmate);
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
                    console.log(prevTime)
                    if (prevTime >= 15*60) {
                        clearInterval(timer);
                        setTimerTime(0);
                        setIsTimerRunning(false);
                        if (Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) >= 1)
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

    const isDeskmateAlive = async (deskmate) => {
        if (deskmate.last_streak != null && Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) >= 5 )
        {
            setJustDied(true);
            asyncDeleteDeskMate(deskmate.id);
            setDeskmate(null);
        }
    }

    const getDeskmate = async (id) => {
        setWaitingForResponse(true);
        const deskmate = await asyncGetDeskMateByUser(id);
        if (deskmate.id){
            setDeskmate(deskmate);
            await isDeskmateAlive(deskmate);
        }
            
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
            justDied={justDied}
        />
    )
}

/* View */
export function TomogatchiSection({ 
    waitingForResponse, deskmate, today, timerTime, 
    isTimerRunning, setIsTimerRunning, popupOpen, setPopupOpen,
    name, setName, nameErrorText, onCreateNewDeskmateClick, justDied
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
                        {
                            justDied ? (
                                <Typography sx={{ maxWidth: 550, textAlign: 'center' }}>
                                    After days of not standing up your Deskmate has moved on. However you can create a new one and strive to make it to the top of the ladder and compete with other colleagues and their Deskmates once again. 
                                </Typography>
                            ) : (
                                <Typography sx={{ maxWidth: 550, textAlign: 'center' }}>
                                    No Deskmate found. Create a new Deskmate to care for (while taking care of your own health) and compete with other colleagues and their Deskmates. 
                                </Typography>
                            )
                        }
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
                                minHeight: 625, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: 2,
                                border: '2px solid',
                                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                    transform: 'scale(1.02, 1.02)',
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
                                <Badge
                                    badgeContent={
                                        !deskmate.last_streak ? <SentimentSatisfiedAltRounded sx={{ width: 35, height: 35 }}/>
                                        : calculateDaysDiff(deskmate.last_streak, today) <= 2 ? <SentimentSatisfiedAltRounded sx={{ width: 35, height: 35 }}/>
                                        : calculateDaysDiff(deskmate.last_streak, today) <= 3 ? <SentimentSatisfied sx={{ width: 35, height: 35 }}/>
                                        : <SentimentVeryDissatisfied sx={{ width: 35, height: 35 }}/>
                                    } 
                                    color={
                                        !deskmate.last_streak ? 'success' 
                                        : calculateDaysDiff(deskmate.last_streak, today) <= 2 ? 'success' 
                                        : calculateDaysDiff(deskmate.last_streak, today) <= 3 ? 'warning' 
                                        : 'error'
                                    }
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            right: 40,
                                            top: 65,
                                            height: 40,
                                            width: 40,
                                            borderRadius: 15
                                        },
                                    }}
                                    >
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
                                </Badge>
                            </Box>
                        </Card>
                        <Card
                            sx={{ 
                                p: 4, 
                                height: '60%',
                                minHeight: 625, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'top',
                                alignItems: 'center', 
                                gap: 2,
                                border: '2px solid',
                                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                    transform: 'scale(1.02, 1.02)',
                                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                <Typography variant='h4'>
                                    { deskmate.last_streak ? Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) <= 1 ? 'I am happy, let\'s keep it up!'
                                    : Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) <= 2 ? 'We are okay, but we should stand up again soon.'
                                    : 'I am sad... please stand up with me!' : 'Let\'s start our first stand up together!'}
                                </Typography>
                                { /* Todays streak status */ }
                                <Typography variant='h6'>
                                    { Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) <= 1 ? 'You have already stood up today. Great job!' : 'You have not stood up today yet. Let\'s do it together!' }
                                    {
                                        deskmate.last_streak != null && new Date(deskmate.last_streak).getDate() == new Date(today).getDate() ?
                                        <Whatshot sx={{ height: 20 }} /> : null
                                    }
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
                                    text={(value) =>`${value.value >= 15*60 ? Number.parseInt(calculateDaysDiff(new Date(deskmate.last_streak), new Date(today))) >= 1 ? '+1 Streak' : 'Finished' : ((value.value / 60) > 10 ? Number.parseInt((value.value / 60)) : '0' + Number.parseInt((value.value / 60))) + ':' + ((value.value % 60) > 10 ? (value.value % 60) : '0' + (value.value % 60)) + '0'.slice(String(value.value % 60).length) + ' / 15:00'}`}
                                >
                                </Gauge>
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
            <GenericPopout header={!deskmate ? 'Name Deskmate' : 'Change ' + deskmate.name} onSaveClick={onCreateNewDeskmateClick} isOpen={popupOpen} setIsOpen={setPopupOpen}>
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
            </GenericPopout>
        </Box>
    )
}
