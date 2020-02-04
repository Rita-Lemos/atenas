import React from 'react';
import secundarynavigation from '../css/secondary_navigation.css';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
/*
export const Logout = () => {
    localStorage.clear();
    window.location.href = "/session";
}*/
class GridSecondaryNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoria: [],
            isLoaded: false,
            click: 100,
            btn: [],
            rita: ""
        };

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(btnid) {
        this.setState({ click: btnid });

    }


    componentDidMount() {

        Promise.all([axios('api/category')])

            .then(([res2]) => {
                return Promise.all([res2])
            })

            .then(([res2]) => {
                this.setState({
                    isLoaded: true,
                    categoria: res2,
                });


            });
    }




    render() {

        let { isLoaded, categoria, click, btn } = this.state;


        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const guarda = [];

            categoria.data.data.map((value) => {
                guarda.push(value);
            });

            return (

                <div className="a_secundarymenu">

                    <button className={this.state.click === 100 ? 'a_card_categorys_active' : 'a_card_categorys'} onClick={() => this.handleClick(100)}>
                        DESTAQUE
                        <div hidden={this.state.click !== 100} className="a_category_bolinha"></div>
                    </button>

                    {guarda.map((mauuu) => {


                        return (
                            <button className={this.state.click === mauuu.id ? 'a_card_categorys_active' : 'a_card_categorys'} key={mauuu.id} id={mauuu.id} onClick={() => this.handleClick(mauuu.id)}>
                                {mauuu.category}

                                <div hidden={this.state.click !== mauuu.id} className="a_category_bolinha"></div>

                            </button>
                        )




                    })}

                </div>

            );
        }


    }

}

export default GridSecondaryNavigation;
