import React, { Component } from 'react'
import '../css/saved.css';
import Card from "react-bootstrap/Card";
import axios from 'axios';
import '../css/collectiondetail.css';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import recombee from 'recombee-js-api-client';

class CollectionView extends Component {
    constructor() {
        super();
        this.state = {
            dados: [],
            isLoaded: false,
            ultimo: "",
            arcozelo: <div></div>
        };
        this.handleSendToLink = this.handleSendToLink.bind(this);
        this.handleClicka = this.handleClicka.bind(this);
    }
    handlePerfil() {
        window.location.href = "/edit"
    }
    handleSearch() {
        window.location.href = "/search"
    }

    handleSendToLink(event) {
        const userEu = localStorage.getItem('user');
        const noticiaId = event.id;
        var client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');

        client.send(new recombee.AddPurchase(
            userEu,
            noticiaId,
            {
                'cascadeCreate': true
            }))
            .then(res => {
                window.location.href = event.url;
            });


    }
    handleClicka(event) {
        const noticiaEspecial = event.id;
        const userEu = localStorage.getItem('user');

        if (event.guardado && event.guardado.length) {
            axios.delete('api/newsUser/' + event.guardado[0].id)
                .then(res => {
                    this.componentDidMount();
                });

        } else {
            var client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');

            axios.post('api/newsUser', {
                news_id: event.id,
                user_id: userEu,
                collection_id: 1
            })
                .then(response => {

                    // 2. ir para o sistema de recomendação, em que vai o userID e o nome da notícia
                    client.send(new recombee.AddCartAddition(
                        userEu,
                        event.id,
                        {
                            'cascadeCreate': true
                        })).then(res => {
                            this.setState({
                                aviso: 'Notícia guardada com sucesso',
                                arcozelo: <div className='a_divNoticiaGuardada'>Notícia guardada com sucesso</div>
                            });
                            setTimeout(function () {
                                this.setState({ arcozelo: <div></div> });
                                this.componentDidMount();
                            }.bind(this), 2000);


                        });
                })
                .catch(error => {
                    console.log('erro: ', error.response);
                });


        }
    }
    componentDidMount() {
        Promise.all([axios('api/newsAll/' + localStorage.getItem('user'))])

            .then(([res1]) => {
                return Promise.all([res1])
            })
            .then(([res1]) => {
                this.setState({
                    isLoaded: true,
                    dados: res1.data.data
                })
            })
    }

    render() {
        if (!localStorage.getItem('user')) {
            return <Redirect to='/session' />;
        }
        if (!this.state.isLoaded) {
            return <Loading />
        } else {
            let ultima = "";
            let cor = "";
            return (
                <div>
                    {this.state.arcozelo}
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
                    <br /><br /><br />
                    <h6>Nome da coleção</h6>
                    <div>
                        {
                            this.state.dados.map((lement) => {

                                if (lement.guardado && lement.guardado.length) {
                                    cor = "guardados_vermelho_preenchido.svg"
                                } else {
                                    cor = "guardados_vermelho_contorno.svg"
                                }
                                let src2 = "http://atenas.hopto.org/uploads/" + lement.image;

                                if (lement.guardado[0]) {

                                    let ultima = src2;
                                    return (
                                        <div className='col-sm-4 a_list_margem' key={lement.id}>
                                            <Card className='a_list_change_card'>
                                                <a className="linksList" href={lement.url} onClick={() => {
                                                    this.handleSendToLink(lement);
                                                }}>
                                                    <Card.Header className='a_list_news '>{lement.topicoNoticia}</Card.Header>
                                                    <Card.Body className='a_list_change_body'>
                                                        <div className="a_divImageNoticia">
                                                            <img className='a_list_radius'
                                                                src={src2} />
                                                        </div>
                                                        <Card.Title className='a_list_margin_title'>
                                                            <div className='a_list_titulos'>{lement.title}</div>
                                                        </Card.Title>
                                                    </Card.Body>
                                                </a>
                                                <div className="btnGuardaList">
                                                    <a type='button' className='a_list_position_news'> onClick={() => { this.handleClicka(lement) }}
                                                        <img className='a_list_img_guardados'
                                                            src={require(`../images/` + cor)} />
                                                    </a>
                                                </div>
                                            </Card>
                                        </div>
                                    )
                                }
                            })

                        }
                    </div>
                    <br />

                    <br /><br /><br />
                </div>
            )
        }
    }
}

export default CollectionView;