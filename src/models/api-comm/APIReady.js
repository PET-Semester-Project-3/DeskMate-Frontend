import { SERVERBASEURL, asyncFetch } from './APIComm'

async function asyncGetAPIReady() {
    const result = asyncFetch(SERVERBASEURL, 'GET')
    return result.message == 'DeskMate API - Ready';
}