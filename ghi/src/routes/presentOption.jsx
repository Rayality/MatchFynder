import { useParams } from "react-router-dom";
import OptionCard from "../Components/views/OptionCard";
import SearchTracker from "../logic/SearchTracker";

export default function PresentOption() {
  const { searchId } = useParams();
  return <OptionCard searchId={searchId} />;
}
