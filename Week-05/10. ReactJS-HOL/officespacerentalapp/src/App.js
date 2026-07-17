import office from "./office.jpg";

function App() {

  const officeSpaces = [

   {
    Name: "SmartWorks",
    Rent: 45000,
    Address: "Hyderabad",
    Image: office
  }
  ];

  return (

    <div style={{ marginLeft: "80px" }}>

      <h1>Office Space, at Affordable Range</h1>

      {

        officeSpaces.map((item, index) => (
          <div key={index}>
            <img
              src={item.Image}
              alt="Office Space"
              width="25%"
              height="25%"
            />
            <h2>Name: {item.Name}</h2>
            <h3
              style={{
                color: item.Rent <= 60000 ? "red" : "green"
              }}
            >
              Rent: Rs. {item.Rent}
            </h3>
            <h3>Address: {item.Address}</h3>
            <br />
          </div>
        ))
      }
    </div>
  );
}

export default App;