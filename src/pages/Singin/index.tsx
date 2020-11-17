import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';



const Singin: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useContext(AuthContext);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            //VALIDATION
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail obrigatório'),
                password: Yup.string()
                    .required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn();

        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            console.log(errors)
        }
    }, [signIn])

    return (
        <>
            <Container>
                <Content>
                    <img src={logoimg} alt="Gobarber" />
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Faça seu logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button type="submit"> Entrar</Button>

                        <a href="/">Esqueci minha senha</a>
                    </Form>

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