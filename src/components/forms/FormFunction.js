import axios from "axios"

export async function postFormData(data, actionURL) {

  console.log("posting data", JSON.stringify(data))
  console.log("to url", actionURL)

  const responseOptions = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  return Promise.resolve(fetch(actionURL, responseOptions).then(r => JSON.stringify(r)))
}
