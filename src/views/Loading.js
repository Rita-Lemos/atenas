import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import loadingestilos from '../css/loading.css'


class Loading extends Component {

    render() {
        return (
            <div className='a_BodyLoading'>
                <div className="wrap">
                    <div className="loading">
                        <div className="bounceball"></div>
                        <div className="text">A CARREGAR</div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Loading;
