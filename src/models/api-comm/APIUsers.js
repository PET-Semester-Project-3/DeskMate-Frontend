import { APIUSERSURL, asyncFetch } from './APIComm'

// 200 returns: { success: true, data: users }
// 500 returns: { success: false, message: "Failed to fetch users" }
export async function asyncGetUsers() {
  return asyncFetch(APIUSERSURL, 'GET');
}

// 200 returns: { success: true, data: safeUser }
// 404 returns: { success: false, message: "User not found" }
// 500 returns: { success: false, message: "Failed to fetch user" }
export async function asyncGetUser(id) {
  return asyncFetch(`${APIUSERSURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: user }
// 400 returns: { success: false, message: "Email and password required" }
// 409 returns: { success: false, message: "User exists" }
// 500 returns: { success: false, message: "Failed to create user" }
export async function asyncPostUser(email, password) {
  if (email || password) {
    console.log(`email (${email}) or password (${password}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}`, 'POST', { email, password });
}

// 200 returns: { success: true, data: user }
// 409 returns: { success: false, message: "Email already in use" }
// 500 returns: { success: false, message: "Failed to update user" }
export async function asyncPutUser(id, email, password) {
  if (id || email || password) {
    console.log(`id (${id}), email (${email}), or password (${password}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}`, 'PUT', { email, password });
}

// 200 returns: { success: true, message: "User deleted successfully" }
// 404 returns: { success: false, message: "User not found" }
// 500 returns: { success: false, message: "Failed to delete user" }
export async function asyncDeleteUser(id) {
  if (id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APIUSERSURL}/${id}`, 'DELETE');
}