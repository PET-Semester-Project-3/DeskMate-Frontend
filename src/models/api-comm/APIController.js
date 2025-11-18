import { APICONTROLLERSURL, asyncFetch } from './APIComm'

//#region Controllers

// 200 returns: { success: true, data: controllers }
// 500 returns: { success: false, message: "Failed to fetch controllers" }
export async function asyncGetControllers() {
  return asyncFetch(APICONTROLLERSURL, 'GET');
}

// 200 returns: { success: true, data: controller }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to fetch controller" }
export async function asyncGetController(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APICONTROLLERSURL}/${id}`, 'GET');
}

// 201 returns: { success: true, data: controller }
// 400 returns: { success: false, message: "name required" }
// 500 returns: { success: false, message: "Failed to create controller" }
export async function asyncPostController({ name }) {
  if (!name) {
    console.log(`name (${name}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APICONTROLLERSURL}`, 'POST', { name });
}

// 200 returns: { success: true, data: updated }
// 404 returns: { success: false, message: "Desk not found" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to update controller" }
export async function asyncPutController({ id, name }) {
  if (!id || !name) {
    console.log(`id (${id}), or name (${name}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APICONTROLLERSURL}/${id}`, 'PUT', { name });
}

// 200 returns: { success: true, message: "Controller deleted" }
// 404 returns: { success: false, message: "Controller not found" }
// 500 returns: { success: false, message: "Failed to delete controller" }
export async function asyncDeleteController(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APICONTROLLERSURL}/${id}`, 'DELETE');
}

//#endregion

//#region ControllerToDesks

// 200 returns: { success: true, data: desks }
// 500 returns: { success: false, message: "Failed to fetch desks" }
export async function asyncGetControllerDesks(id) {
  if (!id) {
    console.log(`id (${id}) was null or empty`)
    return null;
  }
  return asyncFetch(`${APICONTROLLERSURL}/${id}/desks`, 'GET');
}

//#endregion