import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
  Picker,
  ActivityIndicator,
  Button
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
var ImagePicker = require("react-native-image-picker");

const { height } = Dimensions.get("window");

export default class CreateAccount extends Component {
  constructor() {
    super();

    this.state = {
      UserUserName: "",
      UserPassword: "",
      UserEmail: "",
      UserFirstName: "",
      UserLastName: "",
      UserDateOfBirth: "",
      UserCountry: "",
      imageSource: null,
      isLoading: true,
      isDateTimePickerVisible: false,
      PickerValueHolder: ""
    };
  }

  UserRegistrationFunction = () => {
    fetch("http://192.168.0.2/smartActivity/user_registration.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.UserUserName,
        password: this.state.UserPassword,
        email: this.state.UserEmail,
        first_name: this.state.UserFirstName,
        last_name: this.state.UserLastName,
        date_of_birth: this.state.UserDateOfBirth,
        country: this.state.UserCountry
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
        this.props.navigation.navigate("Login");
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    return fetch("http://192.168.0.2/smartActivity/country_list.php")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  GetPickerSelectedItemValue = () => {
    Alert.alert(this.state.PickerValueHolder);
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false
    });
  };

  handleDatePicked = date => {
    this.setState({
      isDateTimePickerVisible: false,
      UserDateOfBirth: moment(date).format("YYYY/MM/DD")
    });
  };

  static navigationOptions = {
    header: null
  };

  state = {
    screenHeight: 0
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  selectProfileIcon() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source
        });
      }
    });
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
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
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logo_container}>
              <View style={styles.profile_icon_container}>
                <TouchableOpacity>
                  <Icon
                    name="plus-circle"
                    size={30}
                    color="rgba(0,0,0,0.5)"
                    style={styles.plus_action_container}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputs_container}>
              <TextInput
                placeholder="Waga"
                placeholderTextColor="rgba(0,0,0,0.5)"
                returKeyType="next"
                onSubmitEditing={() => this.userUserNameInput.focus()}
                onChangeText={username =>
                  this.setState({ UserUserName: username })
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Wzrost"
                placeholderTextColor="rgba(0,0,0,0.5)"
                secureTextEntry
                returKeyType="next"
                ref={input => (this.userUserNameInput = input)}
                onChangeText={password =>
                  this.setState({ UserPassword: password })
                }
                style={styles.input}
              />
              <TouchableOpacity
                onPress={this.UserRegistrationFunction}
                style={{
                  backgroundColor: "#000000",
                  borderWidth: 1,
                  alignItems: "center",
                  borderRadius: 3,
                  marginLeft: 5,
                  marginRight: 5,
                  paddingVertical: 10
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    fontFamily: "Quicksand-Bold",
                    color: "#ffffff",
                    fontWeight: "700"
                  }}
                >
                  UTWÓRZ KONTO
                </Text>
              </TouchableOpacity>
              <Text style={styles.adding}>
                Czy jesteś już członkiem?{" "}
                <Text
                  onPress={() => this.props.navigation.navigate("Login")}
                  style={styles.adding_link}
                >
                  Zaloguj się
                </Text>{" "}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "transparent"
  },
  profile_icon_container: {
    marginTop: 40,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  plus_action_container: {
    position: "absolute",
    top: 1,
    right: 20
  },
  inputs_container: {
    padding: 20
  },
  logo: {
    width: 100,
    height: 100
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 1
  },
  adding: {
    color: "rgba(0,0,0,0.7)",
    fontFamily: "Quicksand-Light",
    fontSize: 11,
    marginTop: 9,
    textAlign: "center"
  },
  adding_link: {
    fontFamily: "Quicksand-Bold"
  },
  sex_header: {
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5
  },
  title: {
    color: "#000000",
    fontFamily: "Quicksand-Bold",
    fontSize: 15,
    marginTop: 5,
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
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 10,
    marginBottom: 20
  },
  button_text: {
    textAlign: "center",
    fontFamily: "Quicksand-Light",
    fontSize: 13,
    color: "rgba(0,0,0,0.5)",
    fontWeight: "700"
  },
  sex_container_chooser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.2)",
    paddingHorizontal: 10
  }
});
