import * as React from 'react';
import { Box, Button, Typography, Tabs } from '@mui/material';
import TomogatchiSection from './components/TomogatchiSection';
import LeaderBoardSection from './components/LeaderBoardSection';
import useSession from '../../models/SessionContext';

/* Controller */
export default function DeskMatePageController() {

    const [pageNum, setPageNum] = React.useState(0);
    const { session } = useSession();

    return (
        <DeskMatePage
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
        />
    )
}

/* View */
export function DeskMatePage({ session, pageNum, setPageNum }) {
    return (
        <Box component='main' id='deskmate-page' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Tabs value={pageNum} aria-label="deskMate page tabs" indicatorColor='primary' >
                <Button component='button' id='tomogatchi-tab-button' onClick={() => setPageNum(0)} >
                    <Typography variant='h6' color='white' >My Desk Mate</Typography>
                </Button>
                <Button component='button' id='leaderboard-tab-button'onClick={() => setPageNum(1)} >
                    <Typography variant='h6'  color='white' >Leaderboards</Typography>
                </Button>
            </Tabs>
            { pageNum === 0 ? 
                <TomogatchiSection session={session} />
                :
                <LeaderBoardSection session={session} />
            }
        </Box>
    )
}
