//Personalização inicial
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PersonalizationList from '../components/PersonalizationList';
import '../css/personalizationview.css';
import '../css/personalizationgrid.css'


class PersonalizationListView extends Component {

    handleClicado(){
        localStorage.removeItem('register');
        window.location.href = "/main"
    }


    render() {
        if(!localStorage.getItem('user')){
            return <Redirect to='/session'/>;
        }else{
            if(localStorage.getItem('register')!=3){
                localStorage.clear();
                return <Redirect to='/session' />
            }
        }
        const dados = [
            { image: 'https://www.torredevigilancia.com/wp-content/uploads/2019/10/coringa-55.jpg', categories: [{text : 'teste1'}] }
          ];
        return (
            <div className="a_BodyPersonalizacao">

                <div className="a_Texto"> Personalizamos o contéudo só para ti!</div>

                <div className="a_Steps">
                    <div className="a_BolaCinza">1</div>
                    <hr className="a_linhaBola"/>
                    <div className="a_BolaCinza">2</div>
                    <hr className="a_linhaBola"/>
                    <div className="a_BolaVermelha">3</div>
                    <hr className="a_linhaBola"/>
                    <div className="a_BolaIcon"><img  className="a_ImageBolaIcon" src={require('../images/user_total_preenchido .svg')}/></div>
                </div>

                <div className="a_TextoDois">Indique-nos o tipo de notícias que mais gosta!</div>

                <div className="a_personalizationgrid_view">
                    <PersonalizationList dados={dados} />
                </div>

                <input className="RegistoBtnFim" type="submit" value="terminar" onClick={()=>this.handleClicado()}/>
            </div>

        )
    }
}

export default PersonalizationListView;
