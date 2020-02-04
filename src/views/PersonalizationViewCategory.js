//Personalização inicial
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PersonalizationCarousel from '../components/PersonalizationCarouselCategory';
import '../css/personalizationview.css';


class PersonalizationViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toStoreData: []
        }
        this.mainCallback = this.mainCallback.bind(this);
    }

    handleClicado(props) {
        this.state.toStoreData.map((value) => {
            window.axios.post('/api/categoryUser', {
                category_id: value,
                user_id: localStorage.getItem('user')
            }).then(response => {
                if (value === this.state.toStoreData[this.state.toStoreData.length - 1]) {
                    localStorage.setItem('register',2);
                    window.location.href = "/personalizationauthor";
                }
            }).catch(error => {
                console.log("Error:", error.response);
            });
        });
    }

    mainCallback(clickedValue) {
        if (clickedValue.selected && this.state.toStoreData.find(obj => obj == clickedValue.id) == undefined) {
            this.setState({
                toStoreData: this.state.toStoreData.concat(clickedValue.id)
            });
        }
        else if (!clickedValue.selected && this.state.toStoreData.find(obj => obj == clickedValue.id) != undefined) {
            this.setState({
                toStoreData: this.state.toStoreData.filter(obj => obj != clickedValue.id)
                
            });
        }
    }

    render() {
        if(!localStorage.getItem('user')){
            return <Redirect to='/session'/>;
        } else {
            if (localStorage.getItem('register')!=1){
                localStorage.clear();
                return <Redirect to='/session' />
            }
        }
        
        const dados = [
            { image: 'https://www.torredevigilancia.com/wp-content/uploads/2019/10/coringa-55.jpg', categories: [{ text: 'teste1' }] }
        ];
        return (
            <div className="a_BodyPersonalizacao">

                <div className="a_Texto"> Personalizamos o contéudo só para ti!</div>

                <div className="a_Steps">
                    <div className="a_BolaVermelha">1</div>
                    <hr className="a_linhaBola" />
                    <div className="a_BolaCinza">2</div>
                    <hr className="a_linhaBola" />
                    <div className="a_BolaCinza">3</div>
                    <hr className="a_linhaBola" />
                    <div className="a_BolaIcon"><img className="a_ImageBolaIcon" src={require('../images/user_vazio .svg')} /></div>
                </div>

                <div className="a_TextoDois">Indique-nos 4 ou mais temas que gosta!</div>

                <div className="a_personalizationgrid_view">
                    <PersonalizationCarousel callMain={this.mainCallback} />
                </div>

                <input className="RegistoBtn" type="submit" value="seguinte" onClick={() => this.handleClicado()} />
            </div>
        )
    }
}

export default PersonalizationViewCategory;
