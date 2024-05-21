import React from 'react';
import './App.css';
import { Footer, Header, Nav } from './Components';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Route } from 'react-router-dom';
import { MainPage, PlugPage } from './pages';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/*<Header/>
    <Nav/>*/}
      <Route exact path={'/'} component={MainPage} />
      <Route path={'/plug'} component={PlugPage} />

      {/*<Footer/>*/}
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/admin/main'} component={AdminPage} />
    </ThemeProvider>
  );
}

export default App;
