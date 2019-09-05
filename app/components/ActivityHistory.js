import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { DrawerActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Entypo";

const { width, height } = Dimensions.get("window");

export default class ActivityHistory extends Component {
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
          <View style={styles.history_container}>
            <ScrollView>
              <View style={styles.history_inner_container}>
                <View style={styles.history_inner_right_container}>
                  <View style={styles.history_inner_top_container}>
                    <Icon name="running" style={styles.icon} size={21} />
                    <Text style={styles.activity_header}>
                      Enea IronmGdynia 1/2
                    </Text>
                  </View>
                  <View style={styles.history_inner_middle_container}>
                    <View style={styles.history_inner_bottom_left_container} />
                    <View style={styles.history_inner_bottom_right_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Czas</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            02:13.04{" "}
                            <Text style={styles.history_inner_prefix}>h</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_distance_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Dystans</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            20{" "}
                            <Text style={styles.history_inner_prefix}>Km</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_calories_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Kalorie</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            122{" "}
                            <Text style={styles.history_inner_prefix}>C</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.history_inner_bottom_container}>
                    <Icon2 name="dots-three-horizontal" style={styles.icon} size={21} />
                  </View>
                </View>
              </View>
              <View style={styles.history_inner_container}>
                <View style={styles.history_inner_right_container}>
                  <View style={styles.history_inner_top_container}>
                    <Icon name="swimmer" style={styles.icon} size={21} />
                    <Text style={styles.activity_header}>
                      Aqua Zdrój
                    </Text>
                  </View>
                  <View style={styles.history_inner_middle_container}>
                    <View style={styles.history_inner_bottom_left_container} />
                    <View style={styles.history_inner_bottom_right_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Czas</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            01:52.44{" "}
                            <Text style={styles.history_inner_prefix}>h</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_distance_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Dystans</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            11{" "}
                            <Text style={styles.history_inner_prefix}>Km</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_calories_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Kalorie</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            66{" "}
                            <Text style={styles.history_inner_prefix}>C</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.history_inner_bottom_container}>
                    <Icon2 name="dots-three-horizontal" style={styles.icon} size={21} />
                  </View>
                </View>
              </View>
              <View style={styles.history_inner_container}>
                <View style={styles.history_inner_right_container}>
                  <View style={styles.history_inner_top_container}>
                    <Icon1 name="bike" style={styles.icon} size={24} />
                    <Text style={styles.activity_header}>
                      Świdnica - Mietków
                    </Text>
                  </View>
                  <View style={styles.history_inner_middle_container}>
                    <View style={styles.history_inner_bottom_left_container} />
                    <View style={styles.history_inner_bottom_right_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Czas</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            00:52.44{" "}
                            <Text style={styles.history_inner_prefix}>h</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_distance_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Dystans</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            4{" "}
                            <Text style={styles.history_inner_prefix}>Km</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.activity_history_calories_container}>
                      <View
                        style={styles.history_inner_bottom_right_top_container}
                      >
                        <Text style={styles.history_inner_label}>Kalorie</Text>
                      </View>
                      <View
                        style={
                          styles.history_inner_bottom_right_bottom_container
                        }
                      >
                        <View
                          style={
                            styles.history_inner_bottom_right_top_bottom_left_container
                          }
                        >
                          <Text style={styles.history_inner_value}>
                            22{" "}
                            <Text style={styles.history_inner_prefix}>C</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.history_inner_bottom_container}>
                    <Icon2 name="dots-three-horizontal" style={styles.icon} size={21} />
                  </View>
                </View>
              </View>
              <View style={styles.history_inner_container} />
              <View style={styles.history_inner_container} />
              <View style={styles.history_inner_container} />
              <View style={styles.history_inner_container} />
            </ScrollView>
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
  history_container: {
    marginTop: 120,
    width: "100%",
    height: "95%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  history_inner_container: {
    width: Dimensions.get("window").width * 0.85,
    height: 140,
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    zIndex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  history_inner_right_container: {
    width: "100%",
    height: "100%",
    flexDirection: "column"
  },
  history_inner_top_container: {
    width: "100%",
    height: "21%",
    paddingHorizontal: "-3%",
    flexDirection: 'row'
  },
  history_inner_bottom_container: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  history_inner_middle_container: {
    width: "100%",
    height: "70%",
    flexDirection: "row",
    paddingVertical: "5%"
  },
  history_inner_bottom_left_container: {
    width: "1%",
    height: "100%",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(0,0,0,0.5)",
    marginRight: 20
  },
  history_inner_bottom_right_container: {
    width: "45%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  history_inner_bottom_right_top_container: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-end",
    paddingVertical: 10
  },
  history_inner_bottom_right_bottom_container: {
    width: "100%",
    height: "60%",
    flexDirection: "row",
  },
  history_inner_bottom_right_top_bottom_left_container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  history_inner_label: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 16
  },
  history_inner_value: {
    fontFamily: "Quicksand-Light",
    color: "#000000",
    fontSize: 32,
    fontWeight: "200"
  },
  history_inner_prefix: {
    fontFamily: "Quicksand-Light",
    color: "#777777",
    fontSize: 16
  },
  activity_header: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.5)",
    fontSize: 13,
    marginLeft: 10,
  },
  activity_history_distance_container: {
    width: "25%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  activity_history_calories_container: {
    width: "35%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  icon: {},
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
