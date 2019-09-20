import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  Switch,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import BluetoothSerial, {
  withSubscription
} from "react-native-bluetooth-serial-next";
import LinearGradient from "react-native-linear-gradient";
import Toast from "@remobile/react-native-toast";
import { DrawerActions } from "react-navigation";
import { Buffer } from "buffer";

const { height, width } = Dimensions.get("window");

global.Buffer = Buffer;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      description: ""
    };
  }

  async componentDidMount() {
    this.events = this.props.events;

    try {
      const [isEnabled, devices] = await Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ]);

      this.setState({
        isEnabled,
        description:
          isEnabled == true
            ? "Widoczność Bluetooth włączona."
            : "Widoczność Bluetooth wyłączona."
      });
    } catch (e) {
      this.setState({
        description: e.message
      });
    }

    this.events.on("bluetoothEnabled", () => {
      this.setState({
        isEnabled: true,
        description: "Widoczność Bluetooth włączona."
      });
    });

    this.events.on("bluetoothDisabled", () => {
      this.setState({
        isEnabled: false,
        description: "Widoczność Bluetooth wyłączona."
      });
    });
  }

  toggleBluetooth = async value => {
    try {
      if (value) {
        await BluetoothSerial.enable();
      } else {
        await BluetoothSerial.disable();
      }
    } catch (e) {
      this.setState({
        description: e.message
      });
    }
  };
  render() {
    const { isEnabled, device, devices, scanning, processing } = this.state;

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
        <SafeAreaView style={{ flex: 1 }}>
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
          <View style={styles.top_container}>
            <Text style={styles.ble_header}>Bluetooth</Text>
            <View style={styles.enableInfoWrapper}>
              <Switch
                onValueChange={this.toggleBluetooth}
                value={isEnabled}
                trackColor="#dd9ba9"
              />
            </View>
          </View>
          <View style={styles.bottom_container}>
            <View style={styles.circle_bluetooth}>
              <View style={styles.circle_bluetooth1}>
                <View style={styles.circle_bluetooth2}>
                  <TouchableOpacity style={styles.circle_bluetooth3}>
                    <Image
                      source={require("../../assets/images/icons/bluetooth.png")}
                      style={styles.edit_action_image}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.bottom_bottom_container}>
              <Text style={styles.ble_descriptor}>
                {this.state.description == "Bluetooth adapter not found"
                  ? "Nie znaleziono adaptera Bluetooth"
                  : this.state.description}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#f5fcff"
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
  top_container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    paddingHorizontal: 40,
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottom_container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
    paddingVertical: 30,
    alignItems: "center"
  },
  bottom_bottom_container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    marginTop: 20,
    alignItems: "center"
  },
  circle_bluetooth: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(152,152,152,0.2)",
    borderWidth: 1,
    borderRadius: Dimensions.get("window").width * 0.4
  },
  circle_bluetooth1: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(152,152,152,0.4)",
    borderWidth: 1,
    borderRadius: Dimensions.get("window").width * 0.3
  },
  circle_bluetooth2: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(152,152,152,0.5)",
    borderWidth: 1,
    backgroundColor: "rgba(152,152,152,0.05)",
    borderRadius: Dimensions.get("window").width * 0.2
  },
  circle_bluetooth3: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(152,152,152,0.5)",
    borderWidth: 1,
    backgroundColor: "rgba(152,152,152,0.2)",
    borderRadius: Dimensions.get("window").width * 0.1
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
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    zIndex: 3
  },
  ble_header: {
    fontFamily: "Quicksand-Light",
    fontWeight: "800",
    color: "rgba(0,0,0,0.7)",
    fontSize: 16,
    alignSelf: "center"
  },
  ble_descriptor: {
    fontFamily: "Quicksand-Light",
    fontWeight: "400",
    color: "rgba(0,0,0,0.7)",
    fontSize: 14,
    alignSelf: "center"
  },
  enableInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default withSubscription({ subscriptionName: "events" })(Settings);
