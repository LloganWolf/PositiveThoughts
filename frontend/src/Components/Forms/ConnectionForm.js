import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserCredential } from '../../Store/Reducers/Actions/action_list';
import history from "../../History";


class ConnectionForm extends Component {
    constructor(props) {
		super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            error_message: "",
        }
    }

    componentDidUpdate() {
        const {userDatas} = this.props

        if(userDatas[userDatas.length-1] && userDatas[userDatas.length-1].status === "success") {
            history.push('/home');
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

    handleLogin = (e, data) => {
        e.preventDefault();
        try {
            this.props.addUserCredential(data);
            
        } catch(err) {
            console.log(`erreur : ${err}`)
        }
    }
    
    render() {
        const {login, email, password} = this.state;
        const {userDatas} = this.props

        return (
            <form name="connexionForm" onSubmit={e => this.handleLogin(e, this.state)} onReset={this.handleReset}>
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="cb-color_green" style={{textAlign: 'center'}}><b>FORMULAIRE DE CONNEXION</b></h3>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="connect_login">Login <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="connect_login" name="login" type="text" className="form-control" required="required" value={login} onChange={this.handleChange} placeholder="Identifiant de l'utilisateur" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="connect_email">Email <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="connect_email" name="email" type="email" className="form-control" required="required" value={email} onChange={this.handleChange} placeholder="Email de l'utilisateur" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe <sup className="cb-asterisque"><i className="fa fa-asterisk"></i></sup></label>
                            <input id="connect_password" name="password" type="password" className="form-control" required="required" value={password} onChange={this.handleChange} placeholder="Mot de passe de l'utilisateur" />
                        </div>
                    </div>
                </div>
                
                { 
                userDatas[userDatas.length-1] && userDatas[userDatas.length-1].status === "error" &&
                <div className="alert alert-danger" role="alert">
                    Vos informations de connexion <strong>sont erronées</strong>
                </div>
                }
                <br />

                <div className="form-group">
                    <div className="col-md-3 col-xs-3">
                        <button id="connexion" name="connexion" type="submit" className="btn cb-bouton_connexion">Se connecter</button>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <Link to={'/register'} className="btn cb-bouton_inscription" style={{marginTop: '0%', textDecoration: 'none'}}>Inscription</Link>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <input type="reset" className="btn cb-bouton_initialisation" />
                    </div>
                </div>
            </form>    
        )
    }

}

const mapStateToProps = (state) => {
    return {
        userDatas: state.users.userDatas
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        addUserCredential
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionForm)