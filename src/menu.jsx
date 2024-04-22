import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/styles/styles.css'; 

function Menu() {
  return (
    
    <Navbar expand="lg" className="custom-navbar" variant="dark" fixed= "top">
      <Container>
        <Navbar.Brand href="#home">Loja do Vitor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ marginLeft: 'auto' }}>
          
          <NavDropdown title="Cadastro" id="basic-nav-dropdown">

              <NavDropdown.Item href="/Home">
                Home
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Produtos">
                Produtos
              </NavDropdown.Item>
              <NavDropdown.Item href="/Clientes">
                Clientes
              </NavDropdown.Item>
                           
              <NavDropdown.Item href="/Tecnicos">
                Técnicos
              </NavDropdown.Item>

              <NavDropdown.Item href="/Ordem_servico">
                Ordem de serviço
              </NavDropdown.Item>
            </NavDropdown>           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;