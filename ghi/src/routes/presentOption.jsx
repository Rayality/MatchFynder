import { useOutletContext, useParams } from "react-router-dom";
import OptionCard from "../Components/views/OptionCard";
import { useContext } from "react";

export default function PresentOption() {
  const { searchId } = useParams();
  return <OptionCard searchId={searchId} />;
}
