import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { DrawerActions } from "react-navigation";

import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

import moment from "moment";
import "moment/locale/pl";

import WeatherInfo from "./WeatherInfo";
import ActivityDetails from "./ActivityDetails";

export default class ActivityInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      isRunning: true,
      isLoading: true,
      iDay: true,
      date: "",
      hours: "",
      minutes: "00",
      seconds: "00",
      miliseconds: "00",
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

    that.setState({
      date: now.format("LL"),
      dateTimestamp: now.unix()
    });
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

  componentWillUnmount() {
    clearInterval(this.state.timer);
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
              : milisecondsCount
        });
      }, 100);
      this.setState({ timer });

      this.setState({ isRunning: false });
    } else {
      clearInterval(this.state.timer);
      this.setState({ isRunning: true });
    }
  };

  render() {
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

    return (
      <ImageBackground
        source={require("../../assets/images/activity_background_black.jpg")}
        style={{ flex: 1, width: "100%", height: "100%" }}
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
                    <Icon name="play" color={"#000000"} size={45} />
                  ) : (
                    <Icon name="pause" color={"#777777"} size={45} />
                  )}
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
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/profil_icon.png")}
                />
              </View>
            </View>
            <View style={styles.activity_bottom_container}>
              <ActivityDetails distance={humidity} />
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
    marginTop: 130,
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
