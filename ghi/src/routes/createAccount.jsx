import CreateAccountForm from "../Components/forms/CreateAccount";
import { useSelector, useDispatch } from "react-redux";
import { updated } from "../Redux/account-slice";

export default function CreateAccount() {
  return <CreateAccountForm />;
}
