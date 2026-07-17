import ListofPlayers, { players } from "./Components/ListofPlayers";
import Scorebelow70 from "./Components/Scorebelow70";
import {
  IndianTeam,
  OddPlayers,
  EvenPlayers,
  IndianPlayers
} from "./Components/IndianPlayers";
import ListofIndianPlayers from "./Components/ListofIndianPlayers";

function App() {
  const flag = false; 
  if (flag) {
    return (
      <div>
        <h1>List of Players</h1>
        <ListofPlayers players={players} />
        <hr />
        <h1>List of Players having Scores Less than 70</h1>
        <Scorebelow70 players={players} />
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>Odd Players</h1>
        {OddPlayers(IndianTeam)}
        <hr />
        <h1>Even Players</h1>
        {EvenPlayers(IndianTeam)}

        <hr />

        <h1>List of Indian Players Merged</h1>

        <ListofIndianPlayers IndianPlayers={IndianPlayers} />

      </div>

    );

  }

}

export default App;