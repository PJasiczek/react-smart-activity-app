import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  ListView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Dimensions,
  ToastAndroid
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import RNLocation from "react-native-location";
import { DrawerActions } from "react-navigation";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Toast from "@remobile/react-native-toast";
import { Dialog, ConfirmDialog } from "react-native-simple-dialogs";
import haversine from "haversine";
import moment from "moment";
import "moment/locale/pl";

import WeatherInfo from "./WeatherInfo";
import ActivityDetails from "./ActivityDetails";

const { width, height } = Dimensions.get("window");

var converter = require("hex2dec");

const LATITUDE_DELTA = 0.0005;
const LONGITUDE_DELTA = 0.0005;
const LATITUDE = 0;
const LONGITUDE = 0;

export default class ActivityInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.manager = new BleManager();
    global.isActivityVisible = false;
    global.stoperActivityTime = "";
    global.altitude = null;
    global.distance = 0;
    global.speed = 0;
    global.pace = 0;
    global.max_speed = 0;
    global.max_pace = 0;
    global.routeCoordinates = [];
    global.latitude = LATITUDE;
    global.longitude = LONGITUDE;
    global.coordinate = new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0
    });
    this.state = {
      userId: this.props.navigation.state.params.id,
      readCharacteristicsId: null,
      startActivityTimerId: null,
      fetchWeatherId: null,
      isWatchReady: false,
      confirmDialogVisible: false,
      isActivityReady: false,
      activityTimer: "3",
      activityDate: "",
      date: "",
      stoper: "",
      backgroundImageSource: this.props.navigation.state.params
        .backgroundImageSource,
      activityType: this.props.navigation.state.params.activityType,
      name: this.props.navigation.state.params.name,
      info: "",
      paceDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      heightIncreaseDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      heartBeatDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      speedDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      start_distance: 0,
      limitedDistance: this.props.navigation.state.params.limitedDistance,
      steps: 0,
      start_steps: 0,
      limitedSteps: this.props.navigation.state.params.limitedSteps,
      calories: 0,
      start_calories: 0,
      limitedCalories: this.props.navigation.state.params.limitedCalories,
      poolLengths: this.props.navigation.state.params.poolLengths,
      heart: null,
      max_heart_beat: null,
      min_heart_beat: null,
      isLoading: true,
      id: 0,
      iDay: true,
      description: null,
      location: null,
      temperature: 0,
      tempMin: 0,
      tempMax: 0,
      wind: 0,
      visibility: 0,
      direction: null,
      cloudy: 0,
      humidity: 0,
      pressure: 0,
      weatherCondition: null,
      sunset: 0,
      dateTimestamp: 0,
      error: null,
      speed: 0,
      distanceTravelled: 0,
      prevLatLng: {},
      stopwatchStart: false,
      stopwatchReset: false
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime(time) {
    this.currentTime = time;
    var crrTime = this.currentTime;
    var seconds = crrTime.slice(6, 8);
    var minutes = crrTime.slice(3, 5);
    var hours = crrTime.slice(0, 2);
    global.stoperActivityTime =
      String(hours) + ":" + String(minutes) + ":" + String(seconds);
    global.stoper =
      (Number(seconds) + 60 * Number(minutes)) / 3600 + Number(hours);
    global.pace_stoper =
      Number(seconds) / 60 + Number(minutes) + Number(hours) * 60;
  }

  componentDidMount() {
    var that = this;

    var now = moment();
    moment.locale("pl");

    this.fetchWeather();

    that.setState({
      date: now.format("LL"),
      activityDate: now.format("YYYY-MM-DD"),
      dateTimestamp: now.unix()
    });
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
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude, altitude, speed } = locations[0];
        const newCoordinate = {
          latitude,
          longitude,
          altitude,
          speed
        };
        console.log({ newCoordinate });

        global.coordinate.timing(newCoordinate).start();
        global.routeCoordinates = global.routeCoordinates.concat([
          newCoordinate
        ]);
        global.latitude = locations[0].latitude;
        global.longitude = locations[0].longitude;
        global.altitude = locations[0].altitude;
        this.setState({
          speed: locations[0].speed,
          prevLatLng: newCoordinate
        });
      }
    );

    if (Platform.OS === "ios") {
      this.manager.onStateChange(state => {
        if (state === "PoweredOn") this.startActivity();
      });
    } else {
      this.startActivity();
    }
  }

  updateDistanceArray() {
    this.state.paceDataArray.shift();
    this.state.paceDataArray.push(Number(global.pace));

    this.state.heightIncreaseDataArray.shift();
    this.state.heightIncreaseDataArray.push(Number(global.altitude));

    this.state.speedDataArray.shift();
    this.state.speedDataArray.push(Number(global.speed));

    this.state.heartBeatDataArray.shift();
    this.state.heartBeatDataArray.push(Number(this.state.heart));
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: message });
  }

  startActivity() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info("Skanowanie...");
      console.log(device);
      if (error) {
        if (error.message == "BluetoothLE is unsupported on this device") {
          this.error("Bluetooth nie jest obsługiwane na tym urządzeniu");
        } else if (error.message == "BluetoothLE is powered off") {
          this.error(
            "Bluetooth jest wyłączony. Jeśli chcesz połączyć sie z Smartwatchem włącz go!"
          );
        } else {
          this.error(
            "Utracono połączenie z urządzeniem! Zrestartuj połaczenie Bluetooth"
          );
        }
        return;
      }

      if (device.name === "Mi Smart Band 4") {
        this.info("Łączenie z " + device.name + " (" + device.id + ")");
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            this.info("Przeszukiwanie charakterystyk...");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            this.info("Czytanie...");
            this.readStartValueCharacteristics(device);
            let readCharacteristicsId = setInterval(() => {
              return this.readCharacteristics(device);
            }, 1000);
          })
          .then(
            () => {
              this.info("Nasłuchiwanie...");
            },
            error => {
              if (
                error.message ==
                "Device " + device.name + " was disconnected"
              ) {
                this.error(
                  "Bluetooth jest wyłączony. Jeśli chcesz połączyć sie z Smartwatchem włącz go!"
                );
              } else {
                this.error(error.message);
              }
            }
          );
      }
    });
  }

  async readStartValueCharacteristics(device) {
    const service = "00001800-0000-1000-8000-00805f9b34fb";
    const characteristicW = "00002a00-0000-1000-8000-00805f9b34fb";

    const characteristic = await device.readCharacteristicForService(
      service,
      characteristicW
    );
    const returnedValue = Buffer.from(characteristic.value, "base64").toString(
      "ascii"
    );

    const serviceSerial = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWSerial = "00000006-0000-3512-2118-0009af100700";

    const characteristicSerial = await device.readCharacteristicForService(
      serviceSerial,
      characteristicWSerial
    );

    const serviceStep = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWStep = "00000007-0000-3512-2118-0009af100700";

    const characteristicStep = await device.readCharacteristicForService(
      serviceStep,
      characteristicWStep
    );
    const returnedStepValue = Buffer.from(
      characteristicStep.value,
      "base64"
    ).toString("hex");

    var steps_modulo = converter.hexToDec(returnedStepValue.substring(2, 4));
    var steps_divided = converter.hexToDec(returnedStepValue.substring(4, 6));
    var steps = parseInt(steps_divided) * 256 + parseInt(steps_modulo);

    const serviceDistance = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWDistance = "00000007-0000-3512-2118-0009af100700";

    const characteristicDistance = await device.readCharacteristicForService(
      serviceDistance,
      characteristicWDistance
    );
    const returnedDistanceValue = Buffer.from(
      characteristicDistance.value,
      "base64"
    ).toString("hex");

    var distance_modulo = converter.hexToDec(
      returnedDistanceValue.substring(10, 12)
    );
    var distance_divided = converter.hexToDec(
      returnedDistanceValue.substring(12, 14)
    );
    var distances =
      parseInt(distance_divided) * 256 + parseInt(distance_modulo);

    var calories_modulo = converter.hexToDec(
      returnedDistanceValue.substring(18, 20)
    );
    var calories_divided = converter.hexToDec(
      returnedDistanceValue.substring(20, 22)
    );

    var calories = parseInt(calories_divided) * 256 + parseInt(calories_modulo);

    const serviceHeart = "0000180d-0000-1000-8000-00805f9b34fb";
    const characteristicNHeart = "00002a37-0000-1000-8000-00805f9b34fb";

    device.monitorCharacteristicForService(
      serviceHeart,
      characteristicNHeart,
      (error, characteristicHeart) => {
        if (error) {
          this.error(error.message);
          Toast.showShortBottom(error.message);
          return;
        }
        const returnedHeartBeatValue = Buffer.from(
          characteristicHeart.value,
          "base64"
        ).toString("hex");

        var heart_beat = converter.hexToDec(returnedHeartBeatValue);
        this.setState({ heart: heart_beat });
      }
    );

    this.setState({
      start_steps: steps,
      start_distance: distances,
      start_calories: calories,
      max_heart_beat: this.state.heart,
      min_heart_beat: this.state.heart,
      isActivityReady: true
    });
    this.startActivityTimer();
  }

  async readCharacteristics(device) {
    const service = "00001800-0000-1000-8000-00805f9b34fb";
    const characteristicW = "00002a00-0000-1000-8000-00805f9b34fb";

    const characteristic = await device.readCharacteristicForService(
      service,
      characteristicW
    );
    const returnedValue = Buffer.from(characteristic.value, "base64").toString(
      "ascii"
    );

    const serviceSerial = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWSerial = "00000006-0000-3512-2118-0009af100700";

    const characteristicSerial = await device.readCharacteristicForService(
      serviceSerial,
      characteristicWSerial
    );

    const serviceStep = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWStep = "00000007-0000-3512-2118-0009af100700";

    const characteristicStep = await device.readCharacteristicForService(
      serviceStep,
      characteristicWStep
    );
    const returnedStepValue = Buffer.from(
      characteristicStep.value,
      "base64"
    ).toString("hex");

    var steps_modulo = converter.hexToDec(returnedStepValue.substring(2, 4));
    var steps_divided = converter.hexToDec(returnedStepValue.substring(4, 6));
    var steps = parseInt(steps_divided) * 256 + parseInt(steps_modulo);

    const serviceDistance = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWDistance = "00000007-0000-3512-2118-0009af100700";

    const characteristicDistance = await device.readCharacteristicForService(
      serviceDistance,
      characteristicWDistance
    );
    const returnedDistanceValue = Buffer.from(
      characteristicDistance.value,
      "base64"
    ).toString("hex");

    var distance_modulo = converter.hexToDec(
      returnedDistanceValue.substring(10, 12)
    );
    var distance_divided = converter.hexToDec(
      returnedDistanceValue.substring(12, 14)
    );
    var distances =
      parseInt(distance_divided) * 256 + parseInt(distance_modulo);

    var calories_modulo = converter.hexToDec(
      returnedDistanceValue.substring(18, 20)
    );
    var calories_divided = converter.hexToDec(
      returnedDistanceValue.substring(20, 22)
    );

    var calories = parseInt(calories_divided) * 256 + parseInt(calories_modulo);

    const serviceHeart = "0000180d-0000-1000-8000-00805f9b34fb";
    const characteristicWHeart = "00002a39-0000-1000-8000-00805f9b34fb";
    const characteristicNHeart = "00002a37-0000-1000-8000-00805f9b34fb";

    device.monitorCharacteristicForService(
      serviceHeart,
      characteristicNHeart,
      (error, characteristicHeart) => {
        if (error) {
          this.error(error.message);
          Toast.showShortBottom(error.message);
          return;
        }
        const returnedHeartBeatValue = Buffer.from(
          characteristicHeart.value,
          "base64"
        ).toString("hex");

        var heart_beat = converter.hexToDec(returnedHeartBeatValue);
        this.setState({ heart: heart_beat });
      }
    );

    global.distance = (distances - this.state.start_distance) / 1000;
    global.pace =
      global.distance == 0
        ? 0
        : parseFloat(Number(global.pace_stoper) / global.distance).toFixed(2);
    global.speed =
      global.distance == 0
        ? 0
        : parseFloat(global.distance / Number(global.stoper)).toFixed(2);
    global.max_pace =
      global.max_pace < global.pace ? global.pace : global.max_pace;
    global.max_speed =
      global.max_speed < global.speed ? global.speed : global.max_speed;
    this.setState({
      steps: steps - this.state.start_steps,
      calories: calories - this.state.start_calories,
      max_heart_beat:
        this.state.max_heart_beat < this.state.heart
          ? this.state.heart
          : this.state.max_heart_beat,
      min_heart_beat:
        this.state.min_heart_beat > this.state.heart
          ? this.state.heart
          : this.state.min_heart_beat
    });
    this.updateDistanceArray();
  }

  fetchWeather() {
    let fetchWeatherId = setInterval(() => {
      return fetch(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          global.latitude +
          "&lon=" +
          global.longitude +
          "&APPID=400aef15a46a6becc3a52d55015b6d7b&units=metric"
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              id: responseJson.weather[0].id,
              weatherCondition: responseJson.weather[0].main,
              temperature: responseJson.main.temp,
              tempMin: responseJson.main.temp_min,
              tempMax: responseJson.main.temp_max,
              wind: responseJson.wind.speed,
              visibility: responseJson.visibility,
              direction: responseJson.wind.deg,
              cloudy: responseJson.clouds.all,
              humidity: responseJson.main.humidity,
              pressure: responseJson.main.pressure,
              isDay:
                this.state.dateTimestamp < responseJson.sys.sunset &&
                this.state.dateTimestamp > responseJson.sys.sunrise
                  ? 1
                  : 0
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    }, 5000);
  }

  startActivityTimer = () => {
    if (this.state.isWatchReady == false) {
      global.isActivityVisible = true;
      let startActivityTimerId = setInterval(() => {
        var activityTimerCount = (
          Number(this.state.activityTimer) - 1
        ).toString();

        this.setState({
          activityTimer: activityTimerCount
        });
        if (Number(this.state.activityTimer) == 0) {
          this.setState({
            isWatchReady: true
          });
          this.toggleStopwatch();
        }
      }, 1000);
    }
  };

  publishDataActivity = () => {
    fetch("http://jasiu1047.unixstorm.org/smartactivity/publish_activity.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.userId,
        name: this.state.name,
        type: this.state.activityType,
        time: global.stoperActivityTime,
        date: this.state.activityDate,
        distance: global.distance,
        steps: this.state.steps,
        calories: this.state.calories,
        max_pace: global.max_pace,
        max_speed: global.max_speed,
        max_heart_beat: this.state.max_heart_beat,
        min_heart_beat: this.state.min_heart_beat
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ confirmDialogVisible: false });
        global.isActivityVisible = false;
        Toast.showShortBottom(response);
        this.props.navigation.navigate("ActivityHistory", {
          id: this.state.userId
        });
        this.clearActivityDetailsComponent();
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillUnmount() {
    this.clearInterval(startActivityTimerId);
    this.clearInterval(fetchWeatherId);
    this.clearInterval(readCharacteristicsId);
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

  showDialog = () => {
    this.setState({ confirmDialogVisible: true });
    this.toggleStopwatch();
  };

  endActivityFunction = () => {
    this.showDialog();
    this.publishDataActivity();
  };

  clearActivityDetailsComponent = () => {
    global.stoperActivityTime = "";
    global.altitude = null;
    global.distance = 0;
    global.speed = 0;
    global.pace = 0;
    global.max_speed = 0;
    global.max_pace = 0;
    global.routeCoordinates = [];
    global.latitude = LATITUDE;
    global.longitude = LONGITUDE;
    global.coordinate = new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0
    });
    this.state = {
      isWatchReady: false,
      confirmDialogVisible: false,
      isActivityReady: false,
      activityTimer: "3",
      activityDate: "",
      date: "",
      stoper: "",
      backgroundImageSource: null,
      activityType: null,
      name: null,
      info: "",
      paceDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      heightIncreaseDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      heartBeatDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      speedDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      start_distance: 0,
      limitedDistance: "",
      steps: 0,
      start_steps: 0,
      limitedSteps: "",
      calories: 0,
      start_calories: 0,
      limitedCalories: "",
      poolLengths: "",
      heart: null,
      max_heart_beat: null,
      min_heart_beat: null,
      isLoading: true,
      id: 0,
      iDay: true,
      description: null,
      location: null,
      temperature: 0,
      tempMin: 0,
      tempMax: 0,
      wind: 0,
      visibility: 0,
      direction: null,
      cloudy: 0,
      humidity: 0,
      pressure: 0,
      weatherCondition: null,
      sunset: 0,
      dateTimestamp: 0,
      error: null,
      speed: 0,
      distanceTravelled: 0,
      prevLatLng: {},
      stopwatchStart: false,
      stopwatchReset: false
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    const { info } = this.state;
    const { name } = this.state;
    const { heart } = this.state;
    const { limitedSteps } = this.state;
    const { steps } = this.state;
    const { limitedDistance } = this.state;
    const { limitedCalories } = this.state;
    const { poolLengths } = this.state;
    const { calories } = this.state;
    const { paceDataArray } = this.state;
    const { heightIncreaseDataArray } = this.state;
    const { speedDataArray } = this.state;
    const { heartBeatDataArray } = this.state;
    const { activityType } = this.state;
    const { isLoading } = this.state;
    const { isDay } = this.state;
    const { id } = this.state;
    const { weatherCondition } = this.state;
    const { temperature } = this.state;
    const { tempMin } = this.state;
    const { tempMax } = this.state;
    const { wind } = this.state;
    const { visibility } = this.state;
    const { direction } = this.state;
    const { cloudy } = this.state;
    const { humidity } = this.state;
    const { pressure } = this.state;
    if (this.state.isWatchReady == false) {
      return (
        <ImageBackground
          source={this.state.backgroundImageSource}
          style={{ flex: 1, width: "100%", height: "100%", opacity: 0.9 }}
        >
          <Dialog
            visible={this.state.isWatchReady == false ? true : false}
            onTouchOutside={() => this.setState({ isWatchReady: true })}
            dialogStyle={{ borderRadius: 20, overflow: "hidden" }}
          >
            <View style={styles.dialog_container}>
              <View style={styles.dialog_header_container}>
                <Text style={styles.dialog_header}>{this.state.info}</Text>
                <View style={styles.dialog_indicator_container}>
                  {this.state.isActivityReady == false ? (
                    <MaterialIndicator size={60} color="#000000" />
                  ) : (
                    <View style={styles.activity_timer_container}>
                      <Text style={styles.timer_header}>
                        {this.state.activityTimer}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Dialog>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={this.state.backgroundImageSource}
          style={{ flex: 1, width: "100%", height: "100%", opacity: 0.9 }}
        >
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            activeDotColor="#000000"
          >
            <View style={styles.slide1}>
              <View style={styles.top_container}>
                <View style={styles.timer}>
                  <Stopwatch
                    laps
                    msecs
                    start={this.state.stopwatchStart}
                    reset={this.state.stopwatchReset}
                    options={options}
                    getTime={this.getFormattedTime}
                  />
                </View>
              </View>
              <View style={styles.botton_container}>
                <TouchableOpacity
                  onPress={this.toggleStopwatch}
                  style={[
                    styles.start_button,
                    this.state.stopwatchStart && styles.stop_button
                  ]}
                >
                  <Text>
                    {!this.state.stopwatchStart ? (
                      <Icon
                        name="play"
                        color={"rgba(0, 0, 0, 1.0)"}
                        size={45}
                      />
                    ) : (
                      <Icon
                        name="pause"
                        color={"rgba(0, 0, 0, 1.0)"}
                        size={45}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ActivityMap")}
                  style={{
                    width: 300,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                    borderBottomColor: "rgba(0, 0, 0, 0.3)",
                    borderBottomWidth: 0.5,
                    marginLeft: 5,
                    marginRight: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginTop: 0
                  }}
                >
                  <Icon1
                    name="location"
                    color={"rgba(0, 0, 0, 0.6)"}
                    size={14}
                  />
                  <Text
                    style={{
                      fontFamily: "Quicksand-Light",
                      fontSize: 14,
                      color: "rgba(0, 0, 0, 0.6)",
                      marginLeft: 5
                    }}
                  >
                    {" "}
                    Pokaż na mapie
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.showDialog()}
                  style={{
                    width: 300,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                    borderBottomColor: "rgba(0, 0, 0, 0.3)",
                    borderBottomWidth: 0.5,
                    marginLeft: 5,
                    marginRight: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    marginTop: 0
                  }}
                >
                  <Icon name="close" color={"rgba(0, 0, 0, 0.6)"} size={14} />
                  <Text
                    style={{
                      fontFamily: "Quicksand-Light",
                      fontSize: 14,
                      color: "rgba(0, 0, 0, 0.6)",
                      marginLeft: 5
                    }}
                  >
                    {" "}
                    Zakończ trening
                  </Text>
                </TouchableOpacity>
                {this.state.confirmDialogVisible == true ? (
                  <ConfirmDialog
                    message="Czy na pewno chcesz zakończyć trening?"
                    visible={this.state.confirmDialogVisible}
                    onTouchOutside={() =>
                      this.setState({ confirmDialogVisible: false })
                    }
                    dialogStyle={{ borderRadius: 20, overflow: "hidden" }}
                    messageStyle={{
                      fontFamily: "Quicksand-Light",
                      fontSize: 15,
                      color: "rgba(0,0,0,0.7)",
                      textAlign: "center"
                    }}
                    positiveButton={{
                      title: "Tak",
                      onPress: () => {
                        this.publishDataActivity();
                      },
                      titleStyle: {
                        textAlign: "center",
                        fontFamily: "Quicksand-Bold",
                        fontSize: 13,
                        color: "#ffffff",
                        fontWeight: "700"
                      },
                      style: {
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000000",
                        borderWidth: 1,
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 10
                      }
                    }}
                    negativeButton={{
                      title: "Nie",
                      onPress: () =>
                        this.setState({ confirmDialogVisible: false }),
                      titleStyle: {
                        textAlign: "center",
                        fontFamily: "Quicksand-Bold",
                        fontSize: 13,
                        color: "#000000",
                        fontWeight: "700"
                      },
                      style: {
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        borderColor: "#000000",
                        borderWidth: 1,
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 10
                      }
                    }}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.slide2}>
              <View style={styles.activity_top_container}>
                <View style={styles.date_container}>
                  <Text style={styles.activity_date}>{this.state.date}</Text>
                </View>
                <View style={styles.icon_container}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Profile")}
                    style={styles.profile_action_container}
                  >
                    <Image
                      style={styles.icon}
                      source={require("../../assets/images/profil_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.activity_bottom_container}>
                <ActivityDetails
                  info={info}
                  limitedSteps={limitedSteps}
                  steps={steps}
                  limitedDistance={limitedDistance}
                  limitedCalories={limitedCalories}
                  poolLengths={poolLengths}
                  calories={calories}
                  heart={heart}
                  paceDataArray={paceDataArray}
                  heightIncreaseDataArray={heightIncreaseDataArray}
                  speedDataArray={speedDataArray}
                  heartBeatDataArray={heartBeatDataArray}
                  activityType={activityType}
                />
              </View>
            </View>
            <View style={styles.slide3}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <MaterialIndicator size={70} color="#000000" />
                </View>
              ) : (
                <WeatherInfo
                  id={id}
                  weatherCondition={weatherCondition}
                  temperature={temperature}
                  tempMin={tempMin}
                  tempMax={tempMax}
                  wind={wind}
                  visibility={visibility}
                  direction={direction}
                  cloudy={cloudy}
                  humidity={humidity}
                  pressure={pressure}
                  isDay={isDay}
                />
              )}
            </View>
          </Swiper>
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
        </ImageBackground>
      );
    }
  }
}

const options = {
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 36
  }
};

const styles = StyleSheet.create({
  dialog_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dialog_header_container: {
    width: "100%",
    height: Dimensions.get("window").height * 0.15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },
  dialog_indicator_container: {
    width: "100%",
    height: Dimensions.get("window").height * 0.15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  activity_timer_container: {
    width: 60,
    height: 60,
    borderRadius: 85,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  timer_header: {
    fontFamily: "Quicksand-Light",
    fontSize: 22,
    color: "rgba(0,0,0,0.7)",
    textAlign: "center",
    fontWeight: "500"
  },
  dialog_header: {
    fontFamily: "Quicksand-Light",
    fontSize: 15,
    color: "rgba(0,0,0,0.7)",
    textAlign: "center"
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  activity_top_container: {
    marginTop: 120,
    width: "100%",
    height: "9%",
    flexDirection: "row",
    alignItems: "center"
  },
  date_container: {
    position: "absolute",
    left: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  icon_container: {
    position: "absolute",
    right: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "rgba(152,152,152,0.3)",
    borderWidth: 0.5
  },
  profile_action_container: {
    width: 40,
    height: 40,
    zIndex: 3
  },
  icon: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 50,
    borderColor: "#ffffff",
    borderWidth: 1
  },
  activity_bottom_container: {
    width: "100%",
    height: "91%"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  activity_date: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 17
  },
  botton_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 15,
    paddingBottom: 30
  },
  start_button: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "transparent"
  },
  stop_button: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "transparent"
  },
  top_container: {
    marginTop: 20,
    flexDirection: "row",
    height: 300,
    width: 300,
    backgroundColor: "transparent"
  },
  timer: {
    height: 300,
    width: 300,
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 150,
    borderWidth: 1,
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent"
  },
  time: {
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 60
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
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  }
});
