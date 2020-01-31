import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { 
  Nav,
  NavbarBrand, 
  NavItem,
  Container,
  Row,
  CardImg,
  Col, 
} from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    console.log(this.refs.sidebar)
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    const { routes } = this.props;
    return (
      <Nav className="ml-auto" style={{margin: '20px 0'}}>
        <NavbarBrand
          data-placement="bottom"
          to="/"
          rel="noopener noreferrer"
          title="SANT Academy"
          tag={Link}
          style={{marginLeft: 100, marginRight: 80}}
        >
          <CardImg
            alt="..."
            top
            style={{width: 160}}
            src={require("assets/img/logo_blue_cut.png")}
          />
        </NavbarBrand>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          return (
            <li
              className={
                this.activeRoute(prop.path) +
                (prop.pro ? " active-pro" : "")
              }
              key={key}
            >
              <NavLink
                to={prop.layout + prop.path}
                className="nav-link"
                activeClassName="active"
                onClick={this.props.toggleSidebar}
              >
                <i style={{color: 'white'}} className={prop.icon} />
                <h4 style={{fontWeight: 500}}>{prop.name}</h4>
              </NavLink>
            </li>
          );
        })}
        <NavItem>
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col lg="4">
                <img 
                  src={require("assets/img/team/khatna.jpg")} 
                  alt="khatna"
                  className="img-fluid rounded-circle"
                  style={{width:'5em', float: 'right'}}  
                />
              </Col>
              <Col lg="6" style={{display: 'flex', alignContent: 'right'}}>
                <h4 style={{fontWeight: 700}}>Khatanbuuvei Bold <br /> <span style={{fontWeight: 300}}>@khatna</span></h4>
              </Col>
            </Row>
          </Container>
        </NavItem>
        <NavItem>
        </NavItem>
      </Nav>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
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
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
