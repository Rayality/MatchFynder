
export default function InviteFriendForm(props) {


    return (
        <form onSubmit={props.submitFunction}
            className="form-floating mb-3"
        >
            <div className="mb-3 d-flex flex-column align-items-center w-100">
                <label htmlFor="emailInput" className="form-label">Group Members Email</label>
                <input type="email" className="form-control w-50" id="emailInput" placeholder="name@example.com" />
            </div>
            <div className="d-flex justify-content-evenly">
                <button className="btn btn-primary mb-3 btn3d fynder-button" onClick={props.inviteFunction}>
                    Invite
                </button>
                <button
                    type="submit"
                    className="btn btn-primary mb-3 btn3d fynder-button"
                >
                    Done
                </button>
            </div>
        </form>
    )
}
