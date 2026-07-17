import React from "react";
function ListofIndianPlayers(props) {
    return (
        <ul>
            {
                props.IndianPlayers.map((item, index) => (
                    <li key={index}>
                        Mr. {item}
                    </li>
                ))
            }

        </ul>

    );

}

export default ListofIndianPlayers;