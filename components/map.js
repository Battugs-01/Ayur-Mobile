import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

const mode = "driving"; // 'walking';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      MARKERS: null,
      coords: null,
      origin: "22.9962,72.5996",
      destination: "23.0134,72.5624",
      destMarker: "",
      startMarker: "",
      imageloaded: false
    };
  }

  componentDidMount() {
    this.getRoutePoints(this.state.origin, this.state.destination);
  }

  // Rest of your code...

  render() {
    return (
      <View style={styles.container}>
        {this.state.coords != null ? (
          <MapView
            ref={(ref) => {
              this.mapRef = ref;
            }}
            style={styles.map}
            onLayout={() => this.fitAllMarkers()}>
            {/*used to draw line on route point of locations*/}
            <MapView.Polyline coordinates={this.state.coords} strokeWidth={2} />

            {/*start point marker*/}
            <MapView.Marker key={1} coordinate={this.state.startMarker} />

            {/*end point marker*/}
            <MapView.Marker key={2} coordinate={this.state.destMarker} />
          </MapView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
