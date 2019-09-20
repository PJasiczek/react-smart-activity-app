import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Picker
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { DrawerActions } from "react-navigation";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      pickerChartChoose: ""
    };
  }
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];
    const data1 = {
      labels: ["Lipiec", "Siepień", "Wrzesień"],
      datasets: [
        {
          data: [20, 45, 28]
        }
      ]
    };
    const data2 = {
      labels: ["20", "21", "22", "23", "24"],
      datasets: [
        {
          data: [20, 45, 28, 45, 28]
        }
      ]
    };
    return (
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
              <Image
                style={styles.iconss}
                source={require("../../assets/images/icons/settings.png")}
              />
            </TouchableOpacity>
            <View style={styles.icon_container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ModifyProfile")}
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
        </View>
        <View style={styles.border_bottom} />
        <View style={styles.bottom_container}>
          <View style={styles.inner_bottom_top_container}>
            <Text style={styles.day_activity_header}>Ostatnia aktywność</Text>
          </View>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={true}
            activeDotColor="#000000"
          >
            <View style={styles.slide1}>
              <View style={styles.inner_bottom_chart_container}>
                <View style={styles.inner_bottom_chart_header_container}>
                  <Text style={styles.chart_header}>5 dni</Text>
                </View>
                <BarChart
                  style={{
                    marginVertical: 3,
                    borderRadius: 16
                  }}
                  data={data2}
                  width={Dimensions.get("window").width * 0.7}
                  height={Dimensions.get("window").height * 0.3}
                  withHorizontalLabels={true}
                  chartConfig={{
                    backgroundColor: "#f2f2f2",
                    backgroundGradientFrom: "#f2f2f2",
                    backgroundGradientTo: "#f2f2f2",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                />
              </View>
            </View>
            <View style={styles.slide2}>
              <View style={styles.inner_bottom_chart_container}>
                <View style={styles.inner_bottom_chart_header_container}>
                  <Text style={styles.chart_header}>3 miesiące</Text>
                </View>
                <BarChart
                  style={{
                    marginVertical: 3,
                    borderRadius: 16
                  }}
                  data={data1}
                  width={Dimensions.get("window").width * 0.7}
                  height={Dimensions.get("window").height * 0.3}
                  withHorizontalLabels={true}
                  chartConfig={{
                    backgroundColor: "#f2f2f2",
                    backgroundGradientFrom: "#f2f2f2",
                    backgroundGradientTo: "#f2f2f2",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                />
              </View>
            </View>
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2"
  },
  wrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5
  },
  slide1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  top_container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "33%",
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
    paddingVertical: 40,
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
    height: "53%",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  inner_bottom_top_container: {
    position: "relative",
    width: "100%",
    height: "8%",
    marginTop: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingHorizontal: 40,
    justifyContent: "space-between"
  },
  inner_bottom_chart_container: {
    alignItems: "center",
    justifyContent: "center"
  },
  inner_bottom_chart_header_container: {
    position: "relative",
    width: "100%",
    height: "8%",
    alignSelf: "flex-start"
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
  chart_header: {
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.6)",
    fontSize: 12
  },
  day_activity_header: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.6)",
    fontSize: 15
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
  },
  iconss: {
    marginLeft: 15,
    width: 18,
    height: 18
  }
});
