export default async function SendData(url, method, data) {
  let fetchConfig = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(url, fetchConfig);
    if (response.ok) {
      for (let key of Object.keys(data)) {
        data[key] = "";
      }
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}
