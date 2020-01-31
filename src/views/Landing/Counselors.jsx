import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import {
  Card,
  CardImg,
  CardHeader,
  CardBody,
  Container,
  Button,
  Row,
  Col,
} from 'reactstrap';

import { getAllMentor } from '../../services';
import 'react-datepicker/dist/react-datepicker.css';
import IndexNavbar from './IndexNavbar';
import Footer from 'views/Common/Footer.jsx';

const counselors = [
  {
    firstName: 'Anarsaikhan',
    lastName: 'Tuvshinjargal',
    title: 'Junior at Swarthmore College',
    description: 'College Application Process, Cognitive Science',
    img: 'anar.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Khatanbuuvei',
    lastName: 'Bold',
    title: 'Junior at Princeton University',
    description: 'Computer Science, Standardised Tests',
    img: 'khatna.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Chinchuluun',
    lastName: 'Munkh-Achit',
    title: 'Sophomore at Vanderbilt University',
    description: 'Computer Science, Internships',
    img: 'chuka.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Uguudei',
    lastName: 'Bayaraa',
    title: 'Sophomore at Univeristy of Chicago',
    description: 'Economics, Application as a Whole',
    img: 'uguudei.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Javkhlan',
    lastName: 'Amgaa',
    title: 'Freshman at Harvard University',
    description: 'Learning English, Standardized Tests, Writing Essays',
    img: 'javhaa.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Narangarav',
    lastName: 'Enkhtaivan',
    title: 'Sophomore at Swarthmore College',
    description: 'Essays, Extracurriculars',
    img: 'nara.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Uranchimeg',
    lastName: 'Zamindii',
    title: 'Junior at École Polytechnique',
    description: 'European Colleges, Choosing Your Major',
    img: 'urnaa.jpg',
    schoolLink: '',
  },
  {
    firstName: 'Tuguldur',
    lastName: 'Batdavaa',
    title: 'Sophomore at Columbia University',
    description: 'Physics, Critical Thinking',
    img: 'tuuguu.jpg',
  },
];

// const datepickerStyle = {};

class Counselors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: counselors, // need to pull this from database
    };
  }
  componentDidMount() {
    document.body.classList.toggle('counselors-page');
    //   getAllMentor()
    //     .then(res => {
    //       this.setState({mentors: res.data});
    //     })
  }
  componentWillUnmount() {
    document.body.classList.toggle('counselors-page');
  }

  render() {
    const { mentors } = this.state;
    return (
      <>
        <IndexNavbar />
        <div className="wrapper" style={{ marginTop: '10%' }}>
          <div className="content">

            <Container>
              <Row>
                <h1>Meet the Counselors</h1>
              </Row>
              <Row>
                {mentors.map((el, i) => (
                  <Col md="4" xs="12" key={i}>
                    <Card>
                      <CardImg
                        alt="..."
                        top
                        src={require(`assets/img/team/${el.img}`)}
                      />
                      <CardHeader>
                        <h2 style={{ marginBottom: 10 }}>
                          {el.firstName} {el.lastName}
                        </h2>
                        <p>{el.title}</p>
                      </CardHeader>
                      <CardBody>
                        <h4>
                          Ask me about:{' '}
                          <span style={{ fontWeight: 300 }}>
                            <ul>
                              {el.description.split(',').map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          </span>
                        </h4>
                        <Link to={{ pathname: '/login-page', state: { error: 'Please login first.' } }}>
                          <Button block color="primary">
                            Request
                          </Button>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <div className="register-bg" />
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Counselors;
