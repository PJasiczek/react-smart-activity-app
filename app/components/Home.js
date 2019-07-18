import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import Swiper from "react-native-swiper";

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          loop={false}
          activeDotColor="#000000"
        >
          <View style={styles.slide1}>
            <View style={styles.logo_container}>
              <Image
                style={styles.logo}
                source={require("../../assets/images/Logo.png")}
              />
              <Text style={styles.title}>
                Witaj w{" "}
                <Text
                  style={{
                    fontFamily: "Quicksand-Bold"
                  }}
                >
                  Smart Activity
                </Text>
                . To najlepsze miejsce dla miłośników aktywności sportowych.
              </Text>
            </View>
          </View>
          <View style={styles.slide2}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Heartbeat.png")}
            />
            <Text style={styles.header}>ZDROWIE</Text>
            <Text style={styles.header_description}>
              Wyświetlaj szczegółowe informacje o stanie zdrowia każdego dnia.
            </Text>
          </View>
          <View style={styles.slide3}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Smartwatch.png")}
            />
            <Text style={styles.header}>STATYSTYKI</Text>
            <Text style={styles.header_description}>
              Połącz swój smartwatch z aplikacją i poprawiaj swoje wyniki dzięki
              porównaniu bieżących statystyk z każdego biegu{" "}
            </Text>
          </View>
        </Swiper>
        <View style={styles.buttons_container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Registration")}
            style={styles.button_container}
          >
            <Text style={styles.button_text}>DOŁĄCZ TERAZ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              width: 160,
              backgroundColor: "#000000",
              borderWidth: 1,
              borderRadius: 3,
              marginLeft: 5,
              marginRight: 5,
              paddingVertical: 10,
              marginBottom: 20
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Quicksand-Bold",
                fontSize: 13,
                color: "#ffffff",
                fontWeight: "700"
              }}
            >
              ZALOGUJ SIĘ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("myproject", () => Swiper);

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
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    width: 190,
    height: 190
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  header: {
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 19,
    marginTop: 5
  },
  header_description: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 12,
    marginTop: 15,
    width: 290,
    textAlign: "center",
    opacity: 0.5
  },
  title: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 12,
    marginTop: 10,
    width: 290,
    textAlign: "center",
    opacity: 0.9
  },
  buttons_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20
  },
  button_container: {
    width: 160,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 10,
    marginBottom: 20
  },
  button_text: {
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    fontSize: 13,
    color: "#000000",
    fontWeight: "700"
  }
});
