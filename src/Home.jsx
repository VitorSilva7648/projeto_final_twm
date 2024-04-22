import React from 'react';
import Container from 'react-bootstrap/Container';
import backgroundImage from './images/background.jpg';

export default function Home() {
    return (
        <div 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw', // largura da tela
                height: '100vh', // altura da tela
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
            }}
        >
            <div className="text-center">
                <h1>Cadastro da loja</h1>
                <h4>Selecione no menu acima o cadastro que deseja realizar</h4>
            </div>
        </div>
    );
}
