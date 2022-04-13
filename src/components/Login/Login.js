import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const formReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      email: action.val,
      password: state.password,
      emailValid: state.emailValid,
      passwordValid: state.passwordValid,
      formValid: action.val.includes("@") && state.passwordValid,
    };
  }
  if (action.type === "PASSWORD_INPUT") {
    return {
      email: state.email,
      password: action.val,
      emailValid: state.emailValid,
      passwordValid: state.passwordValid,
      formValid: state.emailValid && action.val.length > 6,
    };
  }
  if (action.type === "EMAIL_INPUT_BLUR") {
    return {
      email: state.email,
      password: state.password,
      emailValid: state.email.includes("@"),
      passwordValid: state.passwordValid,
      formValid: state.email.includes("@") && state.passwordValid,
    };
  }
  if (action.type === "PASSWORD_INPUT_BLUR") {
    return {
      email: state.email,
      password: state.password,
      emailValid: state.emailValid,
      passwordValid: state.password.length > 6,
      formValid: state.emailValid && state.password.length > 6,
    };
  }
  return {
    email: "",
    password: "",
    emailValid: null,
    passwordValid: null,
    formValid: null,
  };
};

const Login = props => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatchForm] = useReducer(formReducer, {
    email: "",
    password: "",
    emailValid: null,
    passwordValid: null,
    formValid: null,
  });

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = event => {
    // dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    dispatchForm({ type: "EMAIL_INPUT", val: event.target.value });
    // setEnteredEmail(event.target.value);
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = event => {
    // setEnteredPassword(event.target.value);
    dispatchForm({ type: "PASSWORD_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchForm({ type: "EMAIL_INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchForm({ type: "PASSWORD_INPUT_BLUR" });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={formState.emailValid}
          type="email"
          id="email"
          value={formState.email}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label="Email"
        />
        <Input
          isValid={formState.passwordValid}
          type="password"
          id="password"
          value={formState.password}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
        />

        {/* <div
          className={`${classes.control} ${
            formState.emailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${
            formState.passwordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.formValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
