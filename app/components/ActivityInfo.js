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
  Dimensions
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
import { DrawerActions } from "react-navigation";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Toast from "@remobile/react-native-toast";
import { Dialog } from 'react-native-simple-dialogs';
import moment from "moment";
import "moment/locale/pl";

const { width, height } = Dimensions.get("window");

var converter = require("hex2dec");

import WeatherInfo from "./WeatherInfo";
import ActivityDetails from "./ActivityDetails";

export default class ActivityInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      backgroundImageSource: this.props.navigation.state.params
        .backgroundImageSource,
      isRunning: this.props.navigation.state.params.isRunning,
      activityType: this.props.navigation.state.params.activityType,
      paceDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      heightIncreaseDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      distanceDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      speedDataArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      isLoading: true,
      iDay: true,
      dialogVisible: true,
      timer: null,
      stoper: "",
      date: "",
      hours: "",
      minutes: "00",
      seconds: "00",
      miliseconds: "00",
      info: "",
      name: "",
      serial_number: "",
      start_distance: "",
      distance: "",
      steps: "",
      start_steps: "",
      calories: "",
      start_calories: "",
      speed: "",
      pace: "",
      heart: "",
      id: 0,
      description: null,
      location: null,
      temperature: 0,
      temp_min: 0,
      temp_max: 0,
      wind: 0,
      visibility: 0,
      direction: null,
      cloudy: 0,
      humidity: 0,
      pressure: 0,
      weather_condition: null,
      weather_condition_description: null,
      sunset: 0,
      dateTimestamp: 0,
      error: null
    };
  }

  componentDidMount() {
    var that = this;

    var now = moment();
    moment.locale("pl");

    this.fetchWeather();
    this.onButtonStartStop();

    that.setState({
      date: now.format("LL"),
      dateTimestamp: now.unix()
    });
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      this.manager.onStateChange(state => {
        if (state === "PoweredOn") this.scanAndConnect();
      });
    } else {
      this.scanAndConnect();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  updateDistanceArray() {
    this.state.paceDataArray.shift();
    this.state.paceDataArray.push(this.state.pace);

    this.state.heightIncreaseDataArray.shift();
    this.state.heightIncreaseDataArray.push(this.state.distance);

    this.state.distanceDataArray.shift();
    this.state.distanceDataArray.push(this.state.distance);

    this.state.speedDataArray.shift();
    this.state.speedDataArray.push(this.state.speed);
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: "Błąd: " + message });
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      this.info("Skanowanie...");
      console.log(device);

      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === "Mi Smart Band 4") {
        this.info("Połączono z Mi Smart Band 4");
        Toast.showShortBottom(device.name);
        Toast.showShortBottom(device.id);
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
            setInterval(() => {
              return this.readCharacteristics(device);
            }, 1000);
          })
          .then(
            () => {
              this.info("Nasłuchiwanie...");
            },
            error => {
              this.error(error.message);
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
    var calories = converter.hexToDec(returnedDistanceValue.substring(18, 20));

    this.setState({
      start_steps: steps,
      start_distance: distances,
      start_calories: calories
    });
    this.updateDistanceArray();
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
    var calories = converter.hexToDec(returnedDistanceValue.substring(18, 20));

    this.setState({
      name: returnedValue,
      heart: returnedDistanceValue,
      steps: steps - this.state.start_steps,
      distance: (distances - this.state.start_distance) / 1000,
      calories: calories - this.state.start_calories,
      pace:
        this.state.distance == ""
          ? 0
          : parseFloat((this.state.stoper * 60) / this.state.distance).toFixed(
              2
            ),
      speed:
        this.state.distance == ""
          ? 0
          : parseFloat(this.state.distance / this.state.stoper).toFixed(2)
    });
    this.updateDistanceArray();
  }

  fetchWeather() {
    setInterval(() => {
      return fetch(
        "http://api.openweathermap.org/data/2.5/weather?lat=50.84&lon=16.48&APPID=400aef15a46a6becc3a52d55015b6d7b&units=metric"
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              id: responseJson.weather[0].id,
              weather_condition: responseJson.weather[0].main,
              weather_condition_description:
                responseJson.weather[0].description,
              location: responseJson.name,
              temperature: responseJson.main.temp,
              temp_min: responseJson.main.temp_min,
              temp_max: responseJson.main.temp_max,
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

  onButtonStartStop = () => {
    if (this.state.isRunning) {
      let timer = setInterval(() => {
        var milisecondsCount = (Number(this.state.miliseconds) + 1).toString(),
          secondsCount = this.state.seconds;
        minutesCount = this.state.minutes;
        hoursCount = this.state.hours;

        if (Number(this.state.miliseconds) == 9) {
          secondsCount = (Number(this.state.seconds) + 1).toString();
          milisecondsCount = "0";
        }

        if (Number(this.state.seconds) == 59) {
          minutesCount = (Number(this.state.minutes) + 1).toString();
          secondsCount = "0";
        }

        if (Number(this.state.minutes) == 59) {
          hoursCount = (Number(this.state.hours) + 1).toString();
          minutesCount = "0";
        }

        this.setState({
          hours: hoursCount.length == 1 ? "0" + hoursCount : hoursCount,
          minutes: minutesCount.length == 1 ? "0" + minutesCount : minutesCount,
          seconds: secondsCount.length == 1 ? "0" + secondsCount : secondsCount,
          miliseconds:
            milisecondsCount.length == 1
              ? "0" + milisecondsCount
              : milisecondsCount,
          stoper: (
            (Number(this.state.seconds) +
              Number(this.state.minutes) * 60 +
              Number(this.state.hours) * 3600) /
            3600
          ).toString()
        });
      }, 100);
      this.setState({ timer });

      this.setState({ isRunning: false });
    } else {
      clearInterval(this.state.timer);
      this.setState({ isRunning: true });
    }
  };

  publishDataActivity = () => {
    fetch("http://192.168.0.3/smartActivity/publish_activity.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "jasiu1047",
        type: this.state.activityType,
        date: this.state.date,
        distance: this.state.distance,
        steps: this.state.step,
        calories: this.state.calories
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Toast.showShortBottom(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { stoper } = this.state;
    const { info } = this.state;
    const { name } = this.state;
    const { heart } = this.state;
    const { steps } = this.state;
    const { distance } = this.state;
    const { pace } = this.state;
    const { speed } = this.state;
    const { calories } = this.state;
    const { paceDataArray } = this.state;
    const { heightIncreaseDataArray } = this.state;
    const { distanceDataArray } = this.state;
    const { speedDataArray } = this.state;
    const { isLoading } = this.state;
    const { isDay } = this.state;
    const { id } = this.state;
    const { weather_condition } = this.state;
    const { weather_condition_description } = this.state;
    const { location } = this.state;
    const { temperature } = this.state;
    const { temp_min } = this.state;
    const { temp_max } = this.state;
    const { wind } = this.state;
    const { visibility } = this.state;
    const { direction } = this.state;
    const { cloudy } = this.state;
    const { humidity } = this.state;
    const { pressure } = this.state;

    if(this.state.dialogVisible) {
      return (
        <Dialog
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})} >
          <View style={styles.dialog_container}>
            <View style={styles.dialog_header_container}>
              <Text style={styles.dialog_header}>
                {this.state.info}
              </Text>
            </View>
            <MaterialIndicator size={60} color="#000000" />
          </View>
        </Dialog>
      )
    }
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
                <Text style={styles.time}>
                  {this.state.hours} {this.state.minutes}:{this.state.seconds}.
                  {this.state.miliseconds}
                </Text>
              </View>
            </View>
            <View style={styles.botton_container}>
              <TouchableOpacity
                onPress={this.onButtonStartStop}
                style={[
                  styles.start_button,
                  this.state.isRunning && styles.stop_button
                ]}
              >
                <Text>
                  {this.state.isRunning ? (
                    <Icon name="play" color={"rgba(0, 0, 0, 1.0)"} size={45} />
                  ) : (
                    <Icon name="pause" color={"rgba(0, 0, 0, 0.1)"} size={45} />
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate("ActivityMap", {
                    distance: this.state.distance
                  })
                }
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
                <Icon1 name="location" color={"rgba(0, 0, 0, 0.6)"} size={14} />
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
                onPress={this.publishDataActivity}
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
                stoper={stoper}
                info={info}
                steps={steps}
                distance={distance}
                pace={pace}
                speed={speed}
                calories={calories}
                paceDataArray={paceDataArray}
                heightIncreaseDataArray={heightIncreaseDataArray}
                distanceDataArray={distanceDataArray}
                speedDataArray={speedDataArray}
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
                weather_condition={weather_condition}
                weather_condition_description={weather_condition_description}
                temperature={temperature}
                temp_min={temp_min}
                temp_max={temp_max}
                location={location}
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

const styles = StyleSheet.create({
  dialog_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dialog_header_container: {
    width: "100%",
    height: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dialog_header: {
    fontFamily: "Quicksand-Light",
    fontSize: 15,
    color: "rgba(0,0,0,0.7)",
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
