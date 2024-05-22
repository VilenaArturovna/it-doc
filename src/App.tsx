import React from 'react';
import './App.css';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { MainPage, PlugPage } from './pages';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Orders, Tasks, Task, Clients, NewClient, NewTask } from './Components';
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
          <Route path={RoutePaths.taskNew} element={<NewTask />} />
          <Route path={RoutePaths.clients} element={<Clients />} />
          <Route path={RoutePaths.clientNew} element={<NewClient />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
