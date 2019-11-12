import React, {Component, Fragment} from 'react';
import { readAllMessages } from '../../Store/Reducers/Actions/action_list';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import MessagesItem from "./MessagesItem";
import history from '../../History';

import { ENDPOINT } from '../../Constantes';

MessagesItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  creationDate: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
}

class MessagesList extends Component {
  constructor(props) {
		super(props);
		this.state = {
			token:    this.props.userDatas[this.props.userDatas.length-1] ? this.props.userDatas[this.props.userDatas.length-1].result.token : "",
			messages: [],
		};
  }

  componentDidMount() {
    if(this.props.userDatas[this.props.userDatas.length-1] || this.props.userDatas[this.props.userDatas.length-1] !== undefined) {
      axios.get(`${ENDPOINT}/messages/`, {
        headers: {
          'Authorization': this.state.token,
        }
      }).then(res => {
          
          this.setState({
            messages: res.data.result,
          })
        })
    } else {
		return history.push('/');
	}
  }

  render() {
    let { messages } = this.state
    
    return (
      <Fragment>
        {
          messages &&
            messages.map(message => {
              const { id, title, category, content, created_at} = message
              
              return(
                <div key={id} className="col-md-6 col-sm-6">
                  <MessagesItem title={title}
                    creationDate={created_at}
                    author={this.props.userDatas[this.props.userDatas.length-1].result.login_user}
                    category={category}
                    content={content}
                    id={id} />
                </div>
              )
            })
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      userDatas: state.users.userDatas
  }
}

export default connect(mapStateToProps)(MessagesList);
