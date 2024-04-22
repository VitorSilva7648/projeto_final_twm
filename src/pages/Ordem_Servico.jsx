import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from './background.jpg';

const Ordem_Servico = () => {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [local, setLocal] = useState('');
    const [tecnico_realizar, setTecnico_realizar] = useState('');
    const [carregaDado, setCarregaDado] = useState(false);
    const [insereDado, setInsereDado] = useState(false);

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
            if (nome.trim() === '' || tipo.trim() === '' || local.trim() === '' || tecnico_realizar.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const dado = {
                "nome": nome,
                "tipo": tipo,
                "local": local,
                "tecnico_realizar": tecnico_realizar
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
                setTipo('');
                setLocal('');
                setTecnico_realizar('');
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

            <div
                className="ContainerCadastro"
                style={{ marginTop: "-250px" }}
            >
                <h2>Cadastro de Ordem de Serviço (O.S.)</h2>
            </div>

            <Container>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Nome da Ordem de Serviço</Form.Label>
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
                            <Form.Label>Tipo da Ordem de Serviço</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tipo"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Local</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Local"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={local}
                                onChange={(e) => setLocal(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="validationCustom04">
                            <Form.Label>Técnico para Ordem de Serviço</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Técnico"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={tecnico_realizar}
                                onChange={(e) => setTecnico_realizar(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <br /> 

            <Container>    
                <button type="button" className="btn btn-primary" onClick={handleCarregaDado}>Carregar O.S.</button>
                <button style={{ marginLeft: "30px" }} type="button" className="btn btn-primary" onClick={handleInsereDado}>Inserir O.S.</button>
            </Container>


        </div>
    );
}

export default Ordem_Servico;
