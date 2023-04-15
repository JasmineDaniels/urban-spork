import { Container, Form, Button, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { duelUsersUrl } from '../services/userService'
import Profile from '../components/Profile/Profile';
import { CardContainer } from './Duel.styles';

const Duel = () => {
    const [form, setForm] = useState({
        playerOneUsername: {
            value: ''
        },
        playerTwoUsername: {
            value: ''
        }
    })
    const [submit, setSubmit] = useState(false);
    const [duelData, setDuelData] = useState([]);
    const [winner, setWinner] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.playerOneUsername.value === '' || form.playerTwoUsername.value === ''){
            setErrMsg('Please enter a username in both fields.')
            setForm(
                { 
                    ...form, 
                    playerOneUsername: { ...form.playerOneUsername, value: '' }, 
                    playerTwoUsername: { ...form.playerTwoUsername, value: ''} 
                }
            );
            return;
        }

        try {
            const response = await axios.get(`${duelUsersUrl}username=${form.playerOneUsername.value}&username=${form.playerTwoUsername.value}`)
            const data = await response.data;

            if (data[0]["total-stars"] > data[1]["total-stars"]) {
                setWinner(data[0].name)
            } else {
                setWinner(data[1].name)
            }
            setDuelData(data);
            setSubmit(true)

        } catch (error) {
            if (error?.response?.status === 404){
                setErrMsg(`Sorry, please choose a different username.`)
                setForm({ 
                    ...form, 
                    playerOneUsername: { ...form.playerOneUsername, value: '' }, 
                    playerTwoUsername: { ...form.playerTwoUsername, value: ''} 
                });
            } else {
                console.error(error);
            }
        }
        console.log("I was clicked")
    }


    return (
        <Container>
            <h1 className='text-center mt-5'>Duel Page</h1>
            {submit ? (
                <Row className='mt-5'>
                    {duelData.map((d, idx) => {
                        return (
                            <CardContainer key={idx} className='card mx-5'>
                                <Profile winner={winner} props={d} />
                            </CardContainer>
                        )
                    })}
                </Row>
            ) : (
                <Row>
                    <div className='col-md-6'>
                        <Form >
                            <InputGroup>
                                <InputGroup.Text htmlFor='playerOne'>
                                    Player One Username:
                                </InputGroup.Text>
                                <Form.Control
                                    value={form.playerOneUsername.value}
                                    type='text'
                                    id='playerOne'
                                    onChange={(e) => setForm({ ...form, playerOneUsername: { ...form.playerOneUsername, value: e.target.value } })}>

                                </Form.Control>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className='col-md-6'>
                        <Form >
                            <InputGroup>
                                <InputGroup.Text htmlFor='playerTwo'>
                                    Player Two Username:
                                </InputGroup.Text>
                                <Form.Control
                                    value={form.playerTwoUsername.value}
                                    type='text'
                                    id='playerTwo'
                                    onChange={(e) => setForm({ ...form, playerTwoUsername: { ...form.playerTwoUsername, value: e.target.value } })}>

                                </Form.Control>
                            </InputGroup>
                        </Form>
                    </div>
                    <div className='text-center mt-4'>
                        <div>
                            <h3 style={{ color: 'red' }}>{errMsg}</h3>
                        </div>
                        <Button variant="primary" size='lg' onClick={(e) => handleSubmit(e)}>Duel</Button>
                    </div>
                </Row>
            )}

        </Container>
    )
}

export default Duel;