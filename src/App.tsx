import React from 'react';
import './App.css';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { MainPage, PlugPage } from './pages';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Orders, Tasks } from './Components';
import { AdminLayout, SiteLayout } from './Components/layouts';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path={'/'} element={<SiteLayout />}>
          <Route index element={<MainPage />} />
          <Route path={'/plug'} element={<PlugPage />} />
        </Route>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/admin'} element={<AdminLayout />}>
          <Route path={'/admin/orders'} element={<Orders />} />
          <Route path={'/admin/tasks'} element={<Tasks />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
