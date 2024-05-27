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
  EditClient,
  EditWork,
  NewClient,
  NewProvider,
  NewStaff,
  NewTask,
  NewWork,
  OneProvider,
  OneStaff,
  OneClient,
  OneWork,
  Orders,
  Profile,
  Providers,
  Staff,
  Task,
  Tasks,
  Vendors,
  AdminWorks,
  OneVendor,
  NewVendor,
  EditVendor,
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
          <Route path={RoutePaths.client} element={<OneClient />} />
          <Route path={RoutePaths.newClient} element={<NewClient />} />
          <Route path={RoutePaths.editClient} element={<EditClient />} />
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
          <Route path={RoutePaths.vendors} element={<Vendors />} />
          <Route path={RoutePaths.vendor} element={<OneVendor />} />
          <Route path={RoutePaths.newVendor} element={<NewVendor />} />
          <Route path={RoutePaths.editVendor} element={<EditVendor />} />
          <Route path={RoutePaths.works} element={<AdminWorks />} />
          <Route path={RoutePaths.work} element={<OneWork />} />
          <Route path={RoutePaths.newWork} element={<NewWork />} />
          <Route path={RoutePaths.editWork} element={<EditWork />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
