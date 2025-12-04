import { APIUSERPERMISSIONURL, asyncFetch } from './APIComm'

//#region User-Permissions

// 200 returns: { success: true, data: relations }
// 500 returns: { success: false, message: "Failed to fetch user-permission relations" }
export async function asyncGetUserPermissions() {
  return asyncFetch(APIUSERPERMISSIONURL, 'GET');
}

// 200 returns: { success: true, data: rel }
// 404 returns: { success: false, message: "UserPermission not found" }
// 500 returns: { success: false, message: "Failed to fetch user-permission relation" }
export async function asyncGetUserPermission(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERPERMISSIONURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: rel }
// 400 returns: { success: false, message: "userId and permissionId required" }
// 404 returns: { success: false, message: "User or Permission not found" }
// 409 returns: { success: false, message: "Relation already exists" }
// 500 returns: { success: false, message: "Failed to create relation" }
export async function asyncPostUserPermission({ userId, permissionId }) {
  if (!userId || !permissionId) {
    console.log(`userId (${userId}) or permissionId (${permissionId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERPERMISSIONURL}`, 'POST', { userId, permissionId });
}

// 200 returns: { success: true, data: updated }
// 404 returns: { success: false, message: "UserPermission not found" }
// 404 returns: { success: false, message: "User not found" }
// 404 returns: { success: false, message: "Permission not found" }
// 500 returns: { success: false, message: "Failed to update relation" }
export async function asyncPutUserPermission({id, userId, permissionId}) {
  if (!id) {
    console.log(`id (${id}), userId (${userId}) or permissionId (${permissionId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERPERMISSIONURL}/${id}`, 'PUT', {id, userId, permissionId});
}

// 200 returns: { success: true, message: "Relation deleted" }
// 404 returns: { success: false, message: "UserPermission not found" }
// 500 returns: { success: false, message: "Failed to delete relation" }
export async function asyncDeleteUserPermission(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERPERMISSIONURL}/${id}`, 'DELETE');
}

//#endregion