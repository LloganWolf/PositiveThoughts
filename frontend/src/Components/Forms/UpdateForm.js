import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import history from '../../History';
import { ENDPOINT } from '../../Constantes';

class UpdateForm extends Component {
    constructor(props) {
		super(props);
        this.state = {
			logged_in:  this.props.userDatas[this.props.userDatas.length-1] ? true : false,
			token:      this.props.userDatas[this.props.userDatas.length-1] ? this.props.userDatas[this.props.userDatas.length-1].result.token : "",
            id: this.props.id,
            title: "",
            category: "",
            content: "",
            success_message: false,
            error_message: "",
        }
    }

    componentDidMount() {
        if(this.props.userDatas[this.props.userDatas.length-1] !== undefined) {
          axios.get(`${ENDPOINT}/messages/${this.state.id}`)
              .then(res => {
                  this.setState({
                    title: res.data.result.title,
                    category: res.data.result.category,
                    content: res.data.result.content,
                  })
                })
                .catch(err => {
                    console.log(err)
                  this.setState({
                      error_message: err.message,
                  })
                })
        } else {
            return history.push('/');
        }
          
    }

    handleChange = event => {
		const value = event.target.value;
        const name = event.target.name;

        this.setState({
          [name]: value
        })
    }

    handleReset = () => {
        this.setState({ 
            title: "",
            category: "",
            content: "",
        })
    }

    handleSubmit = (event, data) => {
        event.preventDefault();

        axios.put(`${ENDPOINT}/messages/${this.state.id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.state.token,
                }

            }).then(res => {
                if(res.status === 200) {
                    this.setState({
                        success_message: true,
                    })
                }

            }).catch(err => {
                this.setState({
                    error_message: err.message,
                })
        })	
    }

    render() {
        let { title, category, content, success_message, error_message } = this.state
        if(success_message) {
            return <Redirect push to={`/home`} />
        }

        return (
            <form className="form-horizontal" onSubmit={e => this.handleSubmit(e, this.state)} onReset={this.handleReset}>
                <div className="form-group">
                    <label className="control-label col-md-3" htmlFor="message_title">Titre</label>
                    <div className="col-md-9">
                        <input id="message_title" name="title" type="text" className="form-control" required="required" value={title} onChange={this.handleChange} />
                    </div>
                </div>   

                <div className="form-group">
                    <label className="control-label col-md-3" htmlFor="message_category">Catégorie</label>
                    <div className="col-md-9">                               
                        <select id="message_category" name="category" className="form-control" value={category} onChange={this.handleChange}>
                            <option value="">&nbsp;</option>
                            <option value="Pensée">Pensée</option>
                            <option value="Croyance">Croyance</option>
                            <option value="Motivation">Motivation</option>
                            <option value="Message">Message</option>
                        </select>  
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-3" htmlFor="message_content">Contenu</label>
                    <div className="col-md-9">
                        <textarea id="message_content" name="content" rows="10" className="form-control" required="required" value={content} onChange={this.handleChange} placeholder="Contenu du message"></textarea>
                    </div>
                </div>

                {success_message &&
                <div className="alert alert-success" role="alert">
                    Votre message a bien été modifié
                </div>
                }

                {error_message !== "" &&
                <div className="alert alert-danger" role="alert">
                    Erreur lors de la modification du message
                </div>
                }

                <div className="form-group">
                    <div className="col-md-3 col-md-offset-3"> 
                        <button id="publication" name="publication" type="submit" className="btn cb-bouton_connexion">Modifier</button>
                    </div>
                    <div className="col-md-3"> 
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
  
export default connect(mapStateToProps)(UpdateForm);