import React, {Component} from 'react';
import history from "../../History";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeUserCredential } from '../../Store/Reducers/Actions/action_list';

class Header extends Component {
  constructor(props) {
		super(props);
		this.state = {
			logged_in: this.props.logged_in
		};
  }

  handle_logout = (event) => {
    event.preventDefault();
    try {
      this.props.removeUserCredential(this.props.userDatas);
          
    } catch(err) {
        console.log(`erreur : ${err}`)
    }

    this.setState({
        logged_in: false,
    });

    history.push('/');
  };
  
  render() {
    return(
        <header>
          <div className="container">
            <div className="row">
              
              <div className="col-md-4 col-sm-6">
                <div className="logo">
                  <h1><a href="/home">Pensées <span className="color">positives</span></a></h1>
                  <div className="hmeta">Gardez en tête toutes vos pensées positives</div>
                </div>
              </div>
              {/* <Recherche />  A SUPPRIMER*/}
               <div className="col-md-3 col-md-offset-3 col-sm-4">
                
                 <form className="form-inline">
                  <div className="form-group">
                    <input type="text" className="form-control" id="search" placeholder="Recherche..." />
                  </div>
                  <button type="submit" className="form-control btn cb-bouton_vert"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form> 
                
              </div>
              
			  <div className="col-md-1 col-sm-1">
                <form onSubmit={e => this.handle_logout(e)}>
                  <button id="deconnexion" type="submit" className="btn cb-bouton_vert"><i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </form>
              </div>
            </div>
          </div>
        </header>
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
      removeUserCredential
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)