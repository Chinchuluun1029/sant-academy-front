import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import Footer from 'views/Common/Footer.jsx';
import Sidebar from 'views/Admin/Sidebar.jsx';
import routes from '../../routes.js';
import {getUsers} from '../../services';
import auth from '../../utils/auth';
var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1,
      users: []
    };
  }

  componentDidMount() {
    console.log(this.refs);
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(this.refs.mainPanel, {suppressScrollX: true});
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.documentElement.className += ' perfect-scrollbar-off';
      document.documentElement.classList.remove('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      if (navigator.platform.indexOf('Win') > -1) {
        let tables = document.querySelectorAll('.table-responsive');
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
    document.documentElement.classList.toggle('nav-open');
    this.setState({sidebarOpened: !this.state.sidebarOpened});
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
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
    this.setState({backgroundColor: color});
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path,
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  render() {
    if (!auth.loggedIn()) {
      return (
        <div ref="mainPanel">
          <Redirect to={{
            pathname: '/login-page',
            state: { error: 'Please login first.' }
          }} />
        </div>
      );
    } else if (auth.getId() != 1) {
      return (
        <div ref="mainPanel" style={{
          textAlign: 'center',
          paddingTop: '10%'
        }}>
          <h1>You are not authorized to view this page.</h1>
        </div>
      );
    }
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: 'https://www.creative-tim.com/',
              text: 'Creative Tim',
              imgSrc: null,
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}>
            <Switch>{this.getRoutes(routes)}</Switch>
            {// we don't want the Footer to be rendered on map page
            this.props.location.pathname.indexOf('maps') !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
