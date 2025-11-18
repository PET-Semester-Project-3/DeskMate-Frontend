import { APIUSERPERMISSIONURL, asyncFetch } from './APIComm'

//#region Permissions

// 200 returns: { success: true, data: relations }
// 500 returns: { success: false, message: "Failed to fetch user-permission relations" }
export async function asyncGetUserPermissions() {
  return asyncFetch(APIUSERPERMISSIONURL, 'GET');
}

//#endregion