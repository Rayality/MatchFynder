import { useParams } from "react-router-dom";
import InviteFriendsForm from "../Components/views/InviteFriends";
// import PageUnderConstruction from "../Components/views/PageInDev";

export default function InviteFriends() {
  const { searchId } = useParams();
  return (
    <>
      {/* <PageUnderConstruction searchId={searchId} /> */}
      <InviteFriendsForm searchId={searchId}></InviteFriendsForm>
    </>
  );
}
