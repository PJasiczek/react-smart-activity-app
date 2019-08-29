import React, { Component } from "react";
import { Platform, View, Text, Alert } from "react-native";
import Toast from "@remobile/react-native-toast";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
var converter = require("hex2dec");

export default class Bluetooth extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      info: "",
      name: "",
      serial_number: "",
      distance: "",
      step: "",
      heart: ""
    };
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: "Błąd: " + message });
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
        Alert.alert(device.name);
        Alert.alert(device.id);
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            this.info("Przeszukiwanie charakterystyk...");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            this.info("Czytanie...");
            setInterval(() => {
              return this.setupNotifications(device);
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

  async setupNotifications(device) {
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
    Alert.alert(calories);
    this.setState({
      name: returnedValue,
      heart: returnedDistanceValue,
      step: steps,
      distance: distances,
      calorie: calories
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.info}</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.serial_number}</Text>
        <Text>Kroki: {this.state.step}</Text>
        <Text>Dystans: {this.state.distance} m</Text>
        <Text>Kalorie: {this.state.calorie} cal</Text>
        <Text>Tętno: {this.state.heart}</Text>
      </View>
    );
  }
}
