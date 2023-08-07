export default async function SendData(url, method, data = {}) {
  let fetchConfig = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "false",
  };

  try {
    let response = await fetch(url, fetchConfig);
    if (response.ok) {
      return response;
    }
  } catch (e) {
    console.log(e);
  }
}

async function sendLoginData(url = "", data = {}) {
  // if (data.grant_type === undefined) {
  //   data["grant_type"] = "";
  // }
  // if (data.scope === undefined) {
  //   data["scope"] = "";
  // }
  // if (data.client_id === undefined) {
  //   data["client_id"] = "";
  // }
  // if (data.client_secret === undefined) {
  //   data["client_secret"] = "";
  // }
  const formBody = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
  const fetchConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  };
  try {
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      return response;
    }
  } catch (e) {
    console.error(e);
  }
}

export { sendLoginData };
