import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Intro} from "./Components/Intro/Intro";
import {Footer} from "./Components/Footer/Footer";
import {Contacts} from "./Components/Contacts/Contacts";
import {Block1} from "./Components/Block1/Block1";
import {Block2} from './Components/Block2/Block2';
import {Block3} from "./Components/Block3/Block3";
import {FeedbackForm} from "./Components/Feedback/FeedbackForm";
import {Slider} from "./Components/Slider/Slider";
import {Nav} from "./Components/Nav/Nav";

function App() {
    return (
        <div className="App">
            <Header/>
            <Nav />
            <Slider />
            {/*<Intro/>
            <Block1 />
            <Block2 />
            <Contacts/>
            <FeedbackForm />
            <Block3 />
            <Footer/>*/}
        </div>
    );
}

export default App;
