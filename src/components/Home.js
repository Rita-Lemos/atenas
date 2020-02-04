import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ListNewsGrid from '../components/ListNewsGrid';

class Home extends Component {
    render() {
        return(
            <ListNewsGrid />
        )
    }
}

export default Home;