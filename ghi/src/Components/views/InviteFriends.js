import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteFriendForm from "../forms/InviteFriendForm";
import Invite from '../../images/invite.jpg'


export default function InviteFriends(props) {
    const [invites, setInvites] = useState([]);
    const inviteLink = window.location.href + '/options'
    const navigate = useNavigate()
    const handleInvite = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`options`)
    };

    return (
        <div className="cover-container d-flex mx-auto flex-column">
            <div className="invite-jumbotron jumbotron-fluid">
                <div className="container mb-3 shadow invite-container">
                <div className="mb-3">
                    <h1>Invite Friends</h1>
                </div>
                    <InviteFriendForm submitFunction={handleSubmit} inviteFunction={handleInvite} />
                </div>
            </div>
            <div className="container">
                <div className="container">
                <h2 className="fynder-slate-text">how it works</h2>
                <div className="row bs-wizard">
                    <div className="col bs-wizard-step complete">
                    <div className="text-center bs-wizard-stepnum">enter location</div>
                    <div className="progress">
                        <div className="progress-bar" />
                    </div>
                    <button
                        className="bs-wizard-dot border-0"
                        aria-describedby="tooltip"
                        title="enter a zipcode or city, state"
                    />
                    </div>

                    <div className="col bs-wizard-step active">
                    <div className="text-center bs-wizard-stepnum">invite others</div>
                    <div className="progress">
                        <div className="progress-bar" />
                    </div>
                    <button
                        className="bs-wizard-dot border-0"
                        aria-describedby="tooltip"
                        title="invite your family or friends to participate"
                    />
                    </div>

                    <div className="col bs-wizard-step disabled">
                    <div className="text-center bs-wizard-stepnum">approve/veto</div>
                    <div className="progress">
                        <div className="progress-bar" />
                    </div>
                    <button
                        className="bs-wizard-dot border-0"
                        aria-describedby="tooltip"
                        title="everyone gets a chance to approve/veto restaurant options"
                    />
                    </div>

                    <div className="col bs-wizard-step disabled">
                    <div className="text-center bs-wizard-stepnum">match</div>
                    <div className="progress">
                        <div className="progress-bar" />
                    </div>
                    <button
                        className="bs-wizard-dot border-0"
                        aria-describedby="tooltip"
                        title="get your match, along with fun/snarky participation badges"
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
