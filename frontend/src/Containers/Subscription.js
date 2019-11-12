import React, {Component} from 'react';
import RegisterForm from '../Components/Forms/RegisterForm';

class Subscription extends Component {

    render() {
        return (
            <div className="container content-wrapper">
                <div className="row cb-cadre_form">

                    <div className="col-md-6 cb-cadre_titre">
                        <p className="cb-titre cb-color_green">Messages<br/><br/><br/><span className="cb-effet"> Positifs</span></p>
                    </div>

                    <div className="col-md-6">
                        <div className="content-article">
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <RegisterForm />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default Subscription