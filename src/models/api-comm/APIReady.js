import { SERVERBASEURL, asyncFetch } from './APIComm'

export async function asyncGetAPIReady() {
    return asyncFetch(SERVERBASEURL, 'GET')
}