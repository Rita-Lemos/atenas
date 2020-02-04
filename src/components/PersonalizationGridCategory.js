import React, { Component, useState, useEffect } from 'react';
import '../css/personalizationgrid.css';

class PersonalizationGridCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            clicked: [],
            categories: props.categories
        }
    }



    clickCategory(id) {
        this.state.categories.find(x => x.id === id).selected = !this.state.categories.find(x => x.id === id).selected;
        this.props.callMain(this.state.categories.find(x => x.id === id));
    }


    render() {
        return (
            <div className="row carrosselcategorias">
                {
                    this.state.categories.map((category, index) => {
                        let image = "url('http://atenas.hopto.org/uploads/" + category.image + "')";
                        return <div key={index} className="a_personalizationgrid_category" onClick={() => this.clickCategory(category.id)}
                            style={{
                                //backgroundImage: this.state.selected.find(obj => obj == category.id) ? image : 'none',
                                backgroundImage: category.selected ? image : 'none',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                //background: 'linear-gradiant( rgba(10,10,10, .5), rgba(10,10,10, .5))',
                                // color: this.state.selected.find(obj => obj == category.id) ? 'white' : 'black'
                                color: category.selected ? 'white' : 'black'
                            }}>
                                <span className="a_spanTextoCarrossel" style={{
                                backgroundColor: category.selected ? 'rgba(0,0,0, 0.3)' : 'transparent',
                                color: category.selected ? 'white' : 'black',
                            }}>{category.category}</span></div>
                    })
                }
            </div>
        )
    }

}

export default PersonalizationGridCategory;
