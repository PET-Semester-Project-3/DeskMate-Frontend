import { APIUSERDESKURL, asyncFetch } from './APIComm'

//#region Permissions

// 200 returns: { success: true, data: relations }
// 500 returns: { success: false, message: "Failed to fetch user-desk relations" }
export async function asyncGetUserDesks() {
  return asyncFetch(APIUSERDESKURL, 'GET');
}

//#endregion