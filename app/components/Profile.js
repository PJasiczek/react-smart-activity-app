import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { DrawerActions } from "react-navigation";
import { ProgressCircle } from "react-native-svg-charts";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  render() {
    return (
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%"
        }}
      >
        <View style={styles.container}>
          <View style={styles.top_container}>
            <View style={styles.top_top_container}>
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
                onPress={() => this.props.navigation.navigate("Settings")}
                style={styles.settings_button}
              >
                <Icon1 name="settings" size={20} color={"#000000"} />
              </TouchableOpacity>
              <View style={styles.icon_container}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ModifyProfile")
                  }
                  style={styles.edit_action_container}
                >
                  <Image
                    source={require("../../assets/images/icons/edit_profile.png")}
                    style={styles.edit_action_image}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/profil_icon.png")}
                />
              </View>

              <Text style={styles.header}>Piotr Jasiczek</Text>
              <Text style={styles.pre_header}>Polska</Text>
            </View>
            <View style={styles.top_middle_container}>
              <View style={styles.inner_top_container}>
                <Text style={styles.inner_top_value}>
                  <Text
                    style={{
                      color: "#000000",
                      fontFamily: "Quicksand-Bold",
                      fontSize: 19
                    }}
                  >
                    23
                  </Text>
                </Text>
                <Text style={styles.inner_top_label}>Wiek</Text>
              </View>
              <View style={styles.inner_top_container}>
                <Text style={styles.inner_top_value}>
                  <Text
                    style={{
                      color: "#000000",
                      fontFamily: "Quicksand-Bold",
                      fontSize: 19
                    }}
                  >
                    189{" "}
                  </Text>
                  cm
                </Text>
                <Text style={styles.inner_top_label}>Wzrost</Text>
              </View>
              <View style={styles.inner_top_container}>
                <Text style={styles.inner_top_value}>
                  <Text
                    style={{
                      color: "#000000",
                      fontFamily: "Quicksand-Bold",
                      fontSize: 19
                    }}
                  >
                    75{" "}
                  </Text>
                  kg
                </Text>
                <Text style={styles.inner_top_label}>Waga</Text>
              </View>
            </View>
            <View style={styles.top_bottom_container}>
              <View style={styles.inner_bottom_container}>
                <Text style={styles.inner_bottom_value}>98776</Text>
                <Text style={styles.inner_bottom_label}>Kroków</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <Text style={styles.inner_bottom_value}>18634</Text>
                <Text style={styles.inner_bottom_label}>Minut</Text>
              </View>
              <View style={styles.inner_bottom_container}>
                <Text style={styles.inner_bottom_value}>120313</Text>
                <Text style={styles.inner_bottom_label}>Metrów</Text>
              </View>
            </View>
          </View>
          <View style={styles.border_bottom} />
          <View style={styles.bottom_container}>
            <View style={styles.inner_bottom_top_container}>
              <Text style={styles.day_activity_header}>
                Dzisiejsza aktywność
              </Text>
            </View>
            <View style={styles.inner_bottom_bottom_container}>
              <ProgressCircle
                progress={0.3}
                progressColor={"rgb(35, 35, 35)"}
                strokeWidth={6}
                style={{
                  position: "absolute",
                  left: Dimensions.get("window").width * 0.075,
                  height: Dimensions.get("window").height * 0.3,
                  width: Dimensions.get("window").width * 0.3,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1
                }}
              >
                <View style={styles.progress_circle_container}>
                  <Text style={styles.steps_label}>Kroki</Text>
                  <Text style={styles.progress_circle_header}>5000</Text>
                </View>
              </ProgressCircle>
              <ProgressCircle
                progress={0.7}
                progressColor={"rgb(35, 35, 35)"}
                strokeWidth={7}
                style={{
                  height: Dimensions.get("window").height * 0.4,
                  width: Dimensions.get("window").width * 0.4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 2
                }}
              >
                <View style={styles.progress_circle_distance_container}>
                  <Text style={styles.distance_label}>Dystans</Text>
                  <Text style={styles.progress_circle_header}>1500 m</Text>
                </View>
              </ProgressCircle>
              <ProgressCircle
                progress={0.6}
                progressColor={"rgb(35, 35, 35)"}
                strokeWidth={6}
                style={{
                  position: "absolute",
                  right: Dimensions.get("window").width * 0.075,
                  height: Dimensions.get("window").height * 0.3,
                  width: Dimensions.get("window").width * 0.3,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1
                }}
              >
                <View style={styles.progress_circle_container}>
                  <Text style={styles.calories_header}>Kalorie</Text>
                  <Text style={styles.progress_circle_header}>140 C</Text>
                </View>
              </ProgressCircle>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  top_container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "53%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  top_top_container: {
    position: "relative",
    width: "100%",
    height: "55%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  edit_action_container: {
    position: "absolute",
    height: 20,
    width: 20,
    bottom: 0,
    right: 5,
    zIndex: 3
  },
  edit_action_image: {
    position: "absolute",
    height: 20,
    width: 20,
    bottom: 0,
    right: 5,
    borderRadius: 10,
    borderColor: "rgba(152,152,152,0.3)",
    borderWidth: 1,
    zIndex: 3
  },
  top_middle_container: {
    position: "relative",
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  top_bottom_container: {
    position: "relative",
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  border_bottom: {
    width: "100%",
    height: 0,
    borderBottomColor: "rgba(152,152,152,0.3)",
    borderBottomWidth: 1,
    transform: [{ rotate: "10deg" }]
  },
  bottom_container: {
    position: "relative",
    width: "100%",
    height: "47%",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_bottom_top_container: {
    position: "relative",
    width: "100%",
    height: "8%",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 40
  },
  inner_bottom_bottom_container: {
    position: "relative",
    width: "100%",
    height: "74%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  progress_circle_distance_container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  progress_circle_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    zIndex: 2
  },
  progress_circle_header: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  bottom_bottom_container: {
    width: "100%",
    height: "50%",
    backgroundColor: "transparent",
    alignItems: "center"
  },
  bottom_top_container: {
    position: "relative",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  inner_top_container: {
    width: "27%",
    height: "35%",
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  inner_bottom_container: {
    width: "20%",
    height: "35%",
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  icon_container: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "rgba(152,152,152,0.3)",
    borderWidth: 3
  },
  inner_top_value: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 13,
    paddingVertical: 5
  },
  inner_top_label: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 12
  },
  inner_bottom_value: {
    color: "#000000",
    fontFamily: "Quicksand-Bold",
    fontSize: 15,
    paddingVertical: 5
  },
  inner_bottom_label: {
    color: "#000000",
    fontFamily: "Quicksand-Light",
    fontSize: 11
  },
  icon: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 50,
    borderColor: "#ffffff",
    borderWidth: 4
  },
  day_activity_header: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 14
  },
  header: {
    marginTop: 10,
    fontFamily: "Quicksand-Bold",
    color: "#000000",
    fontSize: 19
  },
  pre_header: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 13
  },
  steps_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 14
  },
  distance_label: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 15
  },
  calories_header: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 14
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
  },
  settings_button: {
    position: "absolute",
    width: 40,
    height: 40,
    right: 10,
    top: 33,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 1
  }
});
