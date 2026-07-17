import CalculateScore from "./Components/CalculateScore";

function App() {
  return (
    <div>
      <CalculateScore
        name="Dinesh Padala"
        college="PVPSIT"
        total={284}
        goal={300}
      />
    </div>
  );
}

export default App;