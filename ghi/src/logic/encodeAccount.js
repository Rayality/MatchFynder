export default function encodeAccount(account) {
  const formBody = Object.keys(account)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(account[key])
    )
    .join("&");
  return formBody;
}
