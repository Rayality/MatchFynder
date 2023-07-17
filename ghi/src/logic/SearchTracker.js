import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function SearchTracker(props) {
  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/search/${props.searchID}`
  );
  const [searchData, setSearchData] = useState({
    option_id: "",
    participants: props.participants,
  });

  const { sendJsonMessage } = useWebSocket(socketUrl);

  const updateEdibleCount = (id = props.option_id) => {
    sendJsonMessage(searchData);
  };
  return <></>;
}
