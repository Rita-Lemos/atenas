import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import loadingestilos from '../css/loadingbranco.css'


class LoadingBranco extends Component {

    render() {
        return (
            <div className='a_BodyLoadingBranco'>
                <div className="wrapBranco">
                    <div className="loadingBranco">
                        <div className="bounceballBranco"></div>
                        <div className="textBranco">A CARREGAR</div>
                    </div>
                </div>

            </div>
        )
    }
}


export default LoadingBranco;
