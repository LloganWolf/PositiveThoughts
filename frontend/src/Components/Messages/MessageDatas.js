import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { ENDPOINT } from '../../Constantes';

class MessageDatas extends Component {
    constructor(props) {
		super(props);
		this.state = {
			logged_in:  this.props.userDatas[this.props.userDatas.length-1] ? true : false,
			token:      this.props.userDatas[this.props.userDatas.length-1] ? this.props.userDatas[this.props.userDatas.length-1].result.token : "",
            error_message: "",
            success_message: false,
		};
    }
  
    handleSuppress = (id) => {
        axios
            .delete(`${ENDPOINT}/messages/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.state.token
                }
            }).then(res => {
                this.setState({
                    success_message: true,
                })
            }).catch(err => {
                console.log(err.message)
                this.setState({
                    error_message: err.message,
                })
            })

    }

    render() {
        const { id, title, category, creationDate, modificationDate, content } = this.props
        const { success_message, error_message} = this.state

        if(success_message) {
            return <Redirect push to={`/home`} />
        }

        return (
            <div className="row">
                <div className="col-md-8 col-sm-8">
                    <div className="posts">
                        <div className="entry">
                            <h2>{title}</h2>

                            <div className="meta clearfix">
                                <i className="fa fa-folder-open"></i> {category} <span className="pull-right"><i className="fa fa-calendar"></i> Créé le { moment(new Date(creationDate)).locale('fr').format('DD MMMM YYYY') }</span>
                            </div>
                            
                            <div className="bthumb2">
                                <a href="/"><img src="img/photos/3.jpg" alt=""/></a>
                            </div>
                            
                            <p>{content}</p>

                        </div>
                        <div className="post-foot well">    
                            <div className="social">
								{
									modificationDate ? (
										<p>Modifié le { moment(new Date(modificationDate)).locale('fr').format('DD/MM/YYYY') }</p>
									):(
									<p>Aucune modification enregistrée</p>
									)
								}
                            </div>
                        </div>
                        {error_message !== "" &&
                        <div className="alert alert-danger" role="alert">
                            Erreur lors de la suppression du message : {error_message}
                        </div>
                        } 
                    </div>
                </div>
                
                <div className="col-md-4 col-sm-4">
                    <div className="sidebar">
                    
                        <div className="widget">
                            <h4>ACTIONS</h4>
                            <div className="input-group">
                                <span className="input-group-btn" style={{ textAlign: "center" }}>
                                    <Link to={`/messages/update/${id}`} className="btn cb-bouton_jaune" style={{marginTop: '0%', textDecoration: 'none'}}>Modifier</Link>
                                    <button type="submit" className="btn cb-bouton_initialisation" style={{ margin: "0% 2%" }} onClick={() => this.handleSuppress(id)}>Supprimer</button>
                                </span>
                            </div>
                        </div>                         
                    </div>                                                
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userDatas: state.users.userDatas
    }
}
  
export default connect(mapStateToProps)(MessageDatas);