import { useState } from "react"
import { useSelector } from "react-redux";

export default function Profile() {
    const [display, setDisplay] = useState(false);
    const account = useSelector((state) => state.accountCreator.account)

    function show() {
        setDisplay(!display)
    }

    return (
        <button
            onClick={show}
            className="btn btn-lg btn-secondary fynder-button btn3d"
        >
            <box-icon name='user' color="white"></box-icon>
        </button>
    )
}
