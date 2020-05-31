import React from "react"
import { handleAuthentication } from "../auth"
import Callback from "../components/Callback"

const CallbackPage = () => {
  handleAuthentication()

  return (<Callback/>)
}

export default CallbackPage
