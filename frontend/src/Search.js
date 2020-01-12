import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Grid from "@material-ui/core/Grid";
import DataGraph from "./componetns/DataGraph";

const Map = ReactMapboxGl({
  scrollZoom: false,
  interactive: false,
  accessToken:
    "pk.eyJ1IjoidG9reW9qYWNrIiwiYSI6ImNrNWE1MWhzZjE2ODAza280enRobG9obHEifQ.PC30cobNt4J9mEanFnSGtA"
});

const data = {
  places: [
    {
      name: "toronto",
      lat: 43.65107,
      long: -79.347015,
      salary: 30000,
      cost_of_living: 1000,
      safety_rating: 5
    },
    {
      name: "vancouver",
      lat: 49.246292,
      long: -123.116226,
      salary: 8000,
      cost_of_living: 2000,
      safety_rating: 9
    },
    {
      name: "montreal",
      lat: 45.508888,
      long: -73.561668,
      salary: 1000,
      cost_of_living: 1500,
      safety_rating: 3
    }
  ]
};

function getData(variableName) {
  let graphData = [];

  data.places.forEach(place => {
    graphData.push({
      name: place.name,
      data: place[variableName]
    });
  });

  return graphData;
}

export class Search extends Component {
  state = {
    selected: undefined,
    hover: undefined
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Grid container spacing={0}>
          <Grid item xs={3} style={{ border: "1px solid red" }}>
            <h1>item</h1>
          </Grid>
          <Grid item xs={6} style={{ border: "1px solid blue" }}>
            <div style={this.state.hover ? { cursor: "pointer" } : {}}>
              <Map
                //eslint-disable-next-line
                style="mapbox://styles/mapbox/outdoors-v10"
                containerStyle={{
                  height: "90vh"
                }}
                center={[-100, 61.0]}
                zoom={[2]}
              >
                {data.places.map(place => {
                  const name = place.name;
                  return (
                    <Layer
                      type="symbol"
                      key={name}
                      id={name}
                      layout={{
                        "icon-image": "school-15",
                        "icon-size":
                          this.state.hover === name ||
                          this.state.selected === name
                            ? 1.5
                            : 1.0
                      }}
                    >
                      <Feature
                        coordinates={[place.long, place.lat]}
                        onClick={obj => {
                          this.setState({ selected: name });
                        }}
                        onMouseEnter={obj => {
                          this.setState({ hover: name });
                        }}
                        onMouseLeave={obj => {
                          this.setState({ hover: undefined });
                        }}
                      />
                    </Layer>
                  );
                })}
              </Map>
            </div>
          </Grid>
          <Grid item xs={3} style={{ border: "1px solid orange" }}>
            {this.state.selected && (
              <div>
                <p><bOSelected: {this.state.selected}</p>
                <p>Salary</p>
                <DataGraph
                  data={getData("salary")}
                  name={this.state.selected}
                />
                <p>Cost of living</p>
                <DataGraph
                  data={getData("cost_of_living")}
                  name={this.state.selected}
                />
                <p>Safety</p>
                <DataGraph
                  data={getData("safety_rating")}
                  name={this.state.selected}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
