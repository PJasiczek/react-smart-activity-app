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

export default class Map extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
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
      distanceFilter: 0,
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy"
      },
      androidProvider: "auto",
      interval: 5000,
      fastestInterval: 10000,
      maxWaitTime: 5000,
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1,
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
        const { latitude, longitud } = locations[0];
        const newCoordinate = {
          latitude,
          longitude
        };
        console.log({ newCoordinate });

        coordinate.timing(newCoordinate).start();
        this.setState({
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
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

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

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
  }
});
