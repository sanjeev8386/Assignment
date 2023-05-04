import React, { useState } from 'react';
import { Container, Row, Col, FormGroup, Button, Label, Input } from 'reactstrap';
import { Password, SignIn, EmailAddress, YourName } from '../../constant';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { asyncWrap } from '../../utils/utils';
import { toast, ToastContainer } from 'react-toastify';
import FormikInput from '../../components/FormikInput/FormikInput';
import { useNavigate } from 'react-router-dom';

const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/;

const signupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().min(4).required(),
  password: Yup.string()
    .matches(
      passwordValidation,
      'Password should contain, Lowercase letters, numbers, special characters and should be 6 char long!'
    )
    .required()
});

const Register = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  const submit = async (values) => {
    const [err, res] = await asyncWrap(
      axios.post('/signup', {
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
    if (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } else {
      toast.success(res.data.message);
      navigate('/login');
    }
  };

  return (
    <Container fluid={true} className="p-0">
      <ToastContainer />
      <Row className="m-0">
        <Col xs="12">
          <div className="login-card">
            <div>
              {/* <div>
                <a className="logo">
                  <img
                    className="img-fluid for-light"
                    src="../../assets/images/logo/login.png"
                    alt="looginpage"
                  />
                  <img
                    className="img-fluid for-dark"
                    src="../../assets/images/logo/logo_dark.png"
                    alt="looginpage"
                  />
                </a>
              </div> */}
              <div className="login-main">
                <Formik
                  initialValues={{
                    email: '',
                    mobile: '',
                    name: '',
                    password: ''
                  }}
                  onSubmit={submit}
                  validationSchema={signupSchema}
                >
                  <Form className="theme-form">
                    <h4>{'Create your account'}</h4>
                    <p>{'Enter your personal details to create account'}</p>
                    <FormGroup>
                      <Field
                        name="name"
                        type="text"
                        component={FormikInput}
                        placeholder="Your name"
                        label={YourName}
                      />
                    </FormGroup>
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
                        placeholder="******"
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
                          Create Account
                        </Button>
                      </div>
                    </div>
                    <p className="mt-4 mb-0">
                      {'Already have an account? '}
                      <a className="ml-2" href="/login">
                        {SignIn}
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

export default Register;
