import auth0 from "auth0-js"
import { navigate } from "gatsby"
import { authConfig } from "../auth/auth_config"

const isBrowser = typeof window !== "undefined"

const index = isBrowser
  ? new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: authConfig.config.clientId,
    redirectUri: authConfig.config.callback,
    responseType: "token id_token",
    scope: "openid profile email"
  })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  index.authorize()
}

const setSession = (cb = () => {
}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/dashboard")
    cb()
  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  index.checkSession({}, setSession(callback))
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  index.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  index.logout({
    returnTo: window.location.origin
  })
}
