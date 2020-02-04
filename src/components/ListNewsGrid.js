import React, { Component, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { HomePage_styles } from '../css/HomePage.css';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { container, row, col } from "reactstrap";
import axios from 'axios';
import GridSecondaryNavigation from './GridSecondaryNavigation'
import recombee from 'recombee-js-api-client';
import Modal from 'react-bootstrap/Modal'
import { findAllByDisplayValue } from '@testing-library/react';
import ReactHooks from 'eslint-plugin-react-hooks'
import Loading from './Loading';

class ListNewsGrid extends Component {


    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            news: [],
            news_topics: [],
            topics: [],
            guardados: [],
            isLoaded: false,
            categoria: [],
            click: 200,
            btn: [],
            showMore: false,
            esconde: false,
            selected: "",
            noticias: [],
            rita: 0,
            collections: [],
            arcozelo: <div></div>,
            ativo: false,
            aviso: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClicka = this.handleClicka.bind(this);
        this.handleClickVerMais = this.handleClickVerMais.bind(this);
        this.handleSendToLink = this.handleSendToLink.bind(this);
        this.handleEsconde = this.handleEsconde.bind(this);

    }
    handleClose() {
        this.setState({
            ativo: false
        })
        console.log(this.state.ativo)
    }


    handleClicka(event) {


        console.log('here--->', event);
        //console.log(event.id);
        const noticiaEspecial = event.id;
        const userEu = localStorage.getItem('user');
        console.log('Noticia Clicada', noticiaEspecial);
        console.log('veer se ele existe', event.guardado);
        if (event.guardado && event.guardado.length) {
            axios.delete('api/newsUser/' + event.guardado[0].id)
                .then(res => {
                    console.log(res.data);
                    console.log('apagar noticia');
                    this.componentDidMount();
                    // window.location.reload();
                });

        } else {
            console.log('vais guardar a noticia e apresentar a div!');
            var client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');

            axios.post('api/newsUser', {
                news_id: event.id,
                user_id: userEu,
                collection_id: 1
            })
                .then(response => {
                    console.log('resposta:', response);

                    // 2. ir para o sistema de recomendação, em que vai o userID e o nome da notícia
                    client.send(new recombee.AddCartAddition(
                        userEu,
                        event.id,
                        {
                            'cascadeCreate': true
                        })).then(res => {
                            console.log(res);
                            //window.location.href='';
                            this.setState({
                                aviso: 'Notícia guardada com sucesso',
                                arcozelo: <div className='a_divNoticiaGuardada'>Notícia guardada com sucesso<i class="fas fa-check"></i></div>
                            });
                            // window.alert('Notícia Guardada');
                            setTimeout(function () {
                                this.setState({ arcozelo: <div></div> });
                                this.componentDidMount()
                            }.bind(this), 2000);


                        });
                    console.log('Item adicionado ao carrinho| Notícia está no recomendador guardados');
                })
                .catch(error => {
                    console.log('erro: ', error.response);
                });


        }
    }

    handleEsconde() {
        this.setState({
            arcozelo: <div></div>
        });
        console.log('vamos apagar');
    }
    handleSendToLink(event) {
        const userEu = localStorage.getItem('user');
        const noticiaId = event.id;
        var client = new recombee.ApiClient('atenas-atenas-novo', '61Z8UGxxGFlTmuMtE3uUixd0ofZIlefQk68LTUXd2pzExiDtTgUOhSffYoUFmLQB');

        console.log(noticiaId, '--> vai ser a noticia');
        console.log(userEu, '--> vai ser o user');
        console.log(event, '--> evento');

        client.send(new recombee.AddPurchase(
            userEu,
            noticiaId,
            {
                'cascadeCreate': true
            }))
            .then(res => {
                console.log(res);
                console.log('Noticia Visitada --> Compra feita');
                window.location.href = event.url;
            });


    }
    handleClickVerMais() {
        this.setState({ showMore: true, esconde: true });
        document.getElementById("botaoVerMais2").style.display = "none";


    }
    handleClick(btnid) {
        this.setState({ click: btnid, selected: btnid });
        console.log('selecionaddo', this.state.selected);
        Promise.all([axios('api/newsCategory/' + localStorage.getItem('user') + '/' + btnid)])

            .then(([res1]) => {
                return Promise.all([res1])
            })

            .then(([res1]) => {
                console.log('respostinha', res1);

                this.setState({
                    isLoaded: true,
                    noticias: res1.data.data
                })
            });
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            Promise.all([axios('api/newsAll/' + localStorage.getItem('user')), axios('api/category'), axios('api/collection')])
                .then(([res1, res5, res3]) => {
                    return Promise.all([res1, res5, res3])
                })
                .then(([res1, res5, res3]) => {
                    this.setState({
                        isLoaded: true,
                        news: res1.data.data,
                        categoria: res5.data.data,
                        collections: res3.data.data
                    })
                });

        }
    }

    render() {
        let estados = [];
        var { isLoaded, news, news_topics, topics, guardados, categoria, click} = this.state;
        const localuser = '1';
        // const localuser=localStorage.getItem('user');
        const numberOfItems = this.state.showMore ? news.length : 3;


        if (!isLoaded) {
            return <Loading />
        } else {
            return (
                <div>
                    {this.state.arcozelo}
                    <div className="a_secundarymenu">
                        <button className={this.state.click === 200 ? 'a_card_categorys_active' : 'a_card_categorys'} onClick={() => this.handleClick(200)}>
                            DESTAQUE
                        <div hidden={this.state.click !== 200} className="a_category_bolinha"></div>
                        </button>
                        {categoria.map((value) => {

                            const idClick = '/' + value.id;
                            return (
                                <button className={this.state.click === value.id ? 'a_card_categorys_active' : 'a_card_categorys'} key={value.id} id={value.id} onClick={() => this.handleClick(value.id)}>
                                    {value.category}

                                    <div hidden={this.state.click !== value.id} className="a_category_bolinha"></div>
                                    <Link to={idClick} />
                                </button>
                            )
                        })
                        }
                    </div>
                    <div className='row a_homepage_padding'>

                        {

                            news.slice(0, numberOfItems).map((value4, key2) => {
                                if (this.state.selected == "" || this.state.selected == 200) {
                                    let src = "http://atenas.hopto.org/uploads/" + value4.image;
                                    //let teste ="http://atenas.hopto.org/uploads/images/categories/uqs4Rn2lwszsLkAcNfvOyBXX75hiTnwk6svVznwJ.png"
                                    let cor = "";
                                    //    console.log('valueeeeeeeee', value4.guardado)
                                    if (value4.guardado && value4.guardado.length) {
                                        cor = "guardados_branco_preenchido.svg"
                                    } else {
                                        cor = "guardados_branco_contorno.svg"
                                    }

                                    if (key2 == 0) {
                                        return (
                                            <div className='col-sm-12 a_homepage_destaque ' key={value4.id}>


                                                <Card className='a_homepage_change_card'>


                                                    <Card.Header className='a_homepage_topicos_destaque, a_homepage_change_header_destaque '>{value4.topicoNoticia}</Card.Header>

                                                    <Card.Body className='a_homepage_change_body'>
                                                        <a className="LinkGrid" onClick={() => {
                                                            this.handleSendToLink(value4)
                                                        }} href={value4.url}>
                                                            <Card.Title>
                                                                <div className='a_homepage_titulos_destaque'>{value4.title}</div>
                                                            </Card.Title>
                                                            <Card.Img className='a_homepage_radius'
                                                                src={src} />
                                                        </a>
                                                    </Card.Body>


                                                </Card>
                                                <a type='button' onClick={() => { this.handleClicka(value4) }} className='a_homepage_guardados'><img
                                                    className='a_homepage_img_guardados'
                                                    src={require(`../images/` + cor)} /></a>
                                            </div>

                                        )

                                    } else {
                                        
                                        return (
                                            <div className='col-sm-4 a_homepage_margem' key={value4.id}>

                                                <Card className='a_homepage_change_card'>

                                                    <Card.Header className='a_homepage_news'>{value4.topicoNoticia}</Card.Header>
                                                    <Card.Body className='a_homepage_change_body'>
                                                        <a className="LinkGrid" onClick={() => {
                                                            this.handleSendToLink(value4)
                                                        }}>
                                                            <Card.Img className='a_homepage_radius'
                                                                src={src} />
                                                        </a>
                                                        <button onClick={() => { this.handleClicka(value4) }} className='a_homepage_position_news'><img
                                                            className='a_homepage_img_guardados'
                                                            src={require(`../images/` + cor)} />
                                                        </button>
                                                    </Card.Body>
                                                    <a href={value4.url}>
                                                        <Card.Title className='a_homepage_margin_title'>
                                                            <div className='a_homepage_titulos'>{value4.title}</div>
                                                        </Card.Title>
                                                    </a>

                                                </Card>

                                            </div>
                                        )
                                    }


                                } else {
                                    return (

                                        this.state.noticias.slice(0, numberOfItems).map((value5, key) => {
                                            let cor2 = "";
                                            let src2 = "http://atenas.hopto.org/uploads/" + value5.image;

                                            if (value5.guardado && value5.guardado.length) {
                                                cor2 = "guardados_branco_preenchido.svg"
                                            } else {
                                                cor2 = "guardados_branco_contorno.svg"
                                            }
                                            if (key2 == 0) {
                                                return (
                                                    <div className='col-sm-4 a_homepage_margem' key={value5.id}>

                                                        <Card className='a_homepage_change_card'>

                                                            <Card.Header className='a_homepage_news'>{value5.topicoNoticia}</Card.Header>
                                                            <Card.Body className='a_homepage_change_body'>
                                                                <a className="LinkGrid" onClick={() => {
                                                                    this.handleSendToLink(value5)
                                                                }}>
                                                                    <Card.Img className='a_homepage_radius'
                                                                        src={src2} />
                                                                </a>
                                                                <button onClick={() => { this.handleClicka(value5) }} className='a_homepage_position_news'><img
                                                                    className='a_homepage_img_guardados'
                                                                    src={require(`../images/` + cor2)} />
                                                                </button>
                                                            </Card.Body>
                                                            <a href={value5.url}>
                                                                <Card.Title className='a_homepage_margin_title'>
                                                                    <div className='a_homepage_titulos'>{value5.title}</div>
                                                                </Card.Title>
                                                            </a>

                                                        </Card>

                                                    </div>
                                                )
                                            }
                                        })
                                    )
                                }
                            })
                        }

                        <button id='botaoVerMais2' className='VerMaisBtn' onClick={() => this.handleClickVerMais()}>Ver mais</button>
                    </div>
                </div>
            )

        }

    }
}


export default ListNewsGrid;