import React, { useEffect, useState } from 'react';
import backgroundImage from './background.jpg';
import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap';

const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
};

const Tecnico = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [username, setUsername] = useState('');
    const [carregaDado, setCarregaDado] = useState(false);
    const [insereDado, setInsereDado] = useState(false);

    const handleCarregaDado = () => {        
        setCarregaDado(true);
    }

    const handleInsereDado = () => {
        if (nome.trim() === '' || cpf.trim() === '' || email.trim() === '' || endereco.trim() === '' || username.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setInsereDado(true);
    }

    useEffect(() => {
        if (carregaDado) {
            setCarregaDado(false);
            fetch("http://localhost:5000/alldados")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaDado]);

    useEffect(() => {
        if (insereDado) {
            setInsereDado(false);
            const dado = {
                "nome": nome,
                "cpf": cpf,
                "email": email,
                "username": username,
                "endereco": endereco
            };
            fetch("http://localhost:5000/dados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dado)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados enviados com sucesso:", data);
                setNome('');
                setEmail('');
                setEndereco('');
                setCpf('');
                setUsername('');
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
            });
        }
    }, [insereDado]);

    return (
        <div 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
            }}>

            <div
                className="ContainerCadastro"
                style={{ marginTop: "-250px" }}
            >
                <h2>Cadastro de Técnico</h2>
            </div>

            <Container>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="CPF"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={cpf}
                                onChange={(e) => setCpf(cpfMask(e.target.value))} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationFormikUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup style={{ width: '85%' }}>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    style={{ width: '50%', fontSize: '1.2em' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom04">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Endereço"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <br /> 

            <Container>    
                <button type="button" className="btn btn-primary" onClick={handleCarregaDado}>Carregar Técnico</button>
                <button style={{ marginLeft: "30px" }}  type="button" className="btn btn-primary" onClick={handleInsereDado}>Inserir Técnico</button>
            </Container>
            <br/><br/>

        </div>
    );
}

export default Tecnico;
