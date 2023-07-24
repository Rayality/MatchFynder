import MatchMade from "../Components/views/MatchMade";
import { useParams } from "react-router";


export default function MatchMadePage() {
    const { place_id } = useParams();
    return <MatchMade place_id={place_id} />
};
