const apiRoot = process.env.REACT_APP_API_ROOT;

export const api = {
  auth: {
    register: `${apiRoot}/auth/register`,
    signIn: `${apiRoot}/auth`,
    details: `${apiRoot}/me`,
  },
};
