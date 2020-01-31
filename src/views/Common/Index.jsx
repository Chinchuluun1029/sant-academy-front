import React from 'react';

// core components
import IndexNavbar from 'views/Landing/IndexNavbar.jsx';
import PageHeader from 'components/PageHeader.jsx';
import Footer from 'views/Common/Footer.jsx';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// sections for this page/view
// import Basics from "views/IndexSections/Basics.jsx";
// import Navbars from "views/IndexSections/Navbars.jsx";
// import Tabs from "views/IndexSections/Tabs.jsx";
// import Pagination from "views/IndexSections/Pagination.jsx";
// import Notifications from "views/IndexSections/Notifications.jsx";
// import Typography from "views/IndexSections/Typography.jsx";
// import JavaScript from "views/IndexSections/JavaScript.jsx";
// import NucleoIcons from "views/IndexSections/NucleoIcons.jsx";
// import Signup from "views/IndexSections/Signup.jsx";
// import Examples from "views/IndexSections/Examples.jsx";
// import Download from "views/IndexSections/Download.jsx";
// import LandingPage from "./examples/LandingPage";
import CustomLanding from 'views/Landing/CustomLanding';

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle('index-page');
  }
  componentWillUnmount() {
    document.body.classList.toggle('index-page');
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="main">
            <PageHeader />
            <CustomLanding />
            {/* <Basics /> */}
            {/* <LandingPage /> */}
            {/* <Navbars />
            <Tabs />
            <Pagination />
            <Notifications />
            <Typography />
            <JavaScript />
            <NucleoIcons />
            <Signup />
            <Examples />
            <Download /> */}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Index;
