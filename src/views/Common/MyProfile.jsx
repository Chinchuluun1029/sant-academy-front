import React from "react";

// core components
import IndexNavbar from "views/Landing/IndexNavbar.jsx";
import Footer from "views/Common/Footer.jsx";

import { Route } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import routes from "routes.js";

// reactstrap components
import {
    Button,
    Container,
    Row,
    Col
  } from "reactstrap";

var ps;

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    // toggleSidebar = () => {
    //   document.documentElement.classList.toggle("nav-open");
    //   this.setState({ sidebarOpened: !this.state.sidebarOpened });
    // };
    return (
      <>
        <IndexNavbar />
        {/* <Sidebar 
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://www.creative-tim.com/",
              text: "Creative Tim",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          /> */}
        <div className="wrapper">
          <div className="page-header">
            <div className="content" style={{backgroundColor: 'primary'}}>
              <Container>
                <div className="profile-bg"  style={{backgroundImage:require("assets/img/orange_bg.jpg")}}></div>
                <Row>
                  <Col md='12' lg='6'>
                    <img 
                      src={require("assets/img/team/khatna.jpg")} 
                      alt="khatna"
                      className="img-fluid rounded-circle"
                      style={{width:'5em', float:'left'}}  
                    />
                    <strong>Khatanbuuvei Bold</strong>
                    <p>@khatna</p>
                  </Col>
                  <Col md='12' lg='6'>
                    <Button className="btn-sm">Edit your profile</Button>
                  </Col>
                </Row>
              </Container>
              <Container>
                {/* Something goes here */}
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default MyProfile;
