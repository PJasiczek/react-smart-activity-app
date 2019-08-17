import React, { Component } from "react";
import { Platform, View, Text, Alert } from "react-native";
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
      step_modul: "",
      step_divide: "",
      distance: "",
      step: "",
      heart: "",
      values: {}
    };
    this.prefixUUID = "00002a0";
    this.suffixUUID = "-0000-1000-8000-00805f9b34fb";
    this.sensors = {
      0: "Temperature"
    };
  }

  serviceUUID(num) {
    return this.prefixUUID + num + this.suffixUUID;
  }

  notifyUUID(num) {
    return this.prefixUUID + num + this.suffixUUID;
  }

  writeUUID(num) {
    return this.prefixUUID + num + this.suffixUUID;
  }

  info(message) {
    this.setState({ info: message });
  }

  error(message) {
    this.setState({ info: "ERROR: " + message });
  }

  updateValue(key, value) {
    this.setState({ values: { ...this.state.values, [key]: value } });
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
      this.info("Scanning...");
      console.log(device);

      if (error) {
        this.error(error.message);
        return;
      }

      if (device.name === "Mi Smart Band 4") {
        this.info("Connecting to Mi Smart Band 4");
        Alert.alert(device.name);
        Alert.alert(device.id);
        this.manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            this.info("Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            this.info("Setting notifications");
            return this.setupNotifications(device);
          })
          .then(
            () => {
              this.info("Listening...");
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
    Alert.alert("characteristic value name", characteristic.value);
    const returnedValue = Buffer.from(characteristic.value, "base64").toString(
      "ascii"
    );
    Alert.alert("characteristic value name po utf-8", returnedValue);

    this.setState({ name: returnedValue });

    const serviceSerial = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWSerial = "00000006-0000-3512-2118-0009af100700";

    const characteristicSerial = await device.readCharacteristicForService(
      serviceSerial,
      characteristicWSerial
    );
    Alert.alert("characteristic value heart", characteristicSerial.value);

    const serviceStep = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWStep = "00000007-0000-3512-2118-0009af100700";

    const characteristicStep = await device.readCharacteristicForService(
      serviceStep,
      characteristicWStep
    );
    Alert.alert("characteristic value step", characteristicStep.value);
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
    Alert.alert("characteristic value distance", characteristicDistance.value);
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
      heart: returnedDistanceValue,
      step: steps,
      distance: distances,
      calorie: calories
    });
  }

  async setupNotificationss(device) {
    for (const id in this.sensors) {
      const service = this.serviceUUID(id);
      const characteristicW = this.writeUUID(id);
      const characteristicN = this.notifyUUID(id);

      const characteristic = await device.writeCharacteristicWithResponseForService(
        service,
        characteristicW,
        "AQ==" /* 0x01 in hex */
      );

      device.monitorCharacteristicForService(
        service,
        characteristicN,
        (error, characteristic) => {
          if (error) {
            this.error(error.message);
            return;
          }
          this.updateValue(characteristic.uuid, characteristic.value);
        }
      );
    }
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
        <Text>{this.state.heart}</Text>
      </View>
    );
  }
}
