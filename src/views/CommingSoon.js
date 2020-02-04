import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import '../css/commingsoon.css';


class CommingSoonView extends Component {
    
    render() {
        return (
            <div className="a_commingsoon">
                <img className="a_commingsoon_logo" src={require('../images/logo_atenas.png')} />
                <h2 className="a_commingsoon_title">Brevemente disponível :)</h2>
                <p className="a_commingsoon_description">Eu sei que dá vontade, logo logo estará a funcionar!</p>
                <a className="a_commingsoon_link" href="/search">Voltar à Pesquisa</a>
            </div>    
        )
    }
}


export default CommingSoonView;