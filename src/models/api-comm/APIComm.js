export const SERVERBASEURL = 'http://localhost:3000';
export const APIBASEURL = SERVERBASEURL + '/api';

//#region API Endpoints

export const APIUSERSURL = APIBASEURL + '/users'
export const APIDESKSURL = APIBASEURL + '/desks'
export const APIPERMISSIONSURL = APIBASEURL + '/permissions'
export const APISCHEDULEDTASKSURL = APIBASEURL + '/scheduled-tasks'
export const APICONTROLLERSURL = APIBASEURL + '/controllers'
export const APIUSERDESKURL = APIBASEURL + '/user-desks'
export const APIUSERPERMISSIONURL = APIBASEURL + '/user-permissions'

//#endregion

//#region Generic async fetch function

export async function asyncFetch(url, method, body) {
    try {
        if (url == null)
            throw new Error(`Url was: null`);
        if (method == null || !(method == 'GET' || method == 'POST' || method == 'PUT' || method == 'DELETE'))
            throw new Error(`Method was: ${method ? 'null' : method}, use either 'GET', 'POST', 'PUT', or 'DELETE'`);
        const response = await fetch(url, { 
          method: method,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok){
            console.error(response);
        }
        const result = await response.json();
        console.log(`fetch -[ ${url} ]- result: `, result)
        return result.success && result.data != null ? result.data : result;
    } catch (error) {
        console.error(error.message);
    }
}

//#endregion