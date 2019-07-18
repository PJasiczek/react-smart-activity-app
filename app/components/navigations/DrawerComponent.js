import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
                source={require("../../../assets/images/Profil_icon.png")}
              />
            </View>
            <View style={styles.profile_header}>
              <Text style={styles.header}>Piotr Jasiczek</Text>
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
            <Icon name="account" style={styles.icons} />
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
              this.props.activeItemKey == "Map" ? styles.selected_item : null
            ]}
          >
            <Icon name="run" style={styles.icons} />
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
              this.props.activeItemKey == "ActivityInfo"
                ? styles.selected_item
                : null
            ]}
          >
            <Icon name="pulse" style={styles.icons} />
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
          <View
            style={[
              styles.navigator_container,
              this.props.activeItemKey == "Settings"
                ? styles.selected_item
                : null
            ]}
          >
            <Icon name="settings" style={styles.icons} />
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  profile_container: {
    height: 120,
    width: "90%"
  },
  profile: {
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
    color: "#777777",
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
    color: "#777777",
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
    color: "#777777",
    fontSize: 20
  },
  selected_item: {
    backgroundColor: "#f2f2f2"
  }
});
