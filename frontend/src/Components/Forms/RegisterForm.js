import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../../Constantes';


class RegisterForm extends Component {
    constructor(props) {
		super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            error_message: "",
            success_message: "",
        }
    }

    handleChange = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    handleReset = () => {
        this.setState({ 
            login: '',
            email: '',
            password: '',
        })
    }

    handleLogon = (event, data) => {
        event.preventDefault();
        axios.post(`${ENDPOINT}/users/signup`, data)
             .then(res => {
                this.setState({
                    success_message: res.data.message,
                })

            }).catch(err => {
                this.setState({
                    error_message: err.message,
                })
            });
    }
    
    render() {
        const {login, email, password, success_message, error_message} = this.state;

        return (
            <form name="registerForm" onSubmit={e => this.handleLogon(e, this.state)} onReset={this.handleReset}>
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="cb-color_green" style={{textAlign: 'center'}}><b>FORMULAIRE D'INSCRIPTION</b></h3>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="register_login">Login <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="register_login" name="login" type="text" className="form-control" required="required" value={login} onChange={this.handleChange} placeholder="Identifiant de l'utilisateur" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="register_email">Email <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="register_email" name="email" type="email" className="form-control" required="required" value={email} onChange={this.handleChange} placeholder="Email de l'utilisateur" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="register_password">Mot de passe <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="register_password" name="password" type="password" className="form-control" required="required" value={password} onChange={this.handleChange} placeholder="Mot de passe de l'utilisateur" />
                        </div>
                    </div>
                </div>
                
                {
                    success_message !== "" &&
                    <div className="alert alert-info" role="alert">
                        Votre profil a bien été enregistré ! Connectez-vous !
                    </div>
                }
                
                {
                    error_message !== "" &&
                    <div className="alert alert-danger" role="alert">
                        {error_message}
                    </div>
                }
                <br />

                <div className="form-group">
                    <div className="col-md-3 col-xs-3">
                        <button id="registration" name="registration" type="submit" className="btn cb-bouton_inscription">Valider</button>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <Link to={'/'} className="btn cb-bouton_connexion" style={{marginTop: '0%', textDecoration: 'none'}}>Connexion</Link>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <input type="reset" className="btn cb-bouton_initialisation" />
                    </div>
                </div>
            </form>    
        )
    }

}

export default RegisterForm