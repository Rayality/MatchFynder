// import { useState } from "react";
// import { ToggleButton, Form, Row, Button } from "react-bootstrap";
// // import { useParams } from "react-router-dom";

// export default function InviteFriends(props) {
//   // const searchId = props.searchId;
//   const [checked, setChecked] = useState(false);
//   // const [friends, setFriends] = useState([]);
//   // const [invites, setInvites] = useState([]);

//   const handleInvite = (e) => {
//     const contactInfo = e.target.value;
//     const name = e.taget.setInvites({ ...invites, name: contactInfo });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {friends.map((friend) => {
//         return (
//           <Row className='mb-3'>
//             <Form.Group>
//               <ToggleButton
//                 checked={checked}
//                 variant='outline-primary'
//                 onChange={(e) => setChecked(e.currentTarget.checked)}
//               >
//                 Placeholder
//               </ToggleButton>
//               <Form.Label>{friend.name}</Form.Label>
//             </Form.Group>
//           </Row>
//         );
//       })}
//       <Row className='mb-3'>
//         <Form.Group>
//           <Form.Label>Phone # or Email</Form.Label>
//           <Form.Control type='text' placeholder='Phone # or Email' />
//           <Button variant='primary' onClick={handleInvite}>
//             Invite
//           </Button>
//         </Form.Group>
//       </Row>
//       <Button variant='primary' type='submit'>
//         Lets Get Swiping!
//       </Button>
//     </Form>
//   );
// }
