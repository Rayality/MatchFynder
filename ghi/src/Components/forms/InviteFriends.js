import { useState } from "react";
import { ToggleButton, Form, Row, Button } from "react-bootstrap";

export default function InviteFriends(props) {
    const searchId = props.searchId;
    const [checked, setChecked] = useState(false);
    const [friends, setFriends] = useState([]);
    const [invites, setInvites] = useState([]);
    const inviteLink = window.location.href + '/options'

    const handleInvite = (e) => {
        const contactInfo = e.target.value;
        const name = e.taget.setInvites({ ...invites, name: contactInfo });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <h3>Friends List</h3>
            <Form onSubmit={handleSubmit}>
                {friends.map((friend) => {
                    return (
                        <Row className='mb-3'>
                            <Form.Group>
                                <ToggleButton
                                    checked={checked}
                                    variant='outline-primary'
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                >
                                    Placeholder
                                </ToggleButton>
                                <Form.Label>{friend.name}</Form.Label>
                            </Form.Group>
                        </Row>
                    );
                })}
                <Row className='mb-3'>
                    <h3>No Freinds? No problem! Just Put Some Rando's Contact Info Here</h3>
                    <p><i>Random invites are a great ice breaker.....trust me</i></p>
                    <Form.Group>
                        <Form.Control className="mb-3" type='text' placeholder='Phone # or Email' />
                        <Button variant='primary' onClick={handleInvite}>
                            Invite
                        </Button>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <h3>Let them eat cake</h3>
                    <h4>{inviteLink}</h4>
                </Row>
                <Button variant='primary' type='submit'>
                    Lets Get Swiping!
                </Button>
            </Form>
        </div>
    );
}
