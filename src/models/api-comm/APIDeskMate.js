import { APIDESKMATEURL, asyncFetch } from './APIComm'

//#region DeskMates

// 200 returns: { success: true, data: deskmates }
// 500 returns: { success: false, message: "Failed to fetch deskmate" }
export async function asyncGetDeskMates() {
  return asyncFetch(APIDESKMATEURL, 'GET');
}

// 200 returns: { success: true, data: deskmate }
// 404 returns: { success: false, message: "deskmate not found" }
// 500 returns: { success: false, message: "Failed to fetch deskmate" }
export async function asyncGetDeskMate(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: deskmate }
// 400 returns: { success: false, message: "userId and name required" }
// 404 returns: { success: false, message: "User not found" }
// 409 returns: { success: false, message: "DeskMate already exists" }
// 500 returns: { success: false, message: "Failed to create deskmate" }
export async function asyncPostDeskMate({ user_id, name }) {
  if (!user_id || !name) {
    console.log(`user_id (${user_id}) or name (${name}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}`, 'POST', { user_id, name });
}

// 200 returns: { success: true, data: updated }
// 404 returns: { success: false, message: "DeskMate not found" }
// 404 returns: { success: false, message: "User not found" }
// 500 returns: { success: false, message: "Failed to update deskmate" }
export async function asyncPutDeskMate({ id, user_id, name, streak, achievements }) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}/${id}`, 'PUT', { user_id, name, streak, achievements });
}

// 200 returns: { success: true, message: "DeskMate deleted" }
// 404 returns: { success: false, message: "DeskMate not found" }
// 500 returns: { success: false, message: "Failed to delete deskmate" }
export async function asyncDeleteDeskMate(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}/${id}`, 'DELETE');
}

//#endregion

//#region Streak

// 200 returns: { success: true, data: updated }
// 404 returns: { success: false, message: "DeskMate not found" }
// 500 returns: { success: false, message: "Failed to update deskmate streak" }
export async function asyncPutDeskMateStreak(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}/${id}/streak`, 'PUT');
}

//#endregion

//#region Get by User

// 200 returns: { success: true, data: deskmate }
// 404 returns: { success: false, message: "deskmate not found" }
// 500 returns: { success: false, message: "Failed to fetch deskmate" }
export async function asyncGetDeskMateByUser(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKMATEURL}/user/${id}`, 'GET');
}

//#endregion