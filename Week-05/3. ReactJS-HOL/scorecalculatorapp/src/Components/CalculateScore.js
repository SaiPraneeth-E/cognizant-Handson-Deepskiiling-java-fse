import React from "react";
import "../Stylesheets/mystyle.css";

function CalculateScore(props) {

    const score = ((props.total / props.goal) * 100).toFixed(2);

    return (
        <div className="container">

            <h1>Student Details:</h1>

            <h2 className="name">
                Name: <span>{props.name}</span>
            </h2>

            <h2 className="school">
                College: <span>{props.college}</span>
            </h2>

            <h2 className="total">
                Total: <span>{props.total}Marks</span>
            </h2>

            <h2 className="score">
                Score:<span>{score}%</span>
            </h2>

        </div>
    );
}

export default CalculateScore;