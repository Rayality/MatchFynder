import SendData from "../../logic/SendData";

export default function Logout() {
  const url = process.env.REACT_APP_ACCOUNTS_HOST;
  SendData(url, "delete");
}
