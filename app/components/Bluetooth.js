import React, { Component } from "react";
import { Platform, View, Text, Alert } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";

export default class Bluetooth extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      info: "",
      name: "",
      serial_number: "",
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

    const serviceHeart = "0000fee0-0000-1000-8000-00805f9b34fb";
    const characteristicWHeart = "00000007-0000-3512-2118-0009af100700";

    const characteristicHeart = await device.readCharacteristicForService(
      serviceHeart,
      characteristicWHeart
    );
    Alert.alert("characteristic value heart", characteristicHeart.value);
    const returnedHeartValue = Buffer.from(
      characteristicHeart.value,
      "base64"
    ).toString("hex");
    var steps = returnedHeartValue.substring(2, 6);
    var calories = returnedHeartValue.substring(18, 20);
    this.setState({
      heart: returnedHeartValue,
      step: steps,
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
        <Text>{this.state.step}</Text>
        <Text>{this.state.calorie}</Text>
        <Text>{this.state.heart}</Text>
      </View>
    );
  }
}
