import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container, Content, Background, AnimationContainer } from './styles';

import logoimg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import * as Yup from 'yup';
import { useToast } from '../../hooks/ToastContext';
import { Link } from 'react-router-dom';

interface ForgotPasswordFormData {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            //VALIDATION
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            //Recuperação de senha

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            //mensagem pelo contexto
            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar fazer a recuperação de senha'
            });
        }
    }, [addToast])

    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoimg} alt="Gobarber" />
                        <Form ref={formRef} onSubmit={handleSubmit} >
                            <h1>Recuperar senha</h1>
                            <Input
                                name="email"
                                icon={FiMail}
                                placeholder="E-mail"
                            />

                            <Button type="submit"> Recuperar</Button>

                        </Form>

                        <Link to="/">
                            <FiArrowLeft />
                            voltar ao login
                        </Link>
                    </AnimationContainer>
                </Content>
                <Background />
            </Container>


        </>
    )
}

export default ForgotPassword; 