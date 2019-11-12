import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { timeoutUserToken } from '../Store/Reducers/Actions/action_list';
import PropTypes from 'prop-types';

import Header from "../Components/Commons/Header";
import Navbar from "../Components/Commons/Navbar";
import MessageDatas from '../Components/Messages/MessageDatas';

import { ENDPOINT } from '../Constantes';

MessageDatas.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  category: PropTypes.string,
  creationDate: PropTypes.string,
  modificationDate: PropTypes.string,
  content: PropTypes.string,
}

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      identifiant:      this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/")+1),
      logged_in:        this.props.userDatas[this.props.userDatas.length-1] ? true : false,
      token:            this.props.userDatas[this.props.userDatas.length-1] ? this.props.userDatas[this.props.userDatas.length-1].result.token : "",
      id:               "",
      title:            "",
      category:         "",
      creationDate:     "",
      modificationDate: "",
      content:          "",
      error_message:    "",
		};
  }

  componentDidMount() {
    axios.get(`${ENDPOINT}/messages/${this.state.identifiant}`)
        .then(res => {
            this.setState({
              id: res.data.result.id,
              title: res.data.result.title,
              category: res.data.result.category,
              creationDate: res.data.result.created_at,
              modificationDate: res.data.result.modified_at,
              content: res.data.result.content,
            })
          })
          .catch(err => {
            this.setState({
                error_message: err.message,
            })
          })
  }

  render() {
    const { id, title, category, creationDate, modificationDate, content } = this.state
    
    return (
      <Fragment>
        <Header />
        <Navbar />
        
        <div className="content">
          <div className="container">
            
            <div className="row">
              <MessageDatas id={id} title={title} category={category} creationDate={creationDate} modificationDate={modificationDate} content={content} />
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

