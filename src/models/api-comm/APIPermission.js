import { APIPERMISSIONSURL, asyncFetch } from './APIComm'

//#region Permissions

// 200 returns: { success: true, data: permissions }
// 500 returns: { success: false, message: "Failed to fetch permissions" }
export async function asyncGetPermissions() {
  return asyncFetch(APIPERMISSIONSURL, 'GET');
}

// 200 returns: { success: true, data: permission }
// 404 returns: { success: false, message: "Permission not found" }
// 500 returns: { success: false, message: "Failed to fetch permission" }
export async function asyncGetPermission(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return await asyncFetch(`${APIPERMISSIONSURL}/${id}`, 'GET');
}

// TODO: ERROR this should be able to be created without a ControllerId
// 201 returns: { success: true, data: permission }
// 400 returns: { success: false, message: "label and route required" }
// 500 returns: { success: false, message: "Failed to create permission" }
export async function asyncPostPermission(label, route) {
  if (!label || !route) {
    console.log(`label (${label}) or route (${route}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIPERMISSIONSURL}`, 'POST', { label, route });
}

// 200 returns: { success: true, data: permission }
// 404 returns: { success: false, message: "Permission not found" }
// 500 returns: { success: false, message: "Failed to update permission" }
export async function asyncPutPermission(id, label, route) {
  if (!id || !label || !route) {
    console.log(`id (${id}), label (${label}) or route (${route}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIPERMISSIONSURL}/${id}`, 'PUT', { label, route });
}

// 200 returns: { success: true, message: "Permission deleted" }
// 404 returns: { success: false, message: "Permission not found" }
// 500 returns: { success: false, message: "Failed to delete permission" }
export async function asyncDeletePermission(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIPERMISSIONSURL}/${id}`, 'DELETE');
}

//#endregion