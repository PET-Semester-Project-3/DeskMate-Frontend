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
        <Box component='section' id='tomogatchi-section' sx={{ height: '100%', bgcolor: 'red' }}>
            {
                !deskmate ? (
                    /* Create a new deskmate */
                    <Box sx={{ height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                        <Button>
                            {"Create"}
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
