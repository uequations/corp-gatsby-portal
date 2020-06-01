export const authConfig = {
  config: {
    domain: process.env.GATSBY_AUTH0_DOMAIN,
    clientId: process.env.GATSBY_AUTH0_CLIENTID,
    callback: process.env.GATSBY_AUTH0_CALLBACK,
    logoutURL: process.env.GATSBY_AUTH0_LOGOUT
  }
}
