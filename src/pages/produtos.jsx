import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import backgroundImage from './background.jpg';

const moedaMask = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    let formattedValue = cleanValue;
    formattedValue = formattedValue.replace(/(\d+)(\d{2})$/, '$1,$2');
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    formattedValue = `R$ ${formattedValue}`;
    return formattedValue;
};

const Produtos = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [carregaDado, setCarregaDado] = useState(false);
    const [insereDado, setInsereDado] = useState(false);
    const [produtos, setProdutos] = useState([]);

    const handleCarregaDado = () => {        
        setCarregaDado(true);
    }

    useEffect(() => {
        if (carregaDado) {
            setCarregaDado(false);
            // se o filtro não funcinar é so tirar '?tipo=produto'
            fetch("http://localhost:5000/alldados?tipo=produto", {
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProdutos(data);
            })
            .catch((error) => console.log(error));            
        }
    }, [carregaDado]);

    useEffect(() => {
        if (insereDado) {
            setInsereDado(false);

            if (nome.trim() === '' || preco.trim() === '' || descricao.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const dado = {
                "nome": nome,
                "preco": preco,
                "descricao": descricao
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
                setPreco('');
                setDescricao('');
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
            });
        }
    }, [insereDado]);

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
            }}
        >
            <div>
                <h2>Cadastro de Produto</h2>
            </div>

            <Container>
                <Row>
                    <Col md="4">
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Nome do produto</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nome"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md="4">
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Preço"
                                style={{ width: '85%', fontSize: '1.2em' }}
                                value={preco}
                                onChange={(e) => setPreco(moedaMask(e.target.value))}
                            />
                        </Form.Group>
                    </Col>

                    <Col md="4">
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea" 
                                rows={5}
                                placeholder="Descrição"
                                style={{ width: '81%', fontSize: '1.2em' }}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

            <Container>    
                <button type="button" className="btn btn-primary" onClick={handleCarregaDado}>Carrega Produto</button>
                <button style={{ marginLeft: "30px" }}  type="button" className="btn btn-primary" onClick={handleInsereDado}>Inserir Produto</button>
            </Container>
                <br /><br />

        </div>
    );
}

export default Produtos;
