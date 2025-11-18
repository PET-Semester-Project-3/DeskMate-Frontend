import { APIUSERSURL, asyncFetch } from './APIComm'

//#region Users

// 200 returns: { success: true, data: users }
// 500 returns: { success: false, message: "Failed to fetch users" }
export async function asyncGetUsers() {
  return asyncFetch(APIUSERSURL, 'GET');
}

// 200 returns: { success: true, data: safeUser }
// 404 returns: { success: false, message: "User not found" }
// 500 returns: { success: false, message: "Failed to fetch user" }
export async function asyncGetUser(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: user }
// 400 returns: { success: false, message: "Email and password required" }
// 409 returns: { success: false, message: "User exists" }
// 500 returns: { success: false, message: "Failed to create user" }
export async function asyncPostUser(email, password) {
  if (!email || !password) {
    console.log(`email (${email}) or password (${password}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}`, 'POST', { email, password });
}

// 200 returns: { success: true, data: user }
// 409 returns: { success: false, message: "Email already in use" }
// 500 returns: { success: false, message: "Failed to update user" }
export async function asyncPutUser(id, email, password) {
  if (!id || !email || !password) {
    console.log(`id (${id}), email (${email}), or password (${password}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}`, 'PUT', { email, password });
}

// 200 returns: { success: true, message: "User deleted successfully" }
// 404 returns: { success: false, message: "User not found" }
// 500 returns: { success: false, message: "Failed to delete user" }
export async function asyncDeleteUser(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}`, 'DELETE');
}

//#endregion

//#region UserToDesks

// 200 returns: { success: true, data: desks }
// 500 returns: { success: false, message: "Failed to fetch user desks" }
export async function asyncGetUserDesks(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  const relations = await asyncFetch(`${APIUSERSURL}/${id}/desks`, 'GET');
  return relations.map(r => r.desk);
}

// 201 returns: { success: true, data: ud }
// 400 returns: { success: false, message: "deskId required" }
// 404 returns: { success: false, message: "User or Desk not found" }
// 409 returns: { success: false, message: "deskId required" }
// 500 returns: { success: false, message: "Failed to add user to desk" }
export async function asyncPostUserDesk(id, deskId) {
  if (!id || !deskId) {
    console.log(`id (${id}) or deskId (${deskId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}/desks`, 'POST', { deskId });
}

// 200 returns: { success: true, message: "User removed from desk" }
// 404 returns: { success: false, message: "Relation not found" }
// 500 returns: { success: false, message: "Failed to remove user from desk" }
export async function asyncDeleteUserDesk(id, deskId) {
  if (!id || !deskId) {
    console.log(`id (${id}) or deskId (${deskId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}/desks/${deskId}`, 'DELETE');
}

//#endregion

//#region UserToPermissions

// 200 returns: { success: true, data: perms }
// 500 returns: { success: false, message: "Failed to fetch user permissions" }
export async function asyncGetUserPermissions(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  const relations = await asyncFetch(`${APIUSERSURL}/${id}/permissions`, 'GET');
  return relations.map(r => r.permission);
}

// 201 returns: { success: true, data: up }
// 400 returns: { success: false, message: "permissionId required" }
// 404 returns: { success: false, message: "User or Permission not found" }
// 409 returns: { success: false, message: "Permission already assigned" }
// 500 returns: { success: false, message: "Failed to add permission to user" }
export async function asyncPostUserPermissions(id, permissionId) {
  if (!id || !permissionId) {
    console.log(`id (${id}) or permissionId (${permissionId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}/permissions`, 'POST', { permissionId });
}

// 200 returns: { success: true, message: "Permission removed from user" }
// 404 returns: { success: false, message: "Relation not found" }
// 500 returns: { success: false, message: "Failed to remove permission from user" }
export async function asyncDeleteUserPermissions(id, permissionId) {
  if (!id || !permissionId) {
    console.log(`id (${id}) or permissionId (${permissionId}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}/permissions/${permissionId}`, 'DELETE');
}

//#endregion

//#region User Authentication

// 200 returns: { success: true, message: "Password changed" }
// 400 returns: { success: false, message: "current and new passwords required" }
// 401 returns: { success: false, message: "Current password incorrect" }
// 500 returns: { success: false, message: "Failed to change password" }
export async function asyncPostNewPassword(id, currentPassword, newPassword) {
  if (!id || !currentPassword || !newPassword) {
    console.log(`id (${id}), currentPassword (${currentPassword}) or newPassword (${newPassword}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}/password`, 'POST', { currentPassword, newPassword });
}

// 200 returns: { success: true, data: safeUser }
// 400 returns: { success: false, message: "Email and password required" }
// 401 returns: { success: false, message: "Invalid email or password" }
// 401 returns: { success: false, message: "Invalid email or password" }
// 500 returns: { success: false, message: "Failed to login" }
export async function asyncPostLoginUser(email, password) {
  if (!email || !password) {
    console.log(`email (${email}) or password (${password}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/login`, 'POST', { email, password });
}

//#endregion