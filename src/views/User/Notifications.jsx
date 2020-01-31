import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NotificationAlert from 'react-notification-alert';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PulseLoader} from 'react-spinners';
import {css} from '@emotion/core';

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Badge,
  Table,
  Row,
  Col,
} from 'reactstrap';
import auth from '../../utils/auth';
import {doAccept, getAllOrder} from '../../services';
import history from '../../services/history';
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
      user: {},
      loading: true,
    };
  }
  componentDidMount() {
    document.body.classList.toggle('notifications-page');
    this.setState({user: JSON.parse(auth.getUser())});
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
    doAccept(id)
      .then(res => {
        toast.success('🤔 Success');
        getAllOrder()
          .then(res => {
            this.setState({orders: res.data});
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
    const {user, orders} = this.state;
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
            <Col lg="12" md="12">
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
                        <th>Time</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={{display: this.state.loading ? 'auto' : 'none'}}>
                        <td colSpan="5">
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
                        if (parseInt(value.user_id) === parseInt(user.id)) {
                          return (
                            <tr>
                              <td>
                                <b>{value.userName}</b>
                              </td>
                              <td>
                                <b>{value.mentorName}</b>
                              </td>
                              <td>{value.Date}</td>
                              <td>
                                {value.isAccept === true ? (
                                  <Badge color="success">Accepted</Badge>
                                ) : (
                                  <Badge color="info">Pending</Badge>
                                )}
                              </td>
                              <td>
                                {value.isPayment === true ? (
                                  <Badge color="warning">Paid</Badge>
                                ) : (
                                  <Badge color="danger">Not Paid</Badge>
                                )}
                              </td>
                              <td>
                                {value.isPayment === true &&
                                value.isAccept === true ? (
                                  <Button
                                    onClick={() => {
                                      history.push(`/chat/${value.mentor_id}`);
                                      window.location.reload();
                                    }}
                                    className="btn-round btn-icon"
                                    color="success">
                                    <i className="tim-icons icon-email-85" />
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn-round btn-icon"
                                    color="primary"
                                    disabled>
                                    <i className="tim-icons icon-email-85" />
                                  </Button>
                                )}
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
