//Login
import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import login from '../css/login.css'


class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            bigError: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
    }
    handleSeguinte(mensagem) {
        if (mensagem == "") {
            window.location.href = "/main"
        }

    }
    render() {


        if (localStorage.getItem('user')) {
            return <Redirect to='/main' />;
        }
        return (
            <div id='BodyLogin'>
                <div>
                    <img id='LogoLogin' src={require('../images/negativo .png')} />
                    <form style={{ marginTop: 50 }} onSubmit={this.submit}>
                        <div className="Email">
                            <img className="EmailLogo" src={require('../images/email.svg')} />
                            <input className="EmailInput" type="text" name="email" value={this.state.email} placeholder="email" onChange={this.handleChange} />
                        </div>
                        <div className="Pass">
                            <img className="PassLogo" src={require('../images/password.svg')} />
                            <input className="PassInput" type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleChange} />
                        </div>
                        {this.state.bigError}
                        <input className="LoginBtn" type="submit" value="login" onClick={() => this.handleSeguinte()} />
                    </form>

                    <p className="RegistarAqui">Ainda não tem conta?<a href='/registo'> Registe-se Aqui!</a></p>
                </div>
            </div>

        )
    }
    submit(e) {
        e.preventDefault();

        window.axios.post('/api/login', { email: this.state.email, password: this.state.password })
            .then(response => {
                this.setState({ bigError: "" });
                this.handleSeguinte(this.state.bigError);
                localStorage.setItem('user', response.data.user.id);
            })
            .catch(error => {
                this.setState({ bigError: <div className="a_Validacao"><b>Password ou email inválidos!</b><br />Tente novamente.</div> });
                this.handleSeguinte(this.state.bigError);
            })
            ;
    }
}

export default LoginView
