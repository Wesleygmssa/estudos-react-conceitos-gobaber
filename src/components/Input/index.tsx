import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container, Error } from './styles';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
// import Tooltip from '../Tooltip';

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

        if (inputRef.current?.value) {
            SetIsFilled(true);
        } else {
            SetIsFilled(false);
        }

        // SetIsFilled(!!inputRef.current?.value);

    }, []);

    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused} >

            {Icon && <Icon size={40} />}

            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlue}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error &&
                <Error title={error}>
                    <FiAlertCircle size={20} color="#c53030" />
                </Error>}
        </Container >
    );
};

export default Input;