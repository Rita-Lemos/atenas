import React, { Component } from 'react'
import '../css/saved.css';
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import Loading from './Loading';
import seta from "../images/back.png";

import recombee from 'recombee-js-api-client';

class Saved extends Component {
    constructor() {
        super();
        this.state = {
            dados: [],
            isLoaded: false,
            ultimo: "",
            display1: "block",
            display2: "none"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleSendToLink = this.handleSendToLink.bind(this);
    }
    handleClick() {
        this.setState({
            display1: "none",
            display2: "block"
        })
    }
    handleClick2() {
        this.setState({
            display1: "block",
            display2: "none"
        })
    }

    handleClicka(event) {
        const noticiaEspecial = event.id;
        const userEu = localStorage.getItem('user');

        axios.delete('api/newsUser/' + event.guardado[0].id)
            .then(res => {
                this.componentDidMount();
            });


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

    componentDidMount() {
        //const passingThis = this;
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
        if (!this.state.isLoaded) {
            return <Loading />
        } else {
            let ultima = "";
            let cor = "";
            let arcozelo = 0;
            return (
                <div>
                    <div className="a_SavedBody" style={{ display: this.state.display1 }}>
                        <p className="a_TextoRecente">Mais recentes</p>
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
                                        arcozelo++;
                                        if (arcozelo <= 2) {
                                            let ultima = src2;
                                            return (
                                                <div className='col-sm-4 a_list_margem_guardados' key={lement.id}>
                                                    <Card className='a_list_change_card'>
                                                        <a className="linksList" onClick={() => { this.handleSendToLink(lement) }} href={lement.url}>
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
                                                        <div className="btnGuardaList_Guardados">
                                                            <a type='button' className='a_list_position_news' onClick={() => { this.handleClicka(lement) }}>
                                                                <img className='a_list_img_guardados'
                                                                    src={require(`../images/` + cor)} />
                                                            </a>
                                                        </div>
                                                    </Card>
                                                </div>
                                            )
                                        }
                                    }
                                })

                            }
                        </div>
                        <div className="a_saved_collections" onClick={this.handleClick}>

                            <div className="a_saved_title">
                                <div className="a_TextoRecente">Coleções</div>
                            </div>
                            <Container className="a_ColetionContentor">
                                <Row>
                                    <Col className="a_saved_collection">
                                        <div className="a_saved_collection_title">ler mais tarde</div>
                                        <div className="a_saved_image"></div>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    </div>
                    <div className="a_SavedBody" style={{ display: this.state.display2 }}>
                        <img className="a_SetaBack" src={seta} onClick={this.handleClick2} />
                        <div className="a_TextoLerMais">Ler mais tarde</div>
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
                                            <div className='col-sm-4 a_list_margem_lermais' key={lement.id}>
                                                <Card className='a_list_change_card'>
                                                    <a className="linksList" href={lement.url} onClick={() => this.handleSendToLink(lement)}>
                                                        <Card.Header className='a_list_news '>{lement.topicoNoticia}</Card.Header>
                                                        <Card.Body className='a_list_change_body'>
                                                            <div className="a_divImageNoticia">
                                                                <img className='a_list_radius' src={src2} />
                                                            </div>
                                                            <Card.Title className='a_list_margin_title'>
                                                                <div className='a_list_titulos'>{lement.title}</div>
                                                            </Card.Title>
                                                        </Card.Body>
                                                    </a>
                                                    <div className="btnGuardaList_Guardados">
                                                        <a type='button' className='a_list_position_news' onClick={() => { this.handleClicka(lement) }}>
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
                    </div>
                </div>
            )
        }
    }
}

export default Saved;