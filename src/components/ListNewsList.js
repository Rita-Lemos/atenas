import React, { Component } from 'react'
import { listnews } from '../css/listnews.css';
import Card from "react-bootstrap/Card";
import { col, container, row } from "reactstrap";
import axios from 'axios';
import recombee from 'recombee-js-api-client';
import Loading from './Loading';


class ListNewsList extends Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            news: [],
            news_topics: [],
            topics: [],
            //news_users: [],
            //users: [],
            //category_users: [],
            isLoaded: false,
            showMore: false,
            guardados: [],
            click: 100,
            btn: [],
            cor: 0,
            todas: [],
            arcozelo: <div></div>,
            mostrar: "block",
        };
        this.handleSendToLink = this.handleSendToLink.bind(this);
        this.handleClicka = this.handleClicka.bind(this);
        this.handleClickVerMais = this.handleClickVerMais.bind(this);
    }

    handleSendToLink(event) {
        const userEu = localStorage.getItem('user');
        const noticiaId = event.id;
        var client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');

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
                //window.location.href = event.url;
            });
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
                    //window.location.reload();
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
                                arcozelo: <div className='a_divNoticiaGuardada'>Notícia guardada com sucesso<i className="fas fa-check"></i></div>
                            });
                            // window.alert('Notícia Guardada');
                            setTimeout(function () {
                                this.setState({ arcozelo: <div></div> });
                                //window.location.reload();
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
    handleClick(btnid) {
        this.setState({ click: btnid, clickk: btnid });
        if (btnid == 100) {
            console.log('faz o recombeeee');
            this.setState({ news: [] })
            this.componentDidMount();
        } else {
            Promise.all([axios('api/newsCategory/' + localStorage.getItem('user') + '/' + btnid)])

                .then(([res1]) => {
                    return Promise.all([res1])
                })

                .then(([res1]) => {

                    this.setState({
                        isLoaded: true,
                        news: res1.data.data
                    })
                });
        }
    }

    handleClickVerMais() {
        this.setState({ showMore: true, esconde: true });
        document.getElementById("botaoVerMais").style.display = "none";


    }

    componentDidMount() {
        let client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');
        let userID = localStorage.getItem('user');
        let noticiasRecomendadas = [];
        let apresentarNoticias = [];
        let check = false;
        this._isMounted = true;
        const passthis = this;
        if (this._isMounted) {
            Promise.all([axios('api/userCategory/' + userID), axios('api/newsAll/' + localStorage.getItem('user'))])

                .then(([res5, res6]) => {
                    return Promise.all([res5, res6])
                })
                .then(([res5, res6]) => {
                    if (this.state.click == 100) {
                        client.send(new recombee.RecommendItemsToUser(userID, 10))
                            .then(function (res) {
                                console.log('para mim: ', res.recomms);
                                res.recomms.map((value) => {
                                    noticiasRecomendadas.push(value.id);
                                });
                                noticiasRecomendadas.map((value) => {
                                    res6.data.data.map((value2) => {
                                        if (value2.id == value) {
                                            apresentarNoticias.push(value2);
                                        }
                                        console.log('hfhahfa', apresentarNoticias);


                                        console.log('hey buddy2-->', apresentarNoticias);
                                        passthis.setState({
                                            news: apresentarNoticias
                                        });

                                    })
                                });
                            })
                    }
                    passthis.setState({
                        isLoaded: true,
                        category: res5.data.data,
                        todas: res6.data.data,
                    })

                });


        }
    }

    componentWillUnmount() {
        console.log('unMounted', this._isMounted);

        this._isMounted = false;
        console.log('unMounted', this._isMounted);

    }


    render() {
        const localuser = localStorage.getItem('user');
        var { isLoaded, news, news_topics, topics, guardados, click, mostrar } = this.state;
        const numberOfItems = this.state.showMore ? news.length : 3;

        if (!isLoaded) {
            return <Loading />
        } else {

            const show_news = [];
            const rita = "";
            let i = -1;
            if (news.length < 3) {
                mostrar = "none"

            } else {
                mostrar = "block";

            }
            return (
                <div>
                    {this.state.arcozelo}

                    <div className="a_secundarymenu">

                        <button className={this.state.click === 100 ? 'a_card_categorys_active' : 'a_card_categorys'}
                            onClick={() => this.handleClick(100)}>
                            PARA MIM
                            <div hidden={this.state.click !== 100} className="a_category_bolinha"></div>
                        </button>

                        {this.state.category.map((mauuu) => {


                            return (
                                <button
                                    className={this.state.click === mauuu.id ? 'a_card_categorys_active' : 'a_card_categorys'}
                                    key={mauuu.id} id={mauuu.id} onClick={() => this.handleClick(mauuu.id)}>
                                    {mauuu.category}
                                    <div hidden={this.state.click !== mauuu.id} className="a_category_bolinha"></div>
                                </button>
                            )

                        })}

                    </div>


                    {


                        news.slice(0, numberOfItems).map((value, key) => {
                            let cor = "";
                            if (value.guardado && value.guardado.length) {
                                cor = "guardados_vermelho_preenchido.svg"
                            } else {
                                cor = "guardados_vermelho_contorno.svg"
                            }
                            let src = "http://atenas.hopto.org/uploads/" + value.image;
                            console.log('arcozelo porra', this.state.click);
                            console.log(value);
                            return (
                                <div className='col-sm-4 a_list_margem' key={value.id}>
                                    <br />
                                    <Card className='a_list_change_card'>
                                        <a className="linksList" onClick={() => {
                                            this.handleSendToLink(value)
                                        }} href={value.url}>
                                            <Card.Header className='a_list_news '>{value.topicoNoticia}</Card.Header>
                                            <Card.Body className='a_list_change_body'>
                                                <div className="a_divImageNoticia">

                                                    <img className='a_list_radius'
                                                        src={src} />
                                                </div>
                                                <Card.Title className='a_list_margin_title'>
                                                    <div className='a_list_titulos'>{value.title}</div>


                                                </Card.Title>
                                            </Card.Body>
                                        </a>


                                        <div className="btnGuardaList">
                                            <a type='button' className='a_list_position_news' onClick={() => { this.handleClicka(value) }}>
                                                <img className='a_list_img_guardados'
                                                    src={require(`../images/` + cor)} />
                                            </a>
                                        </div>


                                    </Card>
                                    <br />

                                </div>
                            )

                        })}
                    <button id='botaoVerMais' style={{ display: mostrar }} className='VerMaisBtn' onClick={() => this.handleClickVerMais()}>Ver mais</button>
                </div>


            );


        }
    }
}


export default ListNewsList