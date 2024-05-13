import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './routes/about-us/about-us.component';
import { AdminComponent } from './routes/admin/admin.component';
import { BookingsComponent } from './routes/admin/bookings/bookings.component';
import { ClassesComponent } from './routes/admin/classes/classes.component';
import { UsersComponent } from './routes/admin/users/users.component';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { ScheduleComponent } from './routes/schedule/schedule.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomepageComponent,
    data: {
      showInNav: true,
      icon: 'home',
    },
  },
  {
    path: 'about-us',
    title: 'About Us',
    component: AboutUsComponent,
    data: {
      showInNav: true,
      icon: 'sports_gymnastics',
    },
  },
  {
    path: 'profile',
    title: 'My Profile',
    component: ProfileComponent,
    data: {
      showInNav: true,
      icon: 'person',
    },
  },
  {
    path: 'admin',
    title: 'Admin',
    data: {
      showInNav: true,
      icon: 'apps',
    },
    children: [
      { path: '', component: AdminComponent },
      {
        path: 'users',
        title: 'Manage Users',
        component: UsersComponent,
        data: {
          showInNav: true,
          icon: 'profile',
        },
      },
      {
        path: 'classes',
        title: 'Manage Classes',
        component: ClassesComponent,
        data: {
          showInNav: true,
          icon: 'profile',
        },
      },
      {
        path: 'bookings',
        title: 'Manage Bookings',
        component: BookingsComponent,
        data: {
          showInNav: true,
          icon: '',
        },
      },
    ],
  },
  {
    path: 'schedule',
    title: 'Schedule',
    component: ScheduleComponent,
    data: {
      showInNav: true,
      icon: 'calendar_month',
    },
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  { path: '**', redirectTo: '/not-found' },
];
