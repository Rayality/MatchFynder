import SendData from "../../logic/SendData";

export default function Logout() {
  const url = "http://localhost:8000/token";
  SendData(url, "delete");
}
