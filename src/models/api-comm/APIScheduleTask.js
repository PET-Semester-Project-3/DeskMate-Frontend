import { APISCHEDULEDTASKSURL, asyncFetch } from './APIComm'

//#region Scheduled Tasks

// 200 returns: { success: true, data: tasks }
// 500 returns: { success: false, message: "Failed to fetch scheduled tasks" }
export async function asyncGetScheduledTasks() {
  return asyncFetch(APISCHEDULEDTASKSURL, 'GET');
}

// 200 returns: { success: true, data: task }
// 404 returns: { success: false, message: "ScheduledTask not found" }
// 500 returns: { success: false, message: "Failed to fetch scheduled task" }
export async function asyncGetScheduledTask(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APISCHEDULEDTASKSURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: task }
// 400 returns: { success: false, message: "deskId, userId, description, new_height and scheduled_at are required" }
// 404 returns: { success: false, message: "User or Desk not found" }
// 500 returns: { success: false, message: "Failed to create scheduled task" }
export async function asyncPostScheduledTask({ deskId, userId, description, new_height, scheduled_at }) {
  if (!deskId || !userId || !description || !new_height || !scheduled_at) {
    console.log(`deskId (${deskId}), userId (${userId}), description (${description}), new_height (${new_height}), or scheduled_at (${scheduled_at}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APISCHEDULEDTASKSURL}`, 'POST', { deskId, userId, description, new_height, scheduled_at });
}

// 200 returns: { success: true, data: task }
// 404 returns: { success: false, message: "ScheduledTask not found" }
// 500 returns: { success: false, message: "Failed to update scheduled task" }
export async function asyncPutScheduledTask({ id, deskId, userId, description, new_height, scheduled_at }) {
  if (!id || !deskId || !userId || !description || !new_height || !scheduled_at) {
    console.log(`id (${id}), deskId (${deskId}), userId (${userId}), description (${description}), new_height (${new_height}), or scheduled_at (${scheduled_at}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APISCHEDULEDTASKSURL}/${id}`, 'PUT', { deskId, userId, description, new_height, scheduled_at });
}

// 200 returns: { success: true, message: "ScheduledTask deleted successfully" }
// 404 returns: { success: false, message: "ScheduledTask not found" }
// 500 returns: { success: false, message: "Failed to delete scheduled task" }
export async function asyncDeleteScheduledTask(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APISCHEDULEDTASKSURL}/${id}`, 'DELETE');
}

//#endregion