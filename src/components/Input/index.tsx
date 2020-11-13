import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container } from './styles';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, SetIsFilled] = useState(false);


    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);


    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlue = useCallback(() => {
        setIsFocused(false);

        // VERIFICANDO SE INPUT ESTA VAZIO.
        if (inputRef.current?.value) {
            SetIsFilled(true);
        } else {
            SetIsFilled(false);
        }
        SetIsFilled(!!inputRef.current?.value);

    }, []);

    return (
        <Container isFilled={isFilled} isFocused={isFocused} >

            {Icon && <Icon size={20} />}

            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlue}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </Container>
    );
};

export default Input;