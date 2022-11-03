import React, { useRef, useImperativeHandle } from 'react';

import styles from './Input.module.css';


const Input = React.forwardRef(({type, id, value, onChange, onBlur, isValid, label, ref})=> {

    console.log('estou aqui')

    const inputRef = useRef();

    const activated = ()=> {

        inputRef.current.focus();
    } 

    useImperativeHandle(ref, ()=> {

        return {
            focus: activated,
        };
    });

    return (
        <div
          className={`${styles.control} ${
            isValid === false ? styles.invalid : ''
          }`}
        >
            <label htmlFor={id}>{label}</label>
            <input
            ref={inputRef}
            className={styles.inputClass}
            value={value}
            type={type}
            id={id}
            onChange={onChange}
            onBlur={onBlur}>
            </input>
        </div>
      
    );
});

export default Input;