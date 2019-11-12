import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeoutUserToken } from '../Store/Reducers/Actions/action_list';

import PropTypes from 'prop-types';

import Header from "../Components/Commons/Header";
import Navbar from "../Components/Commons/Navbar";
import Title from "../Components/Commons/Title";

import history from '../History';
import MessagesList from '../Components/Messages/MessagesList';

Title.propTypes = {
  titre: PropTypes.string,
  accroche: PropTypes.string,
}

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			logged_in:  this.props.userDatas[this.props.userDatas.length-1] ? true : false,
			token:      this.props.userDatas[this.props.userDatas.length-1] ? this.props.userDatas[this.props.userDatas.length-1].result.token : "",
		};
  }

  componentDidMount() {
    const { logged_in, token } = this.state
	
	// If token expired, automaticcally logout
	if(token !== "" ) {
	  this.props.timeoutUserToken(token);
	}
	
	if(!logged_in) {
      return history.push('/');
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Navbar />
        
        <div className="content">
          <div className="container">
            <Title titre="Mes messages" accroche="Retrouver tous vos messages" />
            
            <div className="row">
              <MessagesList />
            </div>
          
          </div>
        </div>

      </Fragment>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userDatas: state.users.userDatas
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
      timeoutUserToken
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

