import React from 'react';
import './App.css';
import { Footer, Header, Nav } from './Components';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Route } from 'react-router-dom';
import { MainPage, PlugPage } from './pages';

function App() {
  return (<ThemeProvider theme={defaultTheme}>
    <Header/>
    <Nav/>
    <Route exact path={'/'} component={MainPage}/>
    <Route path={'/plug'} component={PlugPage}/>
    <Footer/>
  </ThemeProvider>);
}

export default App;
