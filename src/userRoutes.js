import Counselors from 'views/Common/Counselors.jsx';
import Notifications from 'views/User/Notifications.jsx';
import UserProfile from 'views/User/UserProfile.jsx';

var userRoutes = [
  {
    path: '/counselors',
    name: 'Counselors',
    icon: 'tim-icons icon-single-02',
    component: Counselors,
    layout: '/user',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'tim-icons icon-bell-55',
    component: Notifications,
    layout: '/user',
  },
  {
    path: '/user-profile',
    name: '',
    icon: '',
    component: UserProfile,
    layout: '/user',
  },
  {
    path: '/',
    name: '',
    icon: '',
    component: Counselors,
    layout: '/user'
  }
];
export default userRoutes;
