//Personalização inicial
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PersonalizationCarouselAuthor from '../components/PersonalizationCarouselAuthor';
import '../css/personalizationview.css';


class PersonalizationViewAuthor extends Component {

    handleClicado(){
        localStorage.setItem('register',3);
        window.location.href = "/personalizationlist";
    }

    componentDidMount() {}
    render() {
        if(!localStorage.getItem('user')){
            return <Redirect to='/session'/>;
        }else{
            if(localStorage.getItem('register')!=2){
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
                    <div className="a_BolaVermelha">2</div>
                    <hr className="a_linhaBola"/>
                    <div className="a_BolaCinza">3</div>
                    <hr className="a_linhaBola"/>
                    <div className="a_BolaIcon"><img  className="a_ImageBolaIcon" src={require('../images/user_metade_cheio .svg')}/></div>
                </div>

                <div className="a_TextoDois">Indique-nos 2 ou mais jornalistas que gosta!</div>

                <div className="a_personalizationgrid_view">
                    <PersonalizationCarouselAuthor />
                </div>

                <input className="RegistoBtn" type="submit" value="seguinte" onClick={()=>this.handleClicado()}/>
            </div>
        )
    }
}

export default PersonalizationViewAuthor;
