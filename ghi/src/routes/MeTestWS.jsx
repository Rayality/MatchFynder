import { Button, Form } from "react-bootstrap";
import {
  useGetMessagesQuery,
  useSendMessagesMutation,
} from "../Redux/webSocket-slice";
import { useState } from "react";

export default function WSTest() {
  const { data } = useGetMessagesQuery();
  const [outgoing, setOutgoing] = useState("");
  const [send, result] = useSendMessagesMutation();
  const handleChange = (e) => {
    setOutgoing(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(data);
    setOutgoing("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
        <p>{data}</p>
      </div>
    </div>
  );
}
