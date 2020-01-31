import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  NavLink,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import IndexNavbar from 'views/Landing/IndexNavbar.jsx';
import Footer from 'views/Common/Footer.jsx';
import {getLogin} from '../../services';
import history from '../../services/history';

class LoginPage extends React.Component {
  state = {
    squares1to6: '',
    squares7and8: '',
    username: '',
    password: '',
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  error = message => {
    var options = {
      place: 'bc',
      message: <div>{message}</div>,
      type: 'primary',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 5
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleEnterPress = event => {
    if (event.key === 'Enter') {
      console.log('Enter pressed');
      this.submit();
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.classList.toggle('register-page');
    document.documentElement.addEventListener('mousemove', this.followCursor);
    if (this.props.location.state) {
      const {error} = this.props.location.state;
      this.refs.notificationAlert.notificationAlert({
        place: 'bc',
        message: <div>{error}</div>,
        type: 'primary',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 5
      });
    }
  }

  submit() {
    getLogin(this.state.username, this.state.password)
      .then(res => {
        if (res.user.role === 1) {
          history.push(`/admin/dashboard`);
        } else if (res.user.role === 2) {
          // history.push(`/mentor/dashboard`);
        } else if (res.user.role === 3) {
          history.push(`/user/counselors`);
        } else {
          //unknown role
          alert('Unknown Role detected!');
        }
        window.location.reload();
      })
      .catch(err => {
        this.error('🤔 Hmmm, it seems you have the wrong email or password');
      });
  }
  componentWillUnmount() {
    document.body.classList.toggle('register-page');
    document.documentElement.removeEventListener(
      'mousemove',
      this.followCursor,
    );
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
                          Login
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
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
                              placeholder="Email or Username"
                              type="text"
                              onChange={this.handleChange}
                              value={this.state.username}
                              onFocus={e => this.setState({emailFocus: true})}
                              onBlur={e => this.setState({emailFocus: false})}
                              onKeyPress={this.handleEnterPress}
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
                              value={this.state.password}
                              onChange={this.handlePasswordChange}
                              onFocus={e =>
                                this.setState({passwordFocus: true})
                              }
                              onBlur={e =>
                                this.setState({passwordFocus: false})
                              }
                              onKeyPress={this.handleEnterPress}
                            />
                          </InputGroup>
                        </Form>
                        <Button
                          onClick={() => {
                            this.submit();
                          }}
                          className="btn-round"
                          color="primary"
                          size="lg">
                          Enter
                        </Button>
                        {/*TODO: make this a popup modal*/}
                        <NavLink tag={Link} to="/register-page">
                          <Button className="btn-link" color="primary">
                            Forgot your password?{' '}
                            <i className="tim-icons icon-double-right" />
                          </Button>
                        </NavLink>
                        <NavLink tag={Link} to="/register-page">
                          <Button className="btn-link" color="primary">
                            New here? Go to Register{' '}
                            <i className="tim-icons icon-double-right" />
                          </Button>
                        </NavLink>
                      </CardBody>
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
export default LoginPage;
