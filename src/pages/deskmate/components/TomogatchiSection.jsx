import * as React from 'react';
import { Box, Typography, Button, Card, LinearProgress, CircularProgress,
    Chip, Divider, Badge, IconButton, List, Backdrop, TextField
} from '@mui/material';
import {
    Gauge
} from '@mui/x-charts'
import ChangeValuePopout from '../../profile/components/ChangeValuePopout';
import { asyncGetDeskMateByUser, asyncPostDeskMate } from '../../../models/api-comm/APIDeskMate'
import { calculateDaysDiff, dateToString } from '../../../models/DateTimeCal'

/*

Tomogatchi page for user to see information on their Deskmate and start a timer that when finished extends their streak.
They can also change the name of their Deskmate.

if there is no deskmate found then use "Create a new Deskmate" to open a backdrop create new Deskmate popup where they can give it a name.

Deskmate schematic:
  id String @id @default(uuid())
  user_id String @unique
  name String
  streak Int @default(0)
  last_streak DateTime?
  created_at DateTime? @default(now())
  updated_at DateTime? @updatedAt
  achievements String[]
  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

User schematic:
  model User {
  id            String     @id @default(uuid())
  email         String     @unique @db.VarChar(50)
  password_hash String
  main_desk_id  String?    @unique
  created_at    DateTime   @default(now())
  updated_at    DateTime?  @updatedAt
  userDesks     UserDesk[]
  scheduledTasks ScheduledTask[]
  userPermissions UserPermission[]
  deskMate DeskMate?
}

There is a timer on the page (using the gauge) for 15 min, which can be started an paused by a button, the gauge is full when 15 min has passed.

*/

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
            setTimerTime={setTimerTime}
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
    waitingForResponse, deskmate, today, timerTime, setTimerTime, 
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
                    null
                 )
            }
            <ChangeValuePopout header='Name Deskmate' onSaveClick={onCreateNewDeskmateClick} isOpen={popupOpen} setIsOpen={setPopupOpen}>
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
