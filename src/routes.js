import Counselors from 'views/Common/Counselors.jsx';
import Dashboard from 'views/Admin/Dashboard.jsx';
import Notifications from 'views/Common/Notifications.jsx';
import UserProfile from 'views/Admin/UserProfile.jsx';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/counselors',
    name: 'Counselors',
    icon: 'tim-icons icon-single-02',
    component: Counselors,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'tim-icons icon-bell-55',
    component: Notifications,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: '',
    icon: '',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/',
    name: '',
    icon: '',
    component: Dashboard,
    layout: '/admin'
  }
];
export default routes;
