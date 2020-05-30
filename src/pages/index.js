import React from "react"

import App from "../App"
import { Auth0Provider } from "../auth/auth0-spa"
import { authConfig } from "../auth/auth_config"
import * as serviceWorker from "../serviceWorker"
import history from "../auth/history"

export default function IndexPage() {

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }

  serviceWorker.unregister()

  return (
    <Auth0Provider
      domain={authConfig.config.domain}
      client_id={authConfig.config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App/>
    </Auth0Provider>)
}
