import React from "react";
export const IndianTeam = [
    "Sachin",
    "Dhoni",
    "Virat",
    "Rohit",
    "Yuvraj",
    "Raina"
];
export function OddPlayers([first, , third, , fifth]) {
    return (
        <div>
            <p>First : {first}</p>
            <p>Third : {third}</p>
            <p>Fifth : {fifth}</p>
        </div>

    );

}

export function EvenPlayers([, second, , fourth, , sixth]) {
    return (
        <div>
            <p>Second : {second}</p>
            <p>Fourth : {fourth}</p>
            <p>Sixth : {sixth}</p>
        </div>

    );

}

const T20Players = [
    "First Player",
    "Second Player",
    "Third Player"
];

const RanjiPlayers = [
    "Fourth Player",
    "Fifth Player",
    "Sixth Player"
];

export const IndianPlayers = [
    ...T20Players,
    ...RanjiPlayers
];