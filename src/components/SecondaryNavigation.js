import React from 'react';
import { secundarynavigation } from '../css/secondary_navigation.css';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';


class SecondaryNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            categoria: [],
            isLoaded: false,
            click: 100,
            btn: []
        };

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(btnid) {
        this.setState({ click: btnid });

    }


    componentDidMount() {

        Promise.all([axios('api/userCategory/' + localStorage.getItem('user'))])

            .then(([res1]) => {
                return Promise.all([res1])
            })

            .then(([res1]) => {
                this.setState({
                    isLoaded: true,
                    category: res1.data.data,
                });

            });
    }



    render() {

        let { isLoaded, category, click } = this.state;


        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <div className="a_secundarymenu">

                    <button className={this.state.click === 100 ? 'a_card_categorys_active' : 'a_card_categorys'} onClick={() => this.handleClick(100)}>
                        PARA MIM
                        <div hidden={this.state.click !== 100} className="a_category_bolinha"></div>
                    </button>

                    {this.state.category.map((mauuu) => {

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

export default SecondaryNavigation;
