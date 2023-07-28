import { Outlet, useParams } from "react-router-dom";
// import InviteFriendsForm from "../Components/forms/InviteFriends";
import PageUnderConstruction from "../Components/views/PageInDev";
import { useGetOptionsBySearchQuery } from "../Redux/searchApi";

export default function InviteFriends() {
  const { searchId } = useParams();
  return (
    <>
      <PageUnderConstruction searchId={searchId} />
      {/* <InviteFriendsForm searchId={searchId}></InviteFriendsForm> */}
    </>
  );
}
