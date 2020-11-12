import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container } from './styles';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {

    return (
        <Container >
            {Icon && <Icon size={20} />}

            <input {...rest} />
        </Container>
    );
};

export default Input;