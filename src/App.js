import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginView from './views/LoginView'
import MainView from './views/MainView';
import RegisterView from './views/RegisterView';
import EditPersonalizationView from './views/EditPersonalizationView';
import PersonalizationViewCategory from './views/PersonalizationViewCategory';
import PersonalizationViewAuthor from './views/PersonalizationViewAuthor';
import PersonalizationListView from './views/PersonalizationListView';
import Loading from './components/Loading';
import NotFoundView from './views/NotFoundView';
import CommingSoonView from './views/CommingSoon';
import SearchView from './views/SearchView';
import CollectionView from './views/CollectionView';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'http://atenas.hopto.org';
const good = proxyurl + url;


window.axios = axios;
window.token = localStorage.getItem('token');

axios.defaults.baseURL = good;
axios.defaults.headers.common['Authorization'] = "Bearer " + window.token;
axios.defaults.headers.post['Content-Type'] = 'application/json';






class App extends Component {
    render() {
        return (

            <Router>

                <Switch>
                    <Route exact path="/" component={MainView}/>
                    <Route path="/main">
                        <MainView />
                    </Route>
                    <Route path="/commingsoon">
                        <CommingSoonView />
                    </Route>
                    <Route path="/collection">
                        <CollectionView />
                    </Route>
                    <Route path="/session">
                        <LoginView />
                    </Route>
                    <Route path="/registo">
                        <RegisterView />
                    </Route>
                    <Route path="/edit">
                        <EditPersonalizationView />
                    </Route>
                    <Route path="/personalizationcategory">
                        <PersonalizationViewCategory />
                    </Route>

                    <Route path="/personalizationauthor">
                        <PersonalizationViewAuthor />
                    </Route>

                    <Route path="/personalizationlist">
                        <PersonalizationListView />
                    </Route>

                    <Route path="/loading">
                        <Loading />
                    </Route>
                    <Route path="/comingsoon">
                        <CommingSoonView />
                    </Route>
                    <Route path="/search">
                        <SearchView />
                    </Route>
                    <Route component={NotFoundView} />

                </Switch>

            </Router>
        )
    }
}

export default App
