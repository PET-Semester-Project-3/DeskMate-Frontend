import * as React from 'react';
import { Box, Typography, Button, Card, LinearProgress, CircularProgress,
    Chip, Divider, Badge, IconButton, 
 } from '@mui/material';
import {
    Gauge, SparkLineChart 
 } from '@mui/x-charts'
import { asyncGetDeskMateByUser } from '../../../models/api-comm/APIDeskMate'

/*
Tomogatchi page for user to create and interact with their DeskMate
*/

/* Controller */
export default function TomogatchiSectionController({ session }) {

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    
    const [deskmate, setDeskmate] = React.useState(null);
    
    React.useEffect(() => {
        const getDeskmate = async (id) => {
            setWaitingForResponse(true);
            const deskmate = await asyncGetDeskMateByUser(id);
            setDeskmate(deskmate);
            setWaitingForResponse(false);
        }
        getDeskmate(session?.user?.id);
    }, [session?.user?.id]);

    return (
        <TomogatchiSection
            deskmate={deskmate}
            waitingForResponse={waitingForResponse}
        />
    )
}

/* View */
export function TomogatchiSection({ deskmate, waitingForResponse }) {
    return (
        <Box component='section' id='tomogatchi-section' sx={{ height: '100%', width: '100%' }}>
            {
                !deskmate ? (
                    /* Create a new deskmate */
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                        <Typography sx={{ maxWidth: 550, textAlign: 'center' }}>
                            No Deskmate found. Create a new Deskmate to care for (while taking care of your own health) and compete with other colleagues and their Deskmates. 
                        </Typography>
                        <Button
                            variant='outlined'
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
        </Box>
    )
}
