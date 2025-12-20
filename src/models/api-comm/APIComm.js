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
export const APIDESKMATEURL = APIBASEURL + '/deskmates'

//#endregion

//#region API Error

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(message, code, statusCode, details = null, retryable = false) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.retryable = retryable;
  }
}

//#endregion

//#region Generic async fetch function

/**
 * Enhanced fetch function with proper error handling
 * @param {string} url - The URL to fetch
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {object} body - Optional request body
 * @returns {Promise<any>} - The response data
 * @throws {APIError} - Throws on non-ok response or network error
 */
export async function asyncFetch(url, method, body) {
  if (url == null) {
    throw new APIError('URL is required', 'INVALID_REQUEST', 400);
  }

  if (method == null || !['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    throw new APIError(
      `Invalid method: ${method}. Use 'GET', 'POST', 'PUT', or 'DELETE'`,
      'INVALID_METHOD',
      400
    );
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    const result = await response.json();
    console.log(`fetch -[ ${url} ]- result:`, result);

    if (!response.ok || result.success === false) {
      throw new APIError(
        result.message || `Request failed with status ${response.status}`,
        result.code || `HTTP_${response.status}`,
        response.status,
        result.details || null,
        result.retryable || false
      );
    }

    return result.data != null ? result.data : result;
  } catch (error) {
    // Re-throw APIError as-is
    if (error instanceof APIError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(
        'Unable to connect to server. Please check your internet connection.',
        'NETWORK_ERROR',
        0,
        null,
        true
      );
    }

    // Unknown error
    console.error('Unexpected error in asyncFetch:', error);
    throw new APIError(
      error.message || 'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500
    );
  }
}

//#endregion
