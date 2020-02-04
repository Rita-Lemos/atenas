//Pesquisa e depois logo se vê
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import '../css/searchview.css';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import '../css/personalizationview.css';
import '../css/personalizationgrid.css';
import recombee from 'recombee-js-api-client';
import Loading from '../components/Loading';


class SearchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: '', 
            news: [], 
            cor: 0,
            arcozelo: <div style={{display: "none"}}></div>
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleClicka = this.handleClicka.bind(this);
        this.handleSendToLink=this.handleSendToLink.bind(this);
    }

    handleUserInput(e) {
        this.setState({userInput: e.target.value});
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            Promise.all([axios('api/newsAll/' + localStorage.getItem('user'))])

                .then(([res1]) => {
                    return Promise.all([res1])
                })

                .then(([res1]) => {
                    this.setState({
                        isLoaded: true,
                        news: res1.data.data,
                    })
                });
        }
    }

    handleClicka(event){
        const noticiaEspecial=event.id;
        const myUser=localStorage.getItem('user');
        if(event.guardado && event.guardado.length){
            //noticia pertence aos guardados, tem de ser removida
            axios.delete('api/newsUser/'+event.guardado[0].id)
                .then(res => {
                    this.componentDidMount();
                })
        }else{
            var client = new recombee.ApiClient('atenas-atenas-final', 'cuXTbNwBbReV9FcCwC05qLaJ73lIUjmXqgw6kXU2Mo2rGTfuepGuEmrpuaC2xiG4');

            axios.post('api/newsUser', {
                news_id: event.id,
                user_id: myUser,
                collection_id: 1
            })
                .then(response => {
                    // 2. ir para o sistema de recomendação, em que vai o userID e o nome da notícia
                    client.send(new recombee.AddCartAddition(
                        myUser,
                        event.id,
                        {
                            'cascadeCreate': true
                        })).then(res => {
                        //window.location.href='';
                        this.setState({
                            aviso: 'Notícia guardada com sucesso',
                            arcozelo: <div style={{display: "block"}} className='a_divNoticiaGuardadaSearch'>Notícia guardada com sucesso<i class="fas fa-check"></i></div>
                        });
                        // window.alert('Notícia Guardada');
                        setTimeout(function(){
                            this.setState({arcozelo:<div></div>});
                            this.componentDidMount()
                        }.bind(this),2000);


                    });
                })
                .catch(error => {
                    console.log('erro: ', error.response);
                });
        }
    }

    handleSendToLink(event) {
        const userEu = localStorage.getItem('user');
        const noticiaId = event.id;
        var client = new recombee.ApiClient('atenas-atenas-novo', '61Z8UGxxGFlTmuMtE3uUixd0ofZIlefQk68LTUXd2pzExiDtTgUOhSffYoUFmLQB');

        client.send(new recombee.AddPurchase(
            userEu,
            noticiaId,
            {
                'cascadeCreate': true
            }))
            .then(res => {
                
            });


    }

    render() {
        if (!localStorage.getItem('user')) {
            return <Redirect to='/session' />;
        }
        var {isLoaded, news, news_topics, topics, guardados} = this.state;

        if (!isLoaded) {
            return <Loading />
        } else {
            return (
                <div id="a_search_break">
                    {this.state.arcozelo}
                        <div className="a_searchview_bar">
                            <input size="25" className="a_searchview_input" placeholder="Pesquisar..."
                                   onChange={this.handleUserInput} value={this.state.userInput}></input>
                            <a href="/commingsoon"><img className="a_searchview_icons"
                                                        src={require('../images/photo.svg')}/></a>
                            <a href="/commingsoon"><img className="a_searchview_icons"
                                                        src={require('../images/micro.svg')}/></a>
                            <a href="/main"><img className="a_searchview_icons a_searchviewclose"
                                                 src={require('../images/closegray.svg')}/></a>
                        </div>

                    {this.state.news.map((value) => {
                        let src = "http://atenas.hopto.org/uploads/" + value.image;
                        let cor = "";
                        if (value.guardado && value.guardado.length) {
                            cor = "guardados_vermelho_preenchido.svg"
                        } else {
                            cor ="guardados_vermelho_contorno.svg";
                        }

                        var pesquisa = value.title.toLocaleLowerCase().includes(this.state.userInput.toLocaleLowerCase());
                        var pesquisa2 = value.topicoNoticia.toLocaleLowerCase().includes(this.state.userInput.toLocaleLowerCase());
                        
                        if (pesquisa == true || pesquisa2 == true) {
                            return (
                                <div className='col-sm-4 a_list_marginn' key={value.id}>

                                    <Card className='a_list_change_card'>
                                        <a className="linksList" onClick={()=>{this.handleSendToLink(value)}}>
                                            <Card.Header className='a_list_news '>{value.topicoNoticia}</Card.Header>
                                            <Card.Body className='a_list_change_body'>
                                                <div className="a_divImageNoticia">

                                                    <img className='a_list_radius'
                                                         src={src}/>
                                                </div>
                                                <Card.Title className='a_list_margin_title'>
                                                    <div className='a_list_titulos'>{value.title}</div>
                                                </Card.Title>
                                            </Card.Body>
                                        </a>


                                        <div className="btnGuardaList_Search">
                                            <a type='button' className='a_list_position_news' onClick={()=>{this.handleClicka(value)}}>
                                                <img className='a_list_img_guardados' src={require(`../images/` + cor)}/>
                                            </a>
                                        </div>


                                    </Card>

                                </div>
                            )
                        }


                    })
                    }
                </div>


            )
        }

    }
}

export default SearchView;
