const apiRoot = process.env.REACT_APP_API_ROOT;

export const api = {
  auth: {
    register: `${apiRoot}/auth/register`,
    signIn: `${apiRoot}/auth`,
    me: `${apiRoot}/me`,
  },
  todos: {
    add: `${apiRoot}/todos`,
    list: `${apiRoot}/todos`,
    toggleIsComplete: (id) => `${apiRoot}/todos/${id}/iscomplete`,
    update: (id) => `${apiRoot}/todos/${id}`,
    delete: (id) => `${apiRoot}/todos/${id}`,
  },
};
