import { APIDESKSURL, asyncFetch } from './APIComm'

// 200 returns: { success: true, data: desks }
// 500 returns: { success: false, message: "Failed to fetch desks" }
export async function asyncGetDesks() {
  return asyncFetch(APIDESKSURL, 'GET');
}

// 200 returns: { success: true, data: desk }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to fetch desk" }
export async function asyncGetDesk(id) {
  return asyncFetch(`${APIDESKSURL}/${id}`, 'GET');
}

// TODO: ERROR this should be able to be created without a ControllerId
// 201 returns: { success: true, data: desk }
// 400 returns: { success: false, message: "id, controllerId, name and manufacturer required" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to create desk" }
export async function asyncPostDesk(controllerId, name, manufacturer, is_locked, last_data) {
  if (controllerId || name || manufacturer || last_data) {
    console.log(`controllerId (${controllerId}), name (${name}), manufacturer (${manufacturer}), is_locked (${is_locked}) or last_data (${last_data}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}`, 'POST', { controllerId, name, manufacturer, is_locked, last_data });
}

// 200 returns: { success: true, data: desk }
// 404 returns: { success: false, message: "Desk not found" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to update desk" }
export async function asyncPutDesk(id, controllerId, name, manufacturer, is_locked, last_data) {
  if (id || controllerId || name || manufacturer || last_data) {
    console.log(`id (${id}), controllerId (${controllerId}), name (${name}), manufacturer (${manufacturer}), is_locked (${is_locked}) or last_data (${last_data}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}`, 'PUT', { controllerId, name, manufacturer, is_locked, last_data });
}

// 200 returns: { success: true, message: "Desk deleted successfully" }
// 404 returns: { success: false, message: "Desk not found" }
// 500 returns: { success: false, message: "Failed to delete desk" }
export async function asyncDeleteDesk(id) {
  if (id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIDESKSURL}/${id}`, 'DELETE');
}