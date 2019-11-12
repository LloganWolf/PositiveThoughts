import React from 'react';
import moment from 'moment';

const MessagesItem = (props) => {
    const { creationDate, category, title, id } = props
    const contenu = props.content.length > 100 ? props.content.substring(0, 100) + ' [...]' : props.content

    return(
        <div className="time">
            <div className="tidate b-green"> <i className="fa fa-envelope"></i> Créé le { moment(new Date(creationDate)).format('DD/MM/YYYY') } | {category}</div>
            <div className="timatter">
                <h4 className="color" style={{ textAlign: "center" }}>{title}</h4>
                <p style={{ textAlign: "justify", margin: "2% 6%" }}> {contenu} </p>
                
                <div className="button" style={{ textAlign: "center", margin: "5% 0% 2%" }}>
                    <a href={`/messages/${id}`}>Voir le message...</a>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
    )
}

export default MessagesItem