import React from 'react';
import {Link} from 'react-router-dom';
import auth from '../../utils/auth';
// reactstrap components
import {
  Collapse,
  CardImg,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent',
    };
  }
  componentDidMount() {
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
  render() {
    return (
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
              alt="Sant Academy Logo"
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
              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Menu
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem tag={Link} to="/register-page">
                    <i className="tim-icons icon-bullet-list-67" />
                    Register Page
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/landing-page">
                    <i className="tim-icons icon-image-02" />
                    Landing Page
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/profile-page">
                    <i className="tim-icons icon-single-02" />
                    Profile Page
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                  */}
              { auth.loggedIn() ? <>

                <NavItem>
                  <NavLink tag={Link} to="/profile">
                    Welcome, {" " + JSON.parse(auth.getUser()).firstName}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/counselors">
                    <span style={{fontWeight: 700, fontSize: '1.2em'}}>
                      NOVA
                    </span>
                  </NavLink>
                </NavItem>

              </> : <>

                <NavItem>
                  <NavLink tag={Link} to="/register-page">
                    <i className="tim-icons icon-bullet-list-67" /> Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/login-page">
                    <i className="tim-icons icon-world" /> Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/counselors">
                    <span style={{fontWeight: 700, fontSize: '1.2em'}}>
                      NOVA
                    </span>
                  </NavLink>
                </NavItem>

              </>}

              {/*<NavItem>
                <NavLink tag={Link} to="/login-page">
                  <span style={{fontWeight: 500}}>EN/MN </span>
                </NavLink>
              </NavItem>
                */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ComponentsNavbar;
