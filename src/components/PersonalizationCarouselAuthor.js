import React, { Component } from 'react'

import Carousel from 'react-bootstrap/Carousel';
import PersonalizationGridAuthor from './PersonalizationGridAuthor';
import '../css/personalizationcarousel.css';
import axios from 'axios';
import LoadingBranco from './LoadingBranco';

class PersonalizationCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dados: []
        }
    }

    componentDidMount() {
        const passingThis = this;
        Promise.all([axios('api/author')])

            .then(([res1]) => {
                return Promise.all([res1])
            })
            .then(([res1]) => {
                passingThis.setState({
                    isLoaded: true,
                    dados: res1.data.data
                })
            })
    }



    render() {
        if (!this.state.isLoaded) {
            return <LoadingBranco />
        } else {
        return (
            <div>
                <Carousel className="a_personalizationgrid_carousel" interval={false}>
                    {this.state.dados.map((dado, index) => (
                        <Carousel.Item key={index}>
                            <PersonalizationGridAuthor categories={this.state.dados} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}
}

export default PersonalizationCarousel;

