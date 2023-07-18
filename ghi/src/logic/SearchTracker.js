import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function SearchTracker(searchParams) {
  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/search/${searchParams.searchID}`
  );
  const [searchData, setSearchData] = useState({
    participants: searchParams.participants,
    options: options,
  });

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);
}
