export const authConfig = {
  config: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENTID,
    callback: process.env.AUTH0_CALLBACK,
    logoutURL: process.env.AUTH0_LOGOUT
  }
}
