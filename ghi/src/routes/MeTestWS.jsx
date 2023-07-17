import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Button, Form } from "react-bootstrap";

export default function WSTest() {
  const [outgoing, setOutgoing] = useState("");
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleChange = (e) => {
    setOutgoing(e.target.value);
  };

  const handleClickSendMessage = (e) => {
    e.preventDefault();
    sendMessage(outgoing);
  };

  return (
    <div>
      <Form onSubmit={handleClickSendMessage}>
        <Form.Group className='mb-3' controlId='formWS'>
          <Form.Label>Send message here</Form.Label>
          <Form.Control onChange={handleChange} value={outgoing} type='text' />
          <Form.Text className='text-muted'>Testing out WebSockets!</Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Send It!
        </Button>
      </Form>
      <div className='mb-3'>
        <ul>
          {messageHistory.map((message, idx) => (
            <span key={idx}>{message ? message.data : null}</span>
          ))}
        </ul>
      </div>
    </div>
  );
}
