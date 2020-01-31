import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import auth from '../../utils/auth';
import history from '../../services/history';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Container,
  Row,
  CardImg,
  Col,
} from 'reactstrap';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    console.log(this.refs.sidebar);
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent',
      user: {},
    };
  }
  componentDidMount() {
    this.setState({user: JSON.parse(auth.getUser())});
    window.addEventListener('scroll', this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: 'bg-info',
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: 'navbar-transparent',
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: 'collapsing-out',
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: '',
    });
  };

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }
  linkOnClick = () => {
    document.documentElement.classList.remove('nav-open');
  };
  render() {
    const {routes} = this.props;
    const {user} = this.state;
    return (
      <div>
        <div style={{marginTop: 140}} />
        <Navbar
          className={'fixed-top ' + this.state.color}
          color-on-scroll="100"
          expand="lg">
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                data-placement="bottom"
                to="/"
                rel="noopener noreferrer"
                title="SANT Academy"
                tag={Link}>
                <CardImg
                  alt="..."
                  top
                  style={{width: 160}}
                  src={require('assets/img/logo_blue_cut.png')}
                />
              </NavbarBrand>
              <button
                aria-expanded={this.state.collapseOpen}
                className="navbar-toggler navbar-toggler"
                onClick={this.toggleCollapse}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Collapse
              className={'justify-content-end ' + this.state.collapseOut}
              navbar
              isOpen={this.state.collapseOpen}
              onExiting={this.onCollapseExiting}
              onExited={this.onCollapseExited}>
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <a href="#sant" onClick={e => e.preventDefault()}>
                      SANT academy
                    </a>
                  </Col>
                  <Col className="collapse-close text-right" xs="6">
                    <button
                      aria-expanded={this.state.collapseOpen}
                      className="navbar-toggler"
                      onClick={this.toggleCollapse}>
                      <i className="tim-icons icon-simple-remove" />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav navbar>
                {routes.map((prop, key) => {
                  if (prop.redirect) return null;
                  return (
                    <li
                      className={
                        this.activeRoute(prop.path) +
                        (prop.pro ? ' active-pro' : '')
                      }
                      key={key}
                      style={{listStyle: 'none'}}>
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active"
                        onClick={this.props.toggleSidebar}
                        style={{marginTop: 15}}>
                        <i style={{color: 'white'}} className={prop.icon} />
                        <h4 style={{fontWeight: 500}}>{prop.name}</h4>
                      </NavLink>
                    </li>
                  );
                })}
                <NavItem
                  tag={Link}
                  to="/user/user-profile"
                  style={{margin: 0, marginTop: 10}}>
                  <Container>
                    <Row>
                      <Col md="4">
                        <img
                          src={require('assets/img/default-avatar.png')}
                          alt="khatna"
                          className="img-fluid rounded-circle"
                          style={{width: '5em', float: 'right'}}
                        />
                      </Col>
                      <Col
                        md="6"
                        style={{display: 'flex', alignContent: 'right'}}>
                        <h4 style={{fontWeight: 500}}>
                          Welcome, <br /> {user.firstName}
                        </h4>
                      </Col>
                      <Col md="2">
                        <Button className="btn-fill" 
                                color="danger" 
                                onClick={() => {
                                  localStorage.removeItem('authToken');
                                  localStorage.removeItem('id');
                                  localStorage.removeItem('user');
                                  history.push(`/`);
                                  window.location.reload();
                                }}>
                          Logout
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: 'primary',
  routes: [{}],
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(['primary', 'blue', 'green']),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
