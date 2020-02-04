import React, { Component } from 'react'

import Carousel from 'react-bootstrap/Carousel';
import PersonalizationGridCategory from './PersonalizationGridCategory';
import '../css/personalizationcarousel.css';
import axios from 'axios';
import LoadingBranco from '../views/LoadingBranco';

class PersonalizationCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: [],
            isLoaded: false,
            selected: []
        }
    }

    componentDidMount() {
        var aux = [];
        const passingThis = this;
        Promise.all([axios('api/category')])

            .then(([res1]) => {
                return Promise.all([res1])
            })
            .then(([res1]) => {
                var categorySize = res1.data.data;
                //ir buscar selected
                Promise.all([axios('api/userCategory/' + localStorage.getItem("user"))])
                    .then(([res2]) => {
                        categorySize.forEach(element => {
                            element.selected = res2.data.data.find(o => o.id === element.id);
                            if (element.selected) {
                                this.props.callMain(element);
                            }
                        });
                        passingThis.setState({
                            selected: res2.data.data.map(function (obj) {
                                return obj.id;
                            }),
                            isLoaded: true,
                        });

                        for (var i = 0; i < categorySize.length; i += 9) {
                            if (i + 9 < categorySize.length) {
                                aux.push(categorySize.slice(i, i + 9))
                            } else {
                                aux.push(categorySize.slice(i, categorySize.length))
                            }
                        }

                        passingThis.setState({
                            isLoaded: true,
                            dados: aux
                        })
                    });
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return <LoadingBranco />
        } else {
            return (
                <Carousel className="a_personalizationgrid_carousel" interval={false}>
                    {this.state.dados.map((dado, index) => (
                        <Carousel.Item key={index}>
                            <PersonalizationGridCategory categories={dado} callMain={this.props.callMain}
                                selected={this.state.selected} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
        }
    }
}

export default PersonalizationCarousel;
