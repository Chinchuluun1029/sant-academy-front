import React from "react";
import {Link} from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col
} from "reactstrap";

const team = [
  {
  "name": "Enkhmunkh Zurgaanjin",
  "schoolName": "MIT, Stanford University",
  "role": "Co-Founder, Advisor",
  "imageName": "enkhmunkh.jpg",
  },
  {
    "name": "Batja Altangerel",
    "schoolName": "",
    "role": "Co-Founder, Advisor",
    "imageName": "batja.jpg",
  },
  {
    "name": "Anar Tuvshinjargal",
    "schoolName": "Swarthmore College",
    "role": "Co-Founder, Manager, Instructor",
    "imageName": "anar.jpg",
  },
  {
  "name": "Tuguldur Batdavaa",
  "schoolName": "Columbia University",
  "role": "Founding Member, Manager, Instructor",
  "imageName": "tuuguu.jpg",
  },

  {
    "name": "Khatanbuuvei Bold",
    "schoolName": "Princeton University",
    "role": "Founding Member, Back-End Developer, Instructor",
    "imageName": "khatna.jpg",
  },
  {
    "name": "Chuka Munkh-Achit",
    "schoolName": "Vanderbilt University",
    "role": "Founding Member, Front-End Developer, Instructor",
    "imageName": "chuka.jpg",
  }, 
  {
    "name": "Misheel Batkhuyag",
    "schoolName": "Ewha Womans University",
    "role": "Instructor, Designer",
    "imageName": "misheel.jpg",
  }
]

class CustomLanding extends React.Component {
    render() {
      return (
      <div>
        <section className="section section-lg">
            <Container>
            <Row className="row-grid justify-content-between">
            <Col className="mt-lg-5" md="5">
                <Row>
                  <Col className="px-2 py-2" lg="6" sm="12">
                      <Card className="card-stats">
                      <CardBody>
                          <Row>
                          <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                              <i className="tim-icons icon-single-02 text-info" />
                              </div>
                          </Col>
                          <Col md="8" xs="7">
                              <div className="numbers">
                              <CardTitle tag="p">7+</CardTitle>
                              <p />
                              <p className="card-category">Counselors</p>
                              </div>
                          </Col>
                          </Row>
                      </CardBody>
                      </Card>
                  </Col>
                <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats upper bg-default">
                    <CardBody>
                        <Row>
                        <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                            <i className="tim-icons icon-satisfied text-white" />
                            </div>
                        </Col>
                        <Col md="8" xs="7">
                            <div className="numbers">
                            <CardTitle tag="p">200</CardTitle>
                            <p />
                            <p className="card-category">Students Reached</p>
                            </div>
                        </Col>
                        </Row>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
                <Row>
                <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats">
                    <CardBody>
                        <Row>
                        <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                            <i className="tim-icons icon-watch-time text-warning" />
                            </div>
                        </Col>
                        <Col md="8" xs="7">
                            <div className="numbers">
                            <CardTitle tag="p">2,370</CardTitle>
                            <p />
                            <p className="card-category">Counselling Hours</p>
                            </div>
                        </Col>
                        </Row>
                    </CardBody>
                    </Card>
                </Col>
                <Col className="px-2 py-2" lg="6" sm="12">
                    <Card className="card-stats">
                    <CardBody>
                        <Row>
                        <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                            <i className="tim-icons icon-spaceship text-success" />
                            </div>
                        </Col>
                        <Col md="8" xs="7">
                            <div className="numbers">
                            <CardTitle tag="p">&#x221e;</CardTitle>
                            <p />
                            <p className="card-category">Opportunities Available</p>
                            </div>
                        </Col>
                        </Row>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                <h1 style={{color:'white'}}>
                    Platform <strong>NOVA</strong>
                </h1>
                <p className="bigger-p">
                    NOVA is a centralized counseling platform that allows users to 
                    easily request talk sessions with individuals who are willing to
                    share their own experiences and offer personalized advice.
                </p>
                <br />
                <p className="bigger-p">
                    No longer are the days where we have to muster up the courage to
                    contact someone on social media for advice, unsure of whether they
                    will respond, let alone see our request.  
                </p>
                <br />
                <Link className="font-weight-bold text-primary mt-5" to='/register-page'>
                    Get started{" "}
                    <i className="tim-icons icon-minimal-right text-primary" />
                </Link>
                </div>
              </Col>
            </Row>
          </Container> 
        </section>

        <section className="section section-md">
          <div className="wrapper">
              <img
                alt="..."
                className="path"
                src={require("assets/img/path5.png")}
              />
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <h1 className="text-center">Why choose <strong>NOVA</strong>?</h1>
                    <Row className="row-grid justify-content-center">
                      <Col lg="3">
                        <div className="info" style={{paddingTop: 60}}>
                          <div className="icon icon-warning">
                            <i className="tim-icons icon-world" />
                          </div>
                          <h4 className="info-title">Anywhere, Anytime</h4>
                          <hr className="line-warning" />
                          <p className="bigger-p">
                            Whether you're <strong>at home or on the bus</strong>,
                            you can connect with NOVA <strong>online - whenever and wherever</strong>.
                            You take care of the Internet, we'll cover the rest.
                          </p>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div className="info" style={{paddingTop: 60}}>
                          <div className="icon icon-success">
                            <i className="tim-icons icon-single-02" />
                          </div>
                          <h4 className="info-title">One-on-One</h4>
                          <hr className="line-success" />
                          <p className="bigger-p">
                            To <strong>maximise time and attention</strong> dedicated to students, our counselors meet <strong>in private</strong> and 
                            <strong> focus on each session</strong> like no other. 
                          </p>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div className="info" style={{paddingTop: 60}}>
                          <div className="icon icon-info">
                            <i className="tim-icons icon-money-coins" />
                          </div>
                          <h4 className="info-title">Dynamic Pricing</h4>
                          <hr className="line-info" />
                          <p className="bigger-p">
                            Our <strong>counselors' performance</strong> is our top priority. 
                            To ensure that counselors bring their <strong>A-game</strong>, 
                            we compensate their excellence 
                            with <strong>adaptive rewards</strong>.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              </div>
              
            </section>

          {/* <section className="section section-md">

            <h1 className="text-center">Past Program Remarks</h1>
            <Container>
              <Row>
                <Col>
                  <blockquote className="blockquote text-center">
                    <p className="mb-0">Chuka bagsh cute.</p>
                    <footer className="blockquote-footer">Anaraa , <cite title="Source Title">2019</cite></footer>
                  </blockquote>
                </Col>
                <Col>
                  <blockquote className="blockquote text-center">
                    <p className="mb-0">Chuka bagsh cute.</p>
                    <footer className="blockquote-footer">Anaraa , <cite title="Source Title">2019</cite></footer>
                  </blockquote>
                </Col>
              </Row>
              
            </Container>
          </section> */}
          
        <section className="section section-lg">
          <div className="wrapper">
              {/* <img
                alt="..."
                className="path"
                src={require("assets/img/blob.png")}
                
              /> */}
              <Container>
                <Row>
                  <Col md="4">
                    <hr className="line-primary" />
                    <h1>
                      Meet the{" "}<span className="text-primary">Team</span>{" "}
                    </h1>
                  </Col>
                </Row>

                <Row>
                  {team.map(profile => 
                    (<Col md="3" xs="6">
                      <img 
                        alt="..."
                        className="img-fluid rounded shadow-lg"
                        src={require("assets/img/team/" + profile.imageName)}
                        style={{ width: "240px", marginBottom: "20px" }}
                      />
                      <h5 className="d-block text-uppercase font-weight-bold mb-6">
                        <h4 className="d-block text-uppercase font-weight-bold mb-6" style={{marginBottom: 0}}>{profile.name}</h4>
                        <span style={{fontWeight: 300}}>
                          {profile.role}
                        </span>
                        <br />
                        <span style={{fontWeight: 500}}>
                          {profile.schoolName}
                        </span>
                      </h5>
                    </Col>))}
                </Row>
              </Container>
            </div>
        </section>
      </div>);
    }
}

export default CustomLanding;