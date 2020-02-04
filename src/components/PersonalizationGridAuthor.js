import React, { Component, useState, useEffect } from 'react';
import '../css/personalizationgrid.css';

class PersonalizationGridAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            clicked: [],
            categories: props.categories,

        }
    }

    clickCategory(id) {
        if (this.state.selected.filter(obj => obj == id).length == 0) {
            this.setState((prevState, props) => ({
                selected: prevState.selected.concat(id)
            }))
        } else {
            this.setState((prevState, props) => {
                return { selected: prevState.selected.filter(obj => obj != id) };
            })
        }

    }

    render() {

        return (

            <div className="row carrosselautores">

                {



                    this.state.categories.map((category, index) => {
                        let image = "url('http://atenas.hopto.org/uploads/" + category.image + "')";
                        return <div key={index} className="a_personalizationgrid_category" onClick={() => this.clickCategory(category.id)}
                            style={{
                                backgroundImage: this.state.selected.find(obj => obj == category.id) ? image : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition:'center',
                                color: this.state.selected.find(obj => obj == category.id) ? 'white' : 'black'
                            }}><span className="a_spanTextoCarrosselAuthor" style={{
                                backgroundColor: this.state.selected.find(obj => obj == category.id) ? 'rgba(0,0,0, 0.3)' : 'transparent',
                                color:  this.state.selected.find(obj => obj == category.id) ?'white' : 'black',
                            }}>{category.name}</span>
                        </div>
                    })
                }

            </div>
        )
    }

}

export default PersonalizationGridAuthor;
