import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from './background.jpg';
import './styles.css';

const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
};

const Cliente = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [carregaDado, setCarregaDado] = useState(false);
    const [insereDado, setInsereDado] = useState(false);
    const [clientes, setClientes] = useState([]);
  
    useEffect(() => {
        if (carregaDado) {
            setCarregaDado(false);
            fetch("http://localhost:5000/alldados?tipo=cliente")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setClientes(data); // Correção: armazena os dados dos clientes no estado
                })
                .catch((error) => console.log(error));            
        }
    }, [carregaDado]);

    useEffect(() => {
        if (insereDado) {
            setInsereDado(false);
            if (nome.trim() === '' || cpf.trim() === '' || email.trim() === '' || endereco.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const dado = {
                "nome": nome,
                "cpf": cpf,
                "email": email,
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
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
            });
        }
    }, [insereDado]);

    const handleCarregaDado = () => {        
        setCarregaDado(true);
    }

    const handleInsereDado = () => {
        setInsereDado(true);
    }

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
            
            <div>
                <h2>Cadastro de Cliente</h2>
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
                <button type="button" className="btn btn-primary" onClick={handleCarregaDado}>Carregar Cliente</button>
                <button style={{ marginLeft: "30px" }}  type="button" className="btn btn-primary" onClick={handleInsereDado}>Inserir Cliente</button>
            </Container>
            <br /><br />
            
            
    
    <h2 style={{ marginBottom: '20px' }}>Lista de Clientes Cadastrados</h2>
            
        <div className='custom-list'>
        <ul className="list-group">
            {clientes.map((cliente, index) => (
                <li key={index} className="list-group-item"  
                style={{ width: '95%', fontSize: '1.2em' }}>
                    <strong>Nome:</strong> {cliente.nome} - <strong>CPF:</strong> {cliente.cpf} - <strong>Email:</strong> {cliente.email} - <strong>Endereço:</strong> {cliente.endereco}
                </li>
            ))}
        </ul>
        </div>
        </div>
    );
}

export default Cliente;
