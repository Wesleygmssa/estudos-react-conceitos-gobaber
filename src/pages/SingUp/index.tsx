import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';
import { AnimationContainer } from '../SingUp/styles';


const SingUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    console.log(formRef.current);
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail obrigatório'),
                password: Yup.string()
                    .min(6, 'No minimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            console.log(errors)
        }
    }, [])

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <AnimationContainer>
                        <img src={logoimg} alt="Gobarber" />

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <h1>Faça seu cadastro</h1>

                            <Input
                                name="name"
                                icon={FiUser}
                                placeholder="Nome"
                            />

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

                            <Button type="submit"> Cadastrar</Button>

                        </Form>

                        <Link to="/">
                            <FiArrowLeft />
                          Voltar para login
                    </Link>
                    </AnimationContainer>

                </Content>

            </Container>


        </>
    )
}

export default SingUp; 