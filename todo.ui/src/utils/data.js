const fetchRetry = require('fetch-retry')(fetch);

class FetchError extends Error {
  constructor(message, status) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

const handleErrors = (response) => {
  if (!response.ok) {
    const message =
      response.statusText || (response.status === 400 ? 'No data' : 'An unhandled exception has occurred');

    throw new FetchError(message, response.status);
  }

  return response;
};

export const fetchData = async (url, authToken = undefined) => {
  let params = {
    retryOn: [503],
    retries: 2,
    retryDelay: 500,
  };

  if (authToken) {
    params = {
      ...params,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...params.headers,
      },
    };
  }

  const response = await fetchRetry(url, params);
  const checkedResponse = handleErrors(response);

  return checkedResponse.json();
};

export const postData = async (url, body, authToken = undefined) => {
  let params = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  if (authToken) {
    params = {
      ...params,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...params.headers,
      },
    };
  }

  const response = await fetch(url, params);
  const wrappedResponse = await handleErrors(response);

  try {
    if (wrappedResponse.status === 204) {
      return response.statusText;
    }

    return wrappedResponse;
  } catch (err) {
    if (wrappedResponse.status < 400) {
      return wrappedResponse.statusText;
    }

    throw err;
  }
};

export const putData = async (url, body, authToken = undefined) => {
  let params = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  if (authToken) {
    params = {
      ...params,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...params.headers,
      },
    };
  }

  const response = await fetchRetry(url, params);
  const wrappedResponse = await handleErrors(response);

  return wrappedResponse;
};

export const deleteData = async (url, authToken = undefined) => {
  let params = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  if (authToken) {
    params = {
      ...params,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...params.headers,
      },
    };
  }

  const response = await fetchRetry(url, params);
  const wrappedResponse = await handleErrors(response);

  return wrappedResponse;
};
