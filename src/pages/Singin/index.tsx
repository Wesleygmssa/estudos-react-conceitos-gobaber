import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';


const Singin: React.FC = () => {

    return (
        <>
            <Container>
                <Content>
                    <img src={logoimg} alt="Gobarber" />
                    <form action="">
                        <h1>Faça seu logon</h1>

                        <Input

                            icon={FiMail}
                            name="name"
                            type="text"
                            placeholder="E-mail"

                        />
                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="button" >Entrar</Button>

                        <a href="/">Esqueci minha senha</a>
                    </form>

                    <a href="/">
                        <FiLogIn />
                        Criar conta
                        </a>
                </Content>
                <Background />
            </Container>


        </>
    )
}

export default Singin; 