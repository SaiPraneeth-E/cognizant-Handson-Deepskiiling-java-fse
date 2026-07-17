import React from "react";
function Scorebelow70(props) {
    const players70 = props.players.filter(
        player => player.score <= 70
    );
    return (
        <ul>{ players70.map((item, index) => (<li key={index}>  Mr. {item.name} {item.score}</li> )) } </ul>
    );
}

export default Scorebelow70;