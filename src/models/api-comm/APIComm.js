export const SERVERBASEURL = 'http://localhost:3000';
export const APIBASEURL = SERVERBASEURL + '/api';

export const APIUSERSURL = APIBASEURL + '/users'
export const APIDESKSURL = APIBASEURL + '/desks'
export const APIPERMISSIONSURL = APIBASEURL + '/permissions'
export const APISCHEDULEDTASKSURL = APIBASEURL + '/scheduled-tasks'
export const APICONTROLLERSURL = APIBASEURL + '/controllers'

export async function asyncFetch(url, method, body) {
    try {
        if (url == null)
            throw new Error(`Url was: null`);
        if (method == null || !(method == 'GET' || method == 'POST' || method == 'PUT' || method == 'DELETE'))
            throw new Error(`Method was: ${method ? 'null' : method}, use either \'GET\', \'POST\', \'PUT\', or \'DELETE\'`);
        const response = await fetch(url, { 
          method: method,
          body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok){
            console.error(response);
        }
        const result = await response.json();
        console.log(`fetch -[ ${url} ]- result: `, result)
        return result.success ? result.data != null ? result.data : result.message : result;;
    } catch (error) {
        console.error(error.message);
    }
}