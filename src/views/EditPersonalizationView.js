//Para edição dos dados do utilizador, assim como da sua personalização
import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import axios from "axios";
import InfoUser from '../components/InfoUser';
import editcss from '../css/edit.css';

class EditPersonalizationView extends Component {
    render() {
        if (!localStorage.getItem('user')) {
            return <Redirect to='/session' />;
        }
        return(
            
                <div style={{ backgroundColor:'rgb(215,20,36)', height:'100%'}}>
                    <InfoUser />
                </div>
            );



    }
}

export default EditPersonalizationView;
