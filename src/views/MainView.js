//Main - inclui as componentes da home, meu jornal e guardados
//Inclui a componente do header e do menu de navegação
import React, { Component } from 'react'
//Exemplo para usar imagem - depois mete-se atenas no src por exmeplo
//import atenas from '../images/logo_atenas.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../components/Home';
import Saved from '../components/Saved';
import MyNewspaper from '../components/MyNewspaper';

import { Redirect } from 'react-router-dom';
import { Nav, Tabs, Tab } from 'react-bootstrap';

export const Logout = () => {
  localStorage.clear();
  window.location.href = "/session";
}

class MainView extends Component {
  handlePerfil() {
    window.location.href = "/edit"
  }
  handleSearch() {
    window.location.href = "/search"
  }
  render() {
    if (!localStorage.getItem('user')) {
      return <Redirect to='/session' />;
    }
    return (

      <Router>
        <div className="a_mainview_header">
          <div className="a_mainview_logo">
            <img src={require('../images/logo_atenas.png')} />
          </div>
          <div className="a_mainview_title">
            Atenas
          </div>
          <div className="a_mainview_actions">
            <img src={require('../images/search.svg')} onClick={() => this.handleSearch()} />
            <img src={require('../images/user.svg')} onClick={() => this.handlePerfil()} />
          </div>
        </div>

        {/* TABS BOOTSTRAP */}

        <Tabs defaultActiveKey="meu_jornal" transition={false} id="noanim-tab-example" className="a-mainview">
          <Tab eventKey="meu_jornal" title="O Meu Jornal" className="a-single-tab">

            <MyNewspaper />
          </Tab>
          <Tab eventKey="home" title="Home">

            <Home />
          </Tab>
          <Tab eventKey="guardados" title="Guardados">
            <Saved />
          </Tab>
        </Tabs>
      </Router>
    )
  }
}

export default MainView;