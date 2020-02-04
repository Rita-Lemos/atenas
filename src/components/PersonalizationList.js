import React, { Component, useState, useEffect } from 'react';
import '../css/personalizationlist.css';
import tamanho from '../images/tamanho_journalism.jpg';

class PersonalizationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            clicked: 0,
            newssize: [
                {
                    id: 1,
                    img: "",
                    text: "Curta"
                },
                {
                    id: 2,
                    img: "",
                    text: "Media"
                },
                {
                    id: 3,
                    img: "",
                    text: "Longa"
                }]
        }
    }

    clickNewsSize(id) {
        if (this.state.selected == id) {
            this.setState((prevState, props) => ({
                selected: 0
            }));
        } else {
            this.setState((prevState, props) => ({
                selected: id
            }));
        }

    }

    render() {

        var imagem = "url('" + tamanho + "')";


        return (


            <div className="row">


                {this.state.newssize.map((newssize, index) => {
                    return <div key={index} className="a_personalizationlist_newssize" onClick={() => this.clickNewsSize(newssize.id)}
                        style={{
                            backgroundImage: this.state.selected == newssize.id ? imagem : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            color: this.state.selected == newssize.id ? 'white' : 'black'
                        }}><span className="a_spanTextoCarrosselList" style={{
                            backgroundColor: this.state.selected == newssize.id ? 'rgba(0,0,0, 0.3)' : 'transparent',
                            color:  this.state.selected == newssize.id ?'white' : 'black',
                        }}>{newssize.text}</span></div>
                })
                }
            </div>
        )
    }

}

export default PersonalizationList;