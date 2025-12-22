import { APIDESKSURL, asyncFetch } from './APIComm'

//#region Desks

// 200 returns: { success: true, data: desks }
// 500 returns: { success: false, message: "Failed to fetch desks" }
export async function asyncGetDesks() {
  return asyncFetch(APIDESKSURL, 'GET');
}

// 200 returns: { success: true, data: desk }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to fetch desk" }
export async function asyncGetDesk(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: desk }
// 400 returns: { success: false, message: "id and name required" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to create desk" }
export async function asyncPostDesk({ id, controllerId, name, is_locked, last_data }) {
  if (!id || !name) {
    console.log(`id (${id}) or name (${name}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}`, 'POST', { id, controllerId, name, is_locked, last_data });
}

// 200 returns: { success: true, data: desk }
// 404 returns: { success: false, message: "Desk not found" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to update desk" }
export async function asyncPutDesk(id, updates) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}`, 'PUT', updates);
}

// 200 returns: { success: true, message: "Desk deleted successfully" }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to delete desk" }
export async function asyncDeleteDesk(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}`, 'DELETE');
}

// 200 returns: { success: true, data: desk }
// 400 returns: { success: false, message: "Height must be a number" }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to set desk height" }
export async function asyncSetDeskHeight(id, height) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}/height`, 'PUT', { height });
}

//#endregion