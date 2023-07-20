import { Outlet, useParams } from "react-router-dom";
import InviteFriendsForm from "../Components/forms/InviteFriends";

export default function InviteFriends() {
  const { searchId } = useParams;
  return <InviteFriendsForm searchId={searchId}></InviteFriendsForm>;
}
