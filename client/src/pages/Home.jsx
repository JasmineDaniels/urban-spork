import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { HomeContainer } from './Home.styles';
const Home = () => {
    return (
        <HomeContainer>

            <div className='text-center mt-5'>
                <h1>Welcome to Dev Duel</h1>
                <Row className='mt-5'>
                    <Col >
                        <Link to={"/inspect"}>
                            <Button variant="primary" size='lg' >Inspect</Button>
                        </Link>
                    </Col>
                    <Col >
                        <Link to={"/duel"}>
                            <Button variant="primary" size='lg' >Duel</Button>
                        </Link>

                    </Col>
                </Row>
            </div>
            
        </HomeContainer>
    )
}

export default Home;