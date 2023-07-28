import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGetOptionsBySearchQuery } from '../../Redux/searchApi'

function PageUnderConstruction(props) {
    const navigate = useNavigate()
    const thumbnail = require('../images/cool-dinosaur-eating-burger-cartoon_145832-405.jpeg')
    const handleClick = () => {
        navigate(`options`, { replace: true })
    }
    return (
        <div>
            <h1 className='mb-3'>Let's Be Honest You didnt have any friends to Invite</h1>
            <Button onClick={handleClick} className="mb-3">Continue with search</Button>
            <img
                src={thumbnail}
                alt="img not available" />
        </div>
    )
}

export default PageUnderConstruction
