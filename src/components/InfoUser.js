//Para edição dos dados do utilizador, assim como da sua personalização
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import editar from '../css/edit.css'
import axios from "axios";
import PersonalizationCarouselCategory from "./PersonalizationCarouselCategory";
import LoadingBranco from '../views/LoadingBranco';


//import ModalClose from './ModalClose';
export const Logout = () => {
    localStorage.clear();
    window.location.href = "/session";
}


class InfoUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            user: [],
            toStoreData: []
        }
        this.mainCallback = this.mainCallback.bind(this);
    }


    componentDidMount() {

        Promise.all([axios('api/users/' + localStorage.getItem('user'))])

            .then(([res1]) => {
                return Promise.all([res1])
            })

            .then(([res1]) => {
                this.setState({
                    isLoaded: true,
                    user: res1.data.data
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

    handleClicado(props) {
        window.axios.delete('/api/removeAllForUser/' + localStorage.getItem("user"))
            .then(obj => {
                this.state.toStoreData.map((value) => {
                    window.axios.post('/api/categoryUser', {
                        category_id: value,
                        user_id: localStorage.getItem('user')
                    }).then(response => {
                        if (value === this.state.toStoreData[this.state.toStoreData.length - 1]) {
                            window.location.href = "/main";
                        }
                    }).catch(error => {
                        console.log("Error:", error.response);
                    });
                });
            }).catch((error) => { console.log(error) });
        document.getElementById('buttonSaveChanges').style.display = 'block';
        setTimeout(function () {
            document.getElementById('buttonSaveChanges').style.display = 'none';
            window.location.href = "/main";
        }.bind(this), 2000);
    }


    render() {
        let { isLoaded, user } = this.state;

        if (localStorage.getItem('user') == null) {
            return <Redirect to='/session' />;
        }

        if (!isLoaded) {
            return <LoadingBranco />;
        } else {
            let imagem = "http://atenas.hopto.org/uploads/" + user.image;


            return (
                <div className="a_BodyEdit">
                    <div id='buttonSaveChanges' className='a_DivSave'>
                        <p>Alteracoes efetuadas com sucesso<i className="fas fa-check"></i></p>
                    </div>
                    <div className="a_InfoUser">
                        <img className="a_CloseEdit" src={require('../images/closewhite.svg')} onClick={() => this.handleClicado()} />
                        <div className="a_FotoUser" style={{
                            backgroundImage: 'url(' + imagem + ')',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        </div>

                        <div className="a_NomeUser">{user.username}</div>
                    </div>



                    <div className="a_TextoEdit">Personalização de Conteúdos</div>

                    <PersonalizationCarouselCategory callMain={this.mainCallback} />

                    <div className="a_EditSair">
                        <div className="a_BtnLogout" onClick={Logout}>Terminar Sessão</div>
                    </div>
                </div>

            );


        }
    }
}

export default InfoUser;
