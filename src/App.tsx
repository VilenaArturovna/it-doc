import React from 'react';
import './App.css';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { MainPage, PlugPage } from './pages';
import { LoginPage } from './pages/LoginPage/LoginPage';
import {
  Clients,
  Deadlines,
  EditProvider,
  EditStaff,
  EditTask,
  NewClient,
  NewProvider,
  NewStaff,
  NewTask,
  OneProvider,
  OneStaff,
  Orders,
  Profile,
  Providers,
  Staff,
  Task,
  Tasks,
} from './Components';
import { AdminLayout, SiteLayout } from './Components/layouts';
import { RoutePaths } from './shared/route-paths';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path={RoutePaths.main} element={<SiteLayout />}>
          <Route index element={<MainPage />} />
          <Route path={RoutePaths.plug} element={<PlugPage />} />
        </Route>
        <Route path={RoutePaths.login} element={<LoginPage />} />
        <Route path={RoutePaths.adminLayout} element={<AdminLayout />}>
          <Route path={RoutePaths.orders} element={<Orders />} />
          <Route path={RoutePaths.tasks} element={<Tasks />} />
          <Route path={RoutePaths.task} element={<Task />} />
          <Route path={RoutePaths.newTask} element={<NewTask />} />
          <Route path={RoutePaths.editTask} element={<EditTask />} />
          <Route path={RoutePaths.clients} element={<Clients />} />
          <Route path={RoutePaths.clientNew} element={<NewClient />} />
          <Route path={RoutePaths.staff} element={<Staff />} />
          <Route path={RoutePaths.oneStaff} element={<OneStaff />} />
          <Route path={RoutePaths.editStaff} element={<EditStaff />} />
          <Route path={RoutePaths.newStaff} element={<NewStaff />} />
          <Route path={RoutePaths.profile} element={<Profile />} />
          <Route path={RoutePaths.deadlines} element={<Deadlines />} />
          <Route path={RoutePaths.providers} element={<Providers />} />
          <Route path={RoutePaths.provider} element={<OneProvider />} />
          <Route path={RoutePaths.newProvider} element={<NewProvider />} />
          <Route path={RoutePaths.editProvider} element={<EditProvider />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
