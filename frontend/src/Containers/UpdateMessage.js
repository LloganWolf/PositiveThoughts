import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from "../Components/Commons/Header";
import Navbar from "../Components/Commons/Navbar";
import Title from "../Components/Commons/Title";
import UpdateForm from "../Components/Forms/UpdateForm";

import history from '../History';

UpdateForm.propTypes = {
  id: PropTypes.number,
}

class UpdatePost extends Component {
  constructor(props) {
		super(props);
		this.state = {
      id_message: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/")+1),
		};
  }

  render() {
    const {id_message} = this.state

    if(!this.props.userDatas[this.props.userDatas.length-1]) {
        return history.push('/');
    }
    
    return (
      <Fragment>
        <Header />
          
        <Navbar />

        <div className="content">
          <div className="container">
            <Title titre="Modifier son message" accroche="Mettre son message aux goûts du jour" />    
            <div className="row make-post">
              <div className="col-md-8 col-sm-8">
                <div className="formy">
                  <UpdateForm id={id_message}/>
                </div>
              </div>
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

export default connect(mapStateToProps)(UpdatePost);