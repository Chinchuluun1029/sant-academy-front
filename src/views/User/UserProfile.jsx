import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import auth from '../../utils/auth';
import {getUpdateUser} from '../../services'

class UserProfile extends React.Component {
  state = JSON.parse(auth.getUser());
  orig = JSON.parse(auth.getUser());

  handleChange = (key, event) => {
    this.state[key] = event.target.value;
    this.setState(this.state);
  }

  submit = () => {
    const body = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    }

    getUpdateUser(body).then(res => {
      this.refs.notificationAlert.notificationAlert({
        place: 'bc',
        message: <div>Successfully updated!</div>,
        type: 'info',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 5
      });
    });
  }

  render() {
    return (
      <>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Row style={{padding: 10}}>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row style={{padding: '0 10px'}}>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={this.state.firstName}
                            placeholder="First Name"
                            type="text"
                            onChange={e => this.handleChange('firstName', e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={this.state.lastName}
                            placeholder="Last Name"
                            type="text"
                            onChange={e => this.handleChange('lastName', e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={this.state.userName}
                            placeholder="Username"
                            type="text"
                            onChange={e => this.handleChange('userName', e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            defaultValue={this.state.email}
                            placeholder="Email"
                            type="text"
                            onChange={e => this.handleChange('email', e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="3">
                        <FormGroup>
                          <label>
                            Phone Number
                          </label>
                          <Input
                            defaultValue={this.state.phoneNumber}
                            type="number"
                            onChange={e => this.handleChange('phoneNumber', e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.submit} className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/default-avatar.png")}
                      />
                      <h5 className="title">{this.orig.firstName} {this.orig.lastName}</h5>
                    </a>
                    <p className="description">Student</p>
                  </div>
                </CardBody>
                {/* <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
