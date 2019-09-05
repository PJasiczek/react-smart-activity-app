import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import { DrawerActions } from "react-navigation";
import RNLocation from "react-native-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";

import haversine from "haversine";
import moment from "moment";

const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;
const LATITUDE = 0;
const LONGITUDE = 0;

export default class ActivityMap extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      altitude: 0,
      speed: 0,
      routeCoordinates: [],
      distanceTravelled: this.props.navigation.state.params.distance,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  componentWillMount() {
    const { coordinate } = this.state;
    RNLocation.configure({
      distanceFilter: 0, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
      },
      // Android only
      androidProvider: "auto",
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: "portrait",
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false
    })
      .then(() =>
        RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "fine",
            rationale: {
              title: "Location permission",
              message:
                "Zezwolić aplikacji na dostep do informacji o lokalizacji tego urządzenia",
              buttonPositive: "Zezwól",
              buttonNegative: "Odmów"
            }
          }
        })
      )
      .then(granted => {
        if (granted) {
          this._startUpdatingLocation();
        }
      });

    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude, altitude, speed } = locations[0];
        const newCoordinate = {
          latitude,
          longitude,
          altitude,
          speed
        };
        console.log({ newCoordinate });

        coordinate.timing(newCoordinate).start();

        this.setState({
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
          altitude: locations[0].altitude,
          speed: locations[0].speed,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          prevLatLng: newCoordinate
        });
      }
    );
  }

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0] });
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  render() {
    const { location } = this.state;
    const { coordinate } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline
            coordinates={this.state.routeCoordinates}
            strokeColor={"rgba(10, 124, 255, 0.95)"}
            lineCap={"round"}
            lineJoin={"round"}
            strokeWidth={5}
          />
          <Marker.Animated
            title={"Piotrek"}
            description={"Twoje obecne położenie"}
            pinColor={"green"}
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        {this.state.show ? (
          <View style={styles.top_container}>
            <View style={[styles.inner_container, styles.button]}>
              <View style={styles.inner_top_container}>
                <View style={styles.inner_top_top_container} />
                <View style={styles.inner_top_bottom_container}>
                  <Text style={styles.distance}>
                    {parseFloat(this.state.distanceTravelled).toFixed(2)}{" "}
                    <Text style={styles.distance_label}>km</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.inner_bottom_container}>
                <View style={styles.inner_top_left_container}>
                  <Text style={styles.inner_value}>0 min/km</Text>
                  <Text style={styles.inner_label}>Śr. tempo</Text>
                </View>
                <View style={styles.inner_top_middle_container}>
                  <Text style={styles.inner_value}>
                    {parseFloat(this.state.speed).toFixed(2)} km/h
                  </Text>
                  <Text style={styles.inner_label}>Prędkość</Text>
                </View>
                <View style={styles.inner_top_right_container}>
                  <Text style={styles.inner_value}>
                    {parseFloat(this.state.altitude).toFixed(2)} m n.p.m.
                  </Text>
                  <Text style={styles.inner_label}>Wysokość</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
          style={styles.menu_open}
        >
          <Image
            style={styles.menu_button}
            source={require("../../assets/images/icons/menu.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.ShowHideComponent}
          style={styles.details_open}
        >
          <Icon name="run" style={styles.details_button} size={25} />
        </TouchableOpacity>
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
  },
  top_container: {
    flexDirection: "row",
    marginVertical: 30,
    backgroundColor: "transparent"
  },
  inner_container: {
    flex: 1,
    height: 240,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  inner_top_container: {
    width: "100%",
    height: "60%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inner_top_top_container: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_top_bottom_container: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap"
  },
  inner_bottom_container: {
    width: "100%",
    height: "40%",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inner_top_left_container: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_top_middle_container: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_top_right_container: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  menu_button: {
    width: 25,
    height: 25,
    zIndex: 2
  },
  menu_open: {
    position: "absolute",
    width: 40,
    height: 40,
    left: 10,
    top: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  },
  details_button: {
    width: 25,
    height: 25,
    zIndex: 2
  },
  details_open: {
    position: "absolute",
    width: 40,
    height: 40,
    right: 10,
    top: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  },
  distance: {
    color: "#ffffff",
    fontFamily: "Quicksand-Light",
    fontSize: 40
  },
  distance_label: {
    color: "#ffffff",
    fontFamily: "Quicksand-Light",
    fontSize: 20
  },
  inner_value: {
    color: "#ffffff",
    fontFamily: "Quicksand-Light",
    fontSize: 17
  },
  inner_label: {
    color: "#777777",
    fontFamily: "Quicksand-Light",
    fontSize: 11
  }
});
