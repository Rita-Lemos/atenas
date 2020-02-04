//Registo (imagem, nome, email e password)
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import login from '../css/register.css'
import uri from '../images/man-user.svg';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            email: '',
            username: '',
            password: '',
            msgErroEmail: "",
            msgErroUser: "",
            msgErroPass: "",
            msgErroPass2: "",
            bigError: null,
            file: '',
            imagePreviewUrl: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleBlurUser = this.handleBlurUser.bind(this);
        this.handleBlurPass = this.handleBlurPass.bind(this);
        this.handleBlurPass2 = this.handleBlurPass2.bind(this);

    }
    handleBlurPass2(event) {
        let value = event.target.value;
        this.setState({
            msgErroPass2: "",
        })
        if (value == "") {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroPass2: <div className="a_Validacao"><b>Confirme a password!</b></div>,
            })
        }
        if (this.state.password != value) {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroPass2: <div className="a_Validacao"><b>Password diferente!</b></div>,
            })
        }
    }
    handleBlurPass(event) {
        let value = event.target.value;
        this.setState({
            msgErroPass: "",
        })
        if (value.length >= 30) {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroPass: <div className="a_Validacao"><b>Password demasiado longa!</b></div>,
            })
        }
        if (value.length < 8) {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroPass: <div className="a_Validacao"><b>Password demasiado curta!</b><br />Insira pelo menos 8 caracteres!</div>,
            })
            if (value == "") {
                this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

                this.setState({
                    msgErroPass: <div className="a_Validacao"><b>Preencha a password!</b></div>,
                })
            }
        }
    }
    handleBlurUser(event) {
        let value = event.target.value;
        this.setState({
            msgErroUser: "",
        })
        if (value == "") {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroUser: <div className="a_Validacao"><b>Preencha o nome!</b></div>,
            })
        }
        if (value.length >= 30) {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroUser: <div className="a_Validacao"><b>Nome demasiado longo!</b></div>,
            })
        }
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if ((format.test(value)) == true) {
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            this.setState({
                msgErroUser: <div className="a_Validacao"><b>Nome demasiado longo!</b></div>,
            })
        }
    }
    handleBlur(event) {
        let value = event.target.value;
        this.setState({
            msgErroEmail: "",
        })
        axios.get('/api/users')
            .then(response => {
                let emails = response.data.data;
                emails.map((mail) => {
                    if (mail.email == value) {
                        this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

                        this.setState({
                            msgErroEmail: <div className="a_Validacao"><b>Email já registado!</b></div>,
                        })
                    }
                })
            })
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
            this.setState({
                msgErroEmail: <div className="a_Validacao"><b>Email inválido!</b></div>,
            })
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

            if (value == "") {
                this.setState({
                    msgErroEmail: <div className="a_Validacao"><b>Preencha o email!</b></div>,
                })
            }
            this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });

        }
    }
    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file);
    }

    onChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onChange2(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    }

    handleSeguinte(mensagem){
        if(mensagem == "") {
            window.location.href= "/personalizationcategory"
        }
        
    }

    fileUpload(file) {
        let data = new FormData();
        data.append('image', file);
        data.append('email', this.state.email);
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        axios
            .post('/api/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                this.setState({ bigError: "" });

                localStorage.setItem('user', response.data.user.id);
                localStorage.setItem('register', 1);
                this.handleSeguinte(this.state.bigError);
            })
            .catch(error => {
                console.log('erro', error);
                this.setState({ bigError: <div className="a_Validacao"><b>Registo inválido!</b> <br />Tente novamente.</div> });
                this.handleSeguinte(this.state.bigError);
            });
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img className="ImgUserRegisto" src={imagePreviewUrl} />);
        } else {
            imagePreview = (<img className="ImgUserRegisto" src={uri} />);
        }
        if (this.state.loggedIn) {
            window.location.href = "/main";
        }
        if (localStorage.getItem('user')) {
            return <Redirect to='/main' />;
        }
        
        return (
            <div id="RegisterPage">

                <form className="FormRegisto" onSubmit={this.onFormSubmit} >
                    <div className="UserRegisto">
                        {imagePreview}
                        <input type="file" id="file" className="inputfile" name="image" value={this.state.image} onChange={this.onChange} />
                        <label htmlFor="file">Choose a file</label>
                    </div>
                    <div className="TodosInput">
                        <div className="DivInput">
                            <img className="IconesInput" src={require('../images/user_total_preenchido .svg')} />
                            <input className="InputsRegisto" type="text" name="username" value={this.state.username} placeholder="username" onChange={this.onChange2} onBlur={this.handleBlurUser} />

                        </div>
                        {this.state.msgErroUser}
                        <div className="DivInput">
                            <img className="IconesInput" src={require('../images/email.svg')} />
                            <input className="InputsRegisto" type="text" name="email" value={this.state.email} placeholder="email" onChange={this.onChange2} onBlur={this.handleBlur} />

                        </div>
                        {this.state.msgErroEmail}
                        <div className="DivInput">
                            <img className="IconesInput" src={require('../images/password.svg')} />
                            <input className="InputsRegisto" type="password" name="password" value={this.state.password} placeholder="password" onChange={this.onChange2} onBlur={this.handleBlurPass} />

                        </div>
                        {this.state.msgErroPass}
                        <div className="DivInput">
                            <img className="IconesInput" src={require('../images/password.svg')} />
                            <input className="InputsRegisto" type="password" placeholder="confirmar pass" onBlur={this.handleBlurPass2} />
                        </div>
                        {this.state.msgErroPass2}
                    </div>
                    {this.state.bigError}
                    <input className="RegistoBtn" type="submit" value="seguinte" onClick={() =>this.handleSeguinte()} />
                </form>
            </div>
        )
    }

}

export default RegisterView;
