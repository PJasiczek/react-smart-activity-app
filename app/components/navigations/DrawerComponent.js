import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Ionicons";

export default class DrawerComponent extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile_container}>
          <View style={styles.profile}>
            <View style={styles.profile_icon}>
              <Image
                style={styles.icon}
                source={require("../../../assets/images/profil_icon.png")}
              />
            </View>
            <View style={styles.profile_header}>
              <Text style={styles.header}>Piotr Jasiczek</Text>
            </View>
          </View>
          <View style={styles.bottom_container}>
            <View style={styles.navigator_container}>
              <Icon1
                name="log-out"
                style={styles.icons}
                onPress={this.navigateToScreen("Settings")}
              />
            </View>
          </View>
        </View>
        <View style={styles.screen_container}>
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "Profile"
                ? styles.selected_item
                : null
            ]}
          >
            <Image
              style={styles.iconss}
              source={require("../../../assets/images/icons/profile.png")}
            />
            <Text
              style={[
                styles.text_style,
                this.props.activeItemKey == "Profile"
                  ? styles.selected_text
                  : null
              ]}
              onPress={this.navigateToScreen("Profile")}
            >
              Profil
            </Text>
          </View>
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "MyActivity"
                ? styles.selected_item
                : null
            ]}
          >
            <Image
              style={styles.iconss}
              source={require("../../../assets/images/icons/stopwatch.png")}
            />
            <Text
              style={[
                styles.text_style,
                this.props.activeItemKey == "MyActivity"
                  ? styles.selected_text
                  : null
              ]}
              onPress={this.navigateToScreen("MyActivity")}
            >
              Treningi
            </Text>
          </View>
          {global.isActivityVisible == true ? (
            <View
              style={[
                styles.navigator_container,
                this.props.activeItemKey == "ActivityInfo"
                  ? styles.selected_item
                  : null
              ]}
            >
              <Image
                style={styles.iconss}
                source={require("../../../assets/images/icons/heartbeat.png")}
              />
              <Text
                style={[
                  styles.text_style,
                  this.props.activeItemKey == "ActivityInfo"
                    ? styles.selected_text
                    : null
                ]}
                onPress={this.navigateToScreen("ActivityInfo")}
              >
                Centrum aktywności
              </Text>
            </View>
          ) : null}
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "ActivityHistory"
                ? styles.selected_item
                : null
            ]}
          >
            <Image
              style={styles.iconss}
              source={require("../../../assets/images/icons/history.png")}
            />
            <Text
              style={[
                styles.text_style,
                this.props.activeItemKey == "ActivityHistory"
                  ? styles.selected_text
                  : null
              ]}
              onPress={this.navigateToScreen("ActivityHistory")}
            >
              Twoje Treningi
            </Text>
          </View>
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "Map" ? styles.selected_item : null
            ]}
          >
            <Icon
              name="run"
              style={styles.iconss_icon}
              size={21}
              color="#000000"
            />
            <Text
              style={[
                styles.text_style,
                this.props.activeItemKey == "Map" ? styles.selected_text : null
              ]}
              onPress={this.navigateToScreen("Map")}
            >
              Mapa
            </Text>
          </View>
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "Settings"
                ? styles.selected_item
                : null
            ]}
          >
            <Image
              style={styles.iconss}
              source={require("../../../assets/images/icons/settings.png")}
            />
            <Text
              style={[
                styles.text_style,
                this.props.activeItemKey == "Settings"
                  ? styles.selected_text
                  : null
              ]}
              onPress={this.navigateToScreen("Settings")}
            >
              Ustawienia
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  bottom_container: {
    position: "absolute",
    right: 0,
    top: "5%"
  },
  profile_container: {
    height: 120,
    width: "90%"
  },
  profile: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)"
  },
  profile_icon: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)"
  },
  profile_header: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 20
  },
  header: {
    paddingBottom: 5,
    textAlign: "left",
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.8)",
    fontSize: 14
  },
  screen_container: {
    paddingTop: 20,
    width: "100%"
  },
  navigator_container: {
    marginTop: 10,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  text_style: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.8)",
    fontSize: 16,
    marginLeft: 15,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  selected_text: {
    color: "#dd9ba9"
  },
  icons: {
    marginLeft: 15,
    color: "rgba(0,0,0,0.8)",
    fontSize: 20
  },
  iconss: {
    marginLeft: 15,
    width: 16,
    height: 16
  },
  iconss_icon: {
    marginLeft: 11
  },
  selected_item: {
    backgroundColor: "#f2f2f2"
  }
});
