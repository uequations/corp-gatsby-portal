export async function postFormData(data, actionURL) {

  console.log("posting data: ", JSON.stringify(data))

  const responseOptions = {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  }

  return await fetch(actionURL, responseOptions)
}
