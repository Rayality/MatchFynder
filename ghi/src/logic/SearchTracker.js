import { useState } from "react";

export default function SearchTracker() {
  const [match, setMatch] = useState({
    p1: {
      o1: false,
    },
  });

  const socket = new WebSocket("ws://localhost:8000/search");

  return <></>;
}
