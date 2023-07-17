export default async function SendData(url, method, data = {}) {
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
      return response;
    }
  } catch (e) {
    console.log(e);
  }
}

async function sendLoginData(url = "", data = {}) {
  // const formBody = Object.keys(data)
  //   .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
  //   .join("&");
  const fetchConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
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
