import React from 'react';
import './App.css';
import { Footer, Header, Nav } from './Components';
import { defaultTheme } from './themes/defaultTheme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (<ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Header/>
        <Nav/>
        <Footer />
        {/*<Slider/>
        <Main/>
        <Block2/>
        <Prices/>
        <Block1/>
        <Block4/>
        <Intro/>
        <Contacts/>
        <FeedbackForm/>
        <Block3/>
        <Footer/>*/}
      </div>
    </ThemeProvider>);
}

export default App;
