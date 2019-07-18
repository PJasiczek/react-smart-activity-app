import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";

export default class Settings extends Component {
  static navigationOptions = {
    header: null
  };
  getMapRegion = () => ({
    latitude: 24,
    longitude: 24,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09
  });
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
