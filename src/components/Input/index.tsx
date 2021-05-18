import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconBaseProps } from 'react-icons/lib';

interface InputProps{ // Name é colocado nos input "name" e vem com o tipo string
  name: string;
  placeholder?: string; // Nem todos os inputs tem placeholder, então ele precisa do ?
  icon?: React.ComponentType<IconBaseProps> // E nem todos os inputs tem Icon, e precisa do ?
}// Porém Icon ele é uma string mas vem de uma lib chamada React-Icons e precisa passar
// React.ComponentType<IconBaseProps> para receber a base do Icon, que no caso é uma string

const Input = ({ name, icon: Icon, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null); // Aqui precisa expecificar que ele é um input
  // E que tem um valor dentro do input, todo input tem valor, mas nem sempre vai precisar passar
  // HTMLInputElement dentro do useRef, olhar sobre useRef na documentação do React sobre

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
