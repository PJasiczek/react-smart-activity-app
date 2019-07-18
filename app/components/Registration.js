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
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

const { height } = Dimensions.get("window");

export default class Registration extends Component {
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
    fetch("http://192.168.0.4/smartActivity/user_registration.php", {
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
    return fetch("http://192.168.0.4/smartActivity/country_list.php")
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
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.logo_container}>
            <Text style={styles.title}>
              KONTO UMOŻLIWIAJĄCE DOSTĘP DO WSZYSTKICH USŁUG SMART ACTIVITY
            </Text>
            <View style={styles.profile_icon_container}>
              <TouchableOpacity>
                <Icon
                  name="plus-circle"
                  size={30}
                  color="rgba(152,152,152,1)"
                  style={styles.plus_action_container}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputs_container}>
            <TextInput
              placeholder="Nazwa użytkownika"
              placeholderTextColor="rgba(0,0,0,0.5)"
              returKeyType="next"
              onSubmitEditing={() => this.userUserNameInput.focus()}
              onChangeText={username =>
                this.setState({ UserUserName: username })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Hasło"
              placeholderTextColor="rgba(0,0,0,0.5)"
              secureTextEntry
              returKeyType="next"
              ref={input => (this.userUserNameInput = input)}
              onChangeText={password =>
                this.setState({ UserPassword: password })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="rgba(0,0,0,0.5)"
              ref={input => (this.userEmailInput = input)}
              returKeyType="next"
              onChangeText={email => this.setState({ UserEmail: email })}
              style={styles.input}
            />
            <TextInput
              placeholder="Imię"
              placeholderTextColor="rgba(0,0,0,0.5)"
              returKeyType="next"
              onChangeText={first_name =>
                this.setState({ UserFirstName: first_name })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Nazwisko"
              placeholderTextColor="rgba(0,0,0,0.5)"
              returKeyType="next"
              onChangeText={last_name =>
                this.setState({ UserLastName: last_name })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="rrrr/mm/dd"
              placeholderTextColor="rgba(0,0,0,0.5)"
              returKeyType="next"
              onTouchStart={this.showDateTimePicker}
              value={this.state.UserDateOfBirth}
              onChangeText={date_of_birth =>
                this.setState({ UserDateOfBirth: date_of_birth })
              }
              style={styles.input}
            />
            /*
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              datePickerModeAndroid={"spinner"}
              mode={"date"}
            />
            */
            <View
              style={{
                height: 40,
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 1,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "rgba(0,0,0,0.5)"
              }}
            >
              <Picker
                style={styles.input}
                placeholderTextColor="rgba(0,0,0,0.5)"
                selectedValue={this.state.PickerValueHolder}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ UserCountry: itemValue })
                }
                onChangeText={country =>
                  this.setState({ UserCountry: country })
                }
              >
                {this.state.dataSource.map((item, key) => (
                  <Picker.Item
                    label={item.country_name}
                    value={item.country_name}
                    key={key}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.sex_header}>Płeć</Text>
            <View style={styles.sex_container_chooser}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Registration")}
                style={styles.button_container}
              >
                <Text style={styles.button_text}>Mężczyzna</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_container}>
                <Text style={styles.button_text}>Kobieta</Text>
              </TouchableOpacity>
            </View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  profile_icon_container: {
    marginTop: 40,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderColor: "rgba(152,152,152,0.3)",
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
