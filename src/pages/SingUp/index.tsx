import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';


const SingUp: React.FC = () => {

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoimg} alt="Gobarber" />
                    <form action="">
                        <h1>Faça seu cadastro</h1>

                        <Input

                            icon={FiUser}
                            name="name"
                            type="text"
                            placeholder="Nome"

                        />

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

                        <Button type="button" >Cadastrar</Button>

                    </form>

                    <a href="/">
                        <FiArrowLeft />
                          Voltar para login
                        </a>
                </Content>

            </Container>


        </>
    )
}

export default SingUp; 