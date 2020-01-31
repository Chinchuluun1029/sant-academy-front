import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NotificationAlert from 'react-notification-alert';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PulseLoader} from 'react-spinners';
import {css} from '@emotion/core';
import history from '../../services/history';
// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';
import {doAccept, doPayment, getAllOrder} from '../../services';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    document.body.classList.toggle('notifications-page');
    getAllOrder()
      .then(res => {
        this.setState({orders: res.data.data, loading: false});
      })
      .catch(err => {
        alert(err);
      });
  }

  componentWillUnmount() {
    document.body.classList.toggle('notifications-page');
  }

  submit(id) {
    this.setState({loading: true});
    doAccept(id)
      .then(res => {
        toast.success('🤔 Success');
        getAllOrder()
          .then(res => {
            this.setState({orders: res.data.data, loading: false});
          })
          .catch(err => {
            alert(err);
          });
      })
      .catch(err => {
        alert(err);
      });
  }
  payment(id) {
    this.setState({loading: true});
    doPayment(id)
      .then(res => {
        toast.success('🤔 Success');
        getAllOrder()
          .then(res => {
            this.setState({orders: res.data.data, loading: false});
          })
          .catch(err => {
            alert(err);
          });
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const {orders} = this.state;
    return (
      <>
        <div className="content">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />

          <Row>
            <Col style={{paddingLeft: 20}} lg="6" md="12">
              <Card style={{overflowX: 'hidden'}}>
                <CardHeader>
                  <h4>Requests</h4>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>User</th>
                        <th>Counselor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th rowSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            display: this.state.loading ? 'auto' : 'none',
                          }}>
                          <center>
                            <PulseLoader
                              css={override}
                              sizeUnit={'px'}
                              size={20}
                              color={'#fff'}
                              loading={this.state.loading}
                            />
                          </center>
                        </td>
                      </tr>
                      {orders.map((value, index) => {
                        if (value.isPayment == false) {
                          return (
                            <tr>
                              <td>
                                <b>{value.userName}</b>
                              </td>
                              <td>
                                <b>{value.mentorName}</b>
                              </td>
                              <td>{value.Date}</td>
                              <td>{value.Date}</td>
                              <td>
                                {value.isAccept == false ? (
                                  <Button
                                    onClick={() => {
                                      this.submit(value.id);
                                    }}
                                    size="sm"
                                    color="info">
                                    Accept
                                  </Button>
                                ) : (
                                  <Button disabled size="sm" color="success">
                                    Accepted
                                  </Button>
                                )}
                              </td>
                              <td>
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => {
                                    if (value.isAccept == true) {
                                      this.payment(value.id);
                                    } else {
                                      alert(
                                        'Please wait until the chosen counselor accepts',
                                      );
                                    }
                                  }}>
                                  Payment
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <h4>Upcoming Counselling Sessions</h4>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>User</th>
                        <th>Mentor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colspan="4"
                          style={{
                            display: this.state.loading ? 'auto' : 'none',
                          }}>
                          <center>
                            <PulseLoader
                              css={override}
                              sizeUnit={'px'}
                              size={20}
                              color={'#fff'}
                              loading={this.state.loading}
                            />
                          </center>
                        </td>
                      </tr>
                      {orders.map((value, index) => {
                        if (value.isAccept == true && value.isPayment == true) {
                          return (
                            <tr>
                              <td>
                                <b>{value.userName}</b>
                              </td>
                              <td>
                                <b>{value.mentorName}</b>
                              </td>
                              <td>{value.Date}</td>
                              <td>{value.Date}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    history.push(`/chat/${value.user_id}`);
                                    window.location.reload();
                                  }}
                                  className="btn-round btn-icon"
                                  color="success">
                                  <i className="tim-icons icon-email-85" />
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default Notifications;
