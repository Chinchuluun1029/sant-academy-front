import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Card,
  CardImg,
  CardHeader,
  CardBody,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from 'reactstrap';

import {addOrder, getAllMentor, getAllTime} from '../../services';
import auth from '../../utils/auth';
import 'react-datepicker/dist/react-datepicker.css';

const customSelect = {
  backgroundColor: 'transparent',
  padding: '10px',
  border: '1px solid #000',
};

// const counselors = [
//   {
//     firstName: 'Khatanbuuvei',
//     lastName: 'Bold',
//     title: 'Junior at Princeton University',
//     description: 'Computer Science, Standardised Tests',
//     img: 'khatna.jpg',
//   },
//   {
//     firstName: 'Anarsaikhan',
//     lastName: 'Tuvshinjargal',
//     title: 'Junior at Swarthmore College',
//     description: 'College Application Process, Fencing',
//     img: 'anar.jpg',
//   },
//   {
//     firstName: 'Chuka',
//     lastName: 'Munkh-Achit',
//     title: 'Sophomore at Vanderbilt University',
//     description: 'Computer Science, Internships',
//     img: 'chuka.jpg',
//   },
//   {
//     firstName: 'Uguudei',
//     lastName: 'Bayaraa',
//     title: 'Sophomore at the Univeristy of Chicago',
//     description: '...',
//     img: 'anar.jpg',
//   },
//   {
//     firstName: 'Javhlan',
//     lastName: 'Amgaa',
//     title: 'Freshman at Harvard University',
//     description: '...',
//     img: 'javhaa.jpg',
//   },
// ];

// const datepickerStyle = {};

class Counselors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal1: false,
      mentors: [],
      user: {},
      time_id: '',
      el: {},
      timeTable: [],
      selectedMentor: '',
      description:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.success = this.success.bind(this);
  }

  componentDidMount() {
    this.setState({user: JSON.parse(auth.getUser())});
    getAllMentor()
      .then(res => {
        this.setState({mentors: res.data});
      })
      .catch(err => {
        alert(err);
      });

    getAllTime()
      .then(res => {
        this.setState({timeTable: res.data});
      })
      .catch(err => {
        alert(err);
      });

    document.body.classList.toggle('counselors-page');
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
  componentWillUnmount() {
    document.body.classList.toggle('counselors-page');
  }

  handleChange(event) {
    this.setState({
      time_id: event.target.value,
    });
  }
  
  handleChangeDesc(event) {
    this.setState({
      description: event.target.value,
    });
  }
  toggle(value) {
    this.setState(prevState => ({
      el: value,
      modal: !prevState.modal,
    }));
  }

  submit(mentor_id) {
    if(this.state.time_id !== ''){
      addOrder({
        mentor_id,
        description:this.state.description,
        time_id: this.state.time_id,
      })
        .then(res => {
          this.setState(prevState => ({
            modal: !prevState.modal,
            modal1: true,
          }));
        })
        .catch(err => {
          alert(err);
        });
    }
    else{
      this.error('🤔  Select time');
    }
    
  }

  toggle2() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  success() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modal1: true,
    }));
  }

  toggle1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1,
    }));
  }
  renderDaily() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle2}
        className={this.props.className}>
        <ModalHeader toggle={this.toggle2}>
          Talk with{' '}
          {Object.keys(this.state.el).length > 0
            ? this.state.el.user.firstName
            : 'Mentor'}
        </ModalHeader>
        <ModalBody>
          Name: {this.state.user.firstName}
          <br />
          Let's talk about:{' '}
          <select  style={customSelect} onChange={this.handleChange}>
            {this.state.mentors.map(mentor =>
              mentor.description
                .split(',')
                .map(description => (
                  <option value={description}>{description}</option>
                )),
            )}
            <option value="other">Other</option>
          </select>
          <br />
          Choose your time:
          <div className="datepicker-container">
            <select style={customSelect} onChange={this.handleChange}>
            <option selected="selected" value="Сонгох" disabled>Сонгох</option>
              {this.state.timeTable.map((item, index) =>
                parseInt(item.user_id) === parseInt(this.state.el.user_id) ? (
                  <option style={{color: '#000'}} key={item.id} value={item.id}>
                    {item.date}
                  </option>
                ) : null,
              )}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.submit(this.state.el.user.id);
            }}>
            Send Request
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle2}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    const {user, mentors, timeTable} = this.state;
    return (
      <>
        <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
          <Container>
            
            <Row>
              {mentors.map((el, i) => (
                <Col md="4" xs="12" key={i}>
                  <Card>
                    <CardImg
                      alt="..."
                      top
                      src={'http://167.71.223.162:4000' + el.avatar} 
                    />
                    <CardHeader>
                      <h2 style={{marginBottom: 10}}>
                        {el.user.firstName} {el.user.lastName}
                      </h2>
                      <p>{el.title}</p>
                    </CardHeader>
                    <CardBody>
                      <Modal
                        isOpen={this.state.modal1}
                        toggle={this.toggle1}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle1}>
                          Congratulations! Your talk session is requested.
                        </ModalHeader>
                        <ModalBody>
                          <img
                            src="https://www.sclance.com/pngs/success-png/success_png_1327906.png"
                            alt="new"
                          />
                          <center>Please check your e-mail for further details</center>
                        </ModalBody>
                      </Modal>
                      <h4>
                        Ask me about:{' '}
                        <span style={{fontWeight: 300}}>
                          <ul>
                            {el.description.split(',').map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </span>
                      </h4>
                      {user.role !== 1 ? (
                        <Button
                          block
                          color="primary"
                          onClick={() => {
                            this.toggle(el);
                          }}>
                          Request
                        </Button>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          {this.renderDaily()}
        </div>
      </>
    );
  }
}

export default Counselors;
