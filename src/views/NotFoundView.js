import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import '../css/notfoundview.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class NotFoundView extends Component {
    
    render() {
        return (
            <div className="a_notfoundview">
                <img className="a_LogoNotFound" src={require('../images/logo_atenas.png')} />
                <h2 className="a_TitleNot">Página não encontrada</h2>
                <p className="a_DescriptionNot">Parece que não conseguimos encontrar a página que procuras :(</p>
                <Link to ="/main" className="a_notfoundview_link">Voltar à Home</Link>
            </div>    
        )
    }
}


export default NotFoundView;