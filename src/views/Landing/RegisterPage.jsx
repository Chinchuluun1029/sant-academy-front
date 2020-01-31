import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavLink,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import IndexNavbar from 'views/Landing/IndexNavbar.jsx';
import Footer from 'views/Common/Footer.jsx';
import {getSignup, validateEmail} from '../../services';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      squares1to6: '',
      squares7and8: '',
      dropdownOpen: false,
    };
  }

  notify = (message, isVerify=false) => {
    var options = {
      place: 'bc',
      message: <div>{message}</div>,
      type: isVerify ? 'info' : 'primary',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.classList.toggle('register-page');
    document.documentElement.addEventListener('mousemove', this.followCursor);
  }

  componentWillUnmount() {
    document.body.classList.toggle('register-page');
    document.documentElement.removeEventListener(
      'mousemove',
      this.followCursor,
    );
  }

  handleChange(key, event) {
    this.state[key] = event.target.value;
    this.setState(this.state);
  }

  submit() {
    const state = this.state;

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.password
    ) {
      this.notify('Please complete all required fields.');
      return;
    }

    if (state.password !== state.confirm) {
      this.notify('Passwords do not match. Please try again.');
      return;
    }

    if (!validateEmail(state.email)) {
      this.notify('Please enter a valid email address.');
      return;
    }

    const credentials = {
      phoneNumber: state.phoneNumber,
      firstName: state.firstName,
      lastName: state.lastName,
      userName: state.username,
      email: state.email,
      password: state.password,
      con_password: state.password,
      role: 3,
    };

    getSignup(credentials).then(res => {
      this.notify("Please go verify your email.", true);
    });
  }

  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)',
      squares7and8:
        'perspective(500px) rotateY(' +
        posX * 0.02 +
        'deg) rotateX(' +
        posY * -0.02 +
        'deg)',
    });
  };
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{transform: this.state.squares7and8}}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{transform: this.state.squares7and8}}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require('assets/img/orange_bg.jpg')}
                        />
                        <CardTitle
                          tag="h4"
                          style={{color: 'secondary', paddingLeft: 10}}>
                          Register
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.firstNameFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              type="text"
                              onFocus={e =>
                                this.setState({firstNameFocus: true})
                              }
                              onBlur={e =>
                                this.setState({firstNameFocus: false})
                              }
                              onChange={e => this.handleChange('firstName', e)}
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.lastNameFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name"
                              type="text"
                              onFocus={e =>
                                this.setState({lastNameFocus: true})
                              }
                              onBlur={e =>
                                this.setState({lastNameFocus: false})
                              }
                              onChange={e => this.handleChange('lastName', e)}
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.usernameFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-atom" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Username"
                              type="text"
                              onFocus={e =>
                                this.setState({usernameFocus: true})
                              }
                              onBlur={e =>
                                this.setState({usernameFocus: false})
                              }
                              onChange={e => this.handleChange('username', e)}
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.emailFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              onFocus={e => this.setState({emailFocus: true})}
                              onBlur={e => this.setState({emailFocus: false})}
                              onChange={e => this.handleChange('email', e)}
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.phoneFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-atom" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Phone Number"
                              type="number"
                              onFocus={e => this.setState({phoneFocus: true})}
                              onBlur={e => this.setState({phoneFocus: false})}
                              onChange={e =>
                                this.handleChange('phoneNumber', e)
                              }
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.passwordFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              onFocus={e =>
                                this.setState({passwordFocus: true})
                              }
                              onBlur={e =>
                                this.setState({passwordFocus: false})
                              }
                              onChange={e => this.handleChange('password', e)}
                            />
                          </InputGroup>

                          <InputGroup
                            className={classnames({
                              'input-group-focus': this.state.confirmFocus,
                            })}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-key-25" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirm Password"
                              type="password"
                              onFocus={e => this.setState({confirmFocus: true})}
                              onBlur={e => this.setState({confirmFocus: false})}
                              onChange={e => this.handleChange('confirm', e)}
                            />
                          </InputGroup>
                        </Form>
                      </CardBody>
                      <CardFooter
                        style={{
                          paddingTop: 0,
                          marginTop: 0,
                        }}>
                        <Button
                          onClick={() => {
                            this.submit();
                          }}
                          className="btn-round"
                          color="primary"
                          size="lg">
                          Get Started
                        </Button>

                        <NavLink tag={Link} to="/login-page">
                          <Button className="btn-link" color="primary">
                            Already a user? Login here{' '}
                            <i className="tim-icons icon-double-right" />
                          </Button>
                        </NavLink>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{transform: this.state.squares1to6}}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{transform: this.state.squares1to6}}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{transform: this.state.squares1to6}}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{transform: this.state.squares1to6}}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{transform: this.state.squares1to6}}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{transform: this.state.squares1to6}}
                />
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default RegisterPage;
