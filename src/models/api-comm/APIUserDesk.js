import { APIUSERDESKURL, asyncFetch } from './APIComm'

//#region User-Desks

// 200 returns: { success: true, data: relations }
// 500 returns: { success: false, message: "Failed to fetch user-desk relations" }
export async function asyncGetUserDesks() {
  return asyncFetch(APIUSERDESKURL, 'GET');
}

// 200 returns: { success: true, data: rel }
// 404 returns: { success: false, message: "UserDesk not found" }
// 500 returns: { success: false, message: "Failed to fetch user-desk relation" }
export async function asyncGetUserDesk(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERDESKURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: rel }
// 400 returns: { success: false, message: "userId and deskId required" }
// 404 returns: { success: false, message: "User or Desk not found" }
// 409 returns: { success: false, message: "Relation already exists" }
// 500 returns: { success: false, message: "Failed to create relation" }
export async function asyncPostUserDesk({ userId, deskId }) {
  if (!userId || !deskId) {
    console.log(`userId (${userId}) or deskId (${deskId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERDESKURL}`, 'POST', { userId, deskId });
}

// 200 returns: { success: true, data: updated }
// 404 returns: { success: false, message: "UserDesk not found" }
// 404 returns: { success: false, message: "User not found" }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to update relation" }
export async function asyncPutUserDesk({id, userId, deskId}) {
  if (!id) {
    console.log(`id (${id}), userId (${userId}) or deskId (${deskId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERDESKURL}/${id}`, 'PUT', {id, userId, deskId});
}

// 200 returns: { success: true, message: "Relation deleted" }
// 404 returns: { success: false, message: "UserDesk not found" }
// 500 returns: { success: false, message: "Failed to delete relation" }
export async function asyncDeleteUserDesk(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERDESKURL}/${id}`, 'DELETE');
}

//#endregion