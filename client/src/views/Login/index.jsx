import React, { useState } from 'react';
import { Container, Row, Col, FormGroup, Input, Label, Button } from 'reactstrap';
import {
  Password,
  SignIn,
  EmailAddress,
  CreateAccount
} from '../../constant';
import { asyncWrap } from '../../utils/utils';
import axios from 'axios';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Formik, Form, Field } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { setToken } from '../../axiosdefaults';

const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/;

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      passwordValidation,
      'Password should contain Lowercase letters, numbers, special characters and should be 8 char long!'
    )
    .required()
});

const Login = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState('');

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  const submit = async (values) => {
    const [error, result] = await asyncWrap(
      axios.post('/login', {
        email: values.email,
        password: values.password
      })
    );
    if (!result) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    localStorage.setItem('loginUser', JSON.stringify(result.data));
    setToken(result.data.token);
    window.location.reload();
  };

  return (
    <Container fluid={true} className="p-0">
      <ToastContainer />
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              {/* <div>
                <a className="logo" href="#javascript">
                  <img
                    className="img-fluid for-light"
                    src="../../assets/images/logo/login.png"
                    alt="loginpage"
                  />
                  <img
                    className="img-fluid for-dark"
                    src="../../assets/images/logo/logo_dark.png"
                    alt="loginpage"
                  />
                </a>
              </div> */}
              <div className="login-main">
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  onSubmit={submit}
                  validationSchema={loginSchema}
                >
                  <Form className="theme-form">
                    <h4>Sign In</h4>
                    <p>{'Enter your email & password to login'}</p>
                    <FormGroup>
                      <Field
                        name="email"
                        type="email"
                        component={FormikInput}
                        placeholder="Email"
                        label={EmailAddress}
                      />
                    </FormGroup>
                    <FormGroup style={{ position: 'relative' }}>
                      <Field
                        name="password"
                        type={togglePassword ? 'text' : 'password'}
                        component={FormikInput}
                        placeholder="Password"
                        label={Password}
                      />
                      <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}>
                        <span className={togglePassword ? '' : 'show'}></span>
                      </div>
                    </FormGroup>
                    <div className="form-group mb-0">
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                        <Button
                          style={{ width: '100%' }}
                          type="submit"
                          color="primary"
                          className="btn-block"
                        >
                          {SignIn}
                        </Button>
                      </div>
                    </div>
                    <p className="mt-4 mb-0">
                      {"Don't have account? "}
                      <a className="ml-2" href="/register">
                        {CreateAccount}
                      </a>
                    </p>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
