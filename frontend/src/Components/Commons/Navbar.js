import React, {Component} from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {

    render() {
        return(
            <div className="navbar bs-docs-nav" role="banner">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                   
                    <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="/" className="dropdown-toggle" data-toggle="dropdown">Messages <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/home">Toutes mes messages</a></li>
                                    <li><a href="/messages/create">Créer un message</a></li>
                                </ul>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {userDatas: state.userDatas}
}

export default connect(mapStateToProps)(Navbar);