import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import AuthContext from '../context/auth-context';

const emailReducer = (state, action)=> {

  if(action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes('@')}
  };

  if(action.type === "INPUT_BLUR") {
    console.log(state.val)
    return {value: state.value, isValid: state.value.includes('@')}

  }

  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  
  if(action.type === "USER_PASSWORD") {
    return {value: action.value, isValid: action.value.trim().length > 6}
  }

  if(action.type === "IS_VALID") {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }

  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null})

  const {isValid: emailValid} = emailState;

  const {isValid: passwordValid} = passwordState;

  const context = useContext(AuthContext)

  // console.log(emailState)
  useEffect(()=> {

   const temp = setTimeout(()=> {
      console.log('Check form')
      setFormIsValid(
        emailValid && passwordValid
      );
    }, 500)

    return ()=> {
      console.log('clean effect')
      clearTimeout(temp)
    }

  }, [setFormIsValid, emailValid, passwordValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      event.target.value.trim().length > 6 && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_PASSWORD', value: event.target.value})
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({type: "IS_VALID"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input
        label={'E-mail'}
        id={"e-mail"}
        type="email"
        isValid={emailValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>
        <Input
        label={'Password'}
        id={"password"}
        type="password"
        isValid={passwordValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
