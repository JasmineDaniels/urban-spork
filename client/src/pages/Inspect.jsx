import { Container, Form, Button, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import Profile from '../components/Profile/Profile';
import { inspectUser } from '../services/userService'
import { DivContainer } from './Inspect.styles';

const Inspect = () => {
    const [form, setForm] = useState({
        username: {
            value: ''
        }
    })
    const [submit, setSubmit] = useState(false);
    const [inspectData, setInspectData] = useState({});
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.username.value === '') {
            setErrMsg('Please enter a username.')
            setForm({ ...form, username: { ...form.username, value: '' } });
            return;
        }

        inspectUser(form.username.value)
            .then((response) => {
                setInspectData(response);
                setForm({ ...form, username: { ...form.username, value: '' } });
                setSubmit(true);
            })
            .catch((error) => {
                if (error?.response?.status === 404) {
                    setErrMsg(`There is no user with this username: ${form.username.value}`)
                    setForm({ ...form, username: { ...form.username, value: '' } });
                } else {
                    console.error(error);
                }
            })
        console.log("I was clicked")
    }

    return (
        <Container>

            <div className='text-center mt-5'>
                <h1>Inspect Page</h1>
                <Row>
                    {submit ? (
                        <DivContainer>
                            <Profile props={inspectData} />
                        </DivContainer>
                    ) : (
                        <div className='col-md-6 mx-auto'>
                            <Form >
                                <InputGroup>
                                    <InputGroup.Text htmlFor='username'>
                                        Username:
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={form.username.value}
                                        type='text'
                                        id='username'
                                        onChange={(e) => setForm({ ...form, username: { ...form.username, value: e.target.value } })}>

                                    </Form.Control>
                                </InputGroup>
                            </Form>
                            <div className='mt-4'>
                                <div>
                                    <h3 style={{ color: 'red' }}>{errMsg}</h3>
                                </div>
                                <Button variant="primary" size='lg' onClick={(e) => handleSubmit(e)}>Inspect</Button>
                            </div>

                        </div>)}
                </Row>

            </div>

        </Container>
    )
}

export default Inspect;