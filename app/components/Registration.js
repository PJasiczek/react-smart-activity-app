import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
  Picker,
  ActivityIndicator,
  Button,
  TextInput
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from "react-native-indicators";
import Toast from "@remobile/react-native-toast";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from "react-native-modal-datetime-picker";
import { RadioButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { HelperText, withTheme, Theme } from "react-native-paper";

import moment from "moment";

const { height } = Dimensions.get("window");

const options = {
  title: "Wybierz zdjęcie profilowe",
  takePhotoButtonTitle: "Zrób zdjęcie",
  chooseFromLibraryButtonTitle: "Wybierz z galerii",
  cancelButtonTitle: "Anuluj",
  quality: 1
};

export default class Registration extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      screenHeight: 0,
      userUserName: "",
      userPassword: "",
      userEmail: "",
      userFirstName: "",
      userLastName: "",
      pickerValueCountry: "",
      pickerValueDay: "",
      pickerValueMonth: "",
      pickerValueYear: "",
      userCountry: "",
      value: "M",
      userWeight: "",
      userHeight: "",
      userProfileIcon: "",
      errorFirstName: "",
      errorLastName: "",
      errorUserName: "",
      errorPassword: "",
      errorEmail: "",
      errorDateOfBirth: "",
      errorCountry: "",
      errorSex: ""
    };
  }

  createPickerYearBirthList = () => {
    let yearBirthList = [];

    for (let j = 1900; j < moment().year() + 1; j++) {
      yearBirthList.push(<Picker.Item label={`${j}`} value={`${j}`} />);
    }
    return yearBirthList;
  };

  userRegistrationFunction = () => {
    fetch(
      "http://jasiu1047.unixstorm.org/smartactivity/user_registration.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.userUserName,
          password: this.state.userPassword,
          email: this.state.userEmail,
          first_name: this.state.userFirstName,
          last_name: this.state.userLastName,
          date_of_birth:
            this.state.pickerValueYear +
            "-" +
            this.state.pickerValueMonth +
            "-" +
            this.state.pickerValueDay,
          country: this.state.userCountry,
          sex: this.state.value,
          weight: this.state.userWeight,
          height: this.state.userHeight,
          profile_icon: this.state.userProfileIcon
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson == "Użytkownik istnieje już w systemie") {
          Toast.showShortBottom(responseJson);
        } else if (responseJson == "Proszę wpisać poprawne imię") {
          this.setState({
            errorFirstName: responseJson,
            errorLastName: this.state.userLastName,
            errorUserName: this.state.userUserName,
            errorPassword: this.state.userPassword,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: "",
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawne nazwisko") {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: responseJson,
            errorUserName: this.state.userUserName,
            errorPassword: this.state.userPassword,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: "",
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawną nazwę użytkownika") {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: this.state.userLastName,
            errorUserName: responseJson,
            errorPassword: this.state.userPassword,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: "",
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawne hasło") {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: this.state.userLastName,
            errorUserName: this.state.userUserName,
            errorPassword: responseJson,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: "",
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (
          responseJson == "Proszę wpisać poprawny adres skrzynki pocztowej"
        ) {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: this.state.userLastName,
            errorUserName: this.state.userUserName,
            errorPassword: this.state.userPassword,
            errorEmail: responseJson,
            errorDateOfBirth: "",
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawną datę urodzenia") {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: this.state.userLastName,
            errorUserName: this.state.userUserName,
            errorPassword: this.state.userPassword,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: responseJson,
            errorCountry: this.state.userCountry,
            errorSex: this.state.value
          });
        } else if (
          responseJson == "Proszę wprowadzić poprawny region zamieszkania"
        ) {
          this.setState({
            errorFirstName: this.state.userFirstName,
            errorLastName: this.state.userLastName,
            errorUserName: this.state.userUserName,
            errorPassword: this.state.userPassword,
            errorEmail: this.state.userEmail,
            errorDateOfBirth: "",
            errorCountry: responseJson,
            errorSex: this.state.value
          });
        } else if (responseJson == "Proszę wybrać płeć") {
          this.setState({
            errorSex: responseJson
          });
        } else if (responseJson == "Nastąpiło poprawne utworzenie konta") {
          this.props.navigation.navigate("CreateAccount", {
            username: this.state.userUserName
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  test = () => {
    return fetch(
      "http://jasiu1047.unixstorm.org/smartactivity/countries_pl.json"
    )
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
  };

  componentDidMount() {
    return fetch(
      "http://jasiu1047.unixstorm.org/smartactivity/countries_pl.json"
    )
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

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const { navigate } = this.props.navigation;
    const scrollEnabled = this.state.screenHeight > height;
    const { checked } = this.state;

    if (this.state.isLoading) {
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MaterialIndicator size={70} color="#000000" />
          </View>
        </LinearGradient>
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
              <Image
                style={styles.logo}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.title}>
                Konto umożliwające dostęp do wszystkich usług Smart Activity
              </Text>
            </View>
            <View style={styles.inputs_container}>
              {this.state.errorFirstName != "Proszę wpisać poprawne imię" &&
              this.state.errorLastName != "Proszę wpisać poprawne nazwisko" ? (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Imię"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userLastNameInput.focus()}
                    onChangeText={first_name =>
                      this.setState({ userFirstName: first_name })
                    }
                    value={this.state.userFirstName}
                    style={{
                      height: 40,
                      width: "35%",
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      marginBottom: 0,
                      fontFamily: "Quicksand-Light",
                      color: "rgba(0,0,0,0.2)",
                      paddingHorizontal: 10
                    }}
                  />

                  <TextInput
                    placeholder="Nazwisko"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userUserNameInput.focus()}
                    onChangeText={last_name =>
                      this.setState({ userLastName: last_name })
                    }
                    value={this.state.userLastName}
                    ref={input => (this.userLastNameInput = input)}
                    style={{
                      height: 40,
                      width: "60%",
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      marginBottom: 0,
                      fontFamily: "Quicksand-Light",
                      color: "rgba(0,0,0,0.2)",
                      marginLeft: "4%",
                      paddingHorizontal: 10
                    }}
                  />
                </View>
              ) : (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Imię"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userLastNameInput.focus()}
                    onChangeText={first_name =>
                      this.setState({ userFirstName: first_name })
                    }
                    value={this.state.userFirstName}
                    style={{
                      height: 40,
                      width: "35%",
                      borderColor: "rgba(255,0,0,1.0)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,0,0,0.05)",
                      marginBottom: 0,
                      fontFamily: "Quicksand-Light",
                      color: "rgba(255,0,0,1.0)",
                      paddingHorizontal: 10
                    }}
                  />

                  <TextInput
                    placeholder="Nazwisko"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userUserNameInput.focus()}
                    onChangeText={last_name =>
                      this.setState({ userLastName: last_name })
                    }
                    value={this.state.userLastName}
                    ref={input => (this.userLastNameInput = input)}
                    style={{
                      height: 40,
                      width: "60%",
                      borderColor: "rgba(255,0,0,1.0)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,0,0,0.05)",
                      marginBottom: 0,
                      fontFamily: "Quicksand-Light",
                      color: "rgba(255,0,0,1.0)",
                      marginLeft: "4%",
                      paddingHorizontal: 10
                    }}
                  />
                </View>
              )}

              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.errorFirstName == "Proszę wpisać poprawne imię"
                    ? true
                    : this.state.errorLastName ==
                      "Proszę wpisać poprawne nazwisko"
                    ? true
                    : false
                }
                style={styles.healper_text}
              >
                {this.state.errorFirstName == "Proszę wpisać poprawne imię"
                  ? this.state.errorFirstName
                  : this.state.errorLastName ==
                    "Proszę wpisać poprawne nazwisko"
                  ? this.state.errorLastName
                  : ""}
              </HelperText>

              {this.state.errorUserName !=
              "Proszę wpisać poprawną nazwę użytkownika" ? (
                <TextInput
                  placeholder="Nazwa użytkownika"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userPasswordInput.focus()}
                  onChangeText={username =>
                    this.setState({ userUserName: username })
                  }
                  value={this.state.userUserName}
                  ref={input => (this.userUserNameInput = input)}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="Nazwa użytkownika"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userPasswordInput.focus()}
                  onChangeText={username =>
                    this.setState({ userUserName: username })
                  }
                  value={this.state.userUserName}
                  ref={input => (this.userUserNameInput = input)}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.errorUserName == "" ||
                  this.state.errorUserName !=
                    "Proszę wpisać poprawną nazwę użytkownika"
                    ? false
                    : true
                }
              >
                {this.state.errorUserName}
              </HelperText>

              {this.state.errorPassword != "Proszę wpisać poprawne hasło" ? (
                <TextInput
                  placeholder="Hasło"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  secureTextEntry
                  returKeyType="next"
                  onSubmitEditing={() => this.userEmailInput.focus()}
                  onChangeText={password =>
                    this.setState({ userPassword: password })
                  }
                  value={this.state.userPassword}
                  ref={input => (this.userPasswordInput = input)}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="Hasło"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  secureTextEntry
                  returKeyType="next"
                  onSubmitEditing={() => this.userEmailInput.focus()}
                  onChangeText={password =>
                    this.setState({ userPassword: password })
                  }
                  value={this.state.userPassword}
                  ref={input => (this.userPasswordInput = input)}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.errorPassword == "" ||
                  this.state.errorPassword != "Proszę wpisać poprawne hasło"
                    ? false
                    : true
                }
              >
                {this.state.errorPassword}
              </HelperText>

              {this.state.errorEmail !=
              "Proszę wpisać poprawny adres skrzynki pocztowej" ? (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userPickerValueDayInput.focus()}
                  onChangeText={email => this.setState({ userEmail: email })}
                  value={this.state.userEmail}
                  ref={input => (this.userEmailInput = input)}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userPickerValueDayInput.focus()}
                  onChangeText={email => this.setState({ userEmail: email })}
                  value={this.state.userEmail}
                  ref={input => (this.userEmailInput = input)}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.errorEmail == "" ||
                  this.state.errorEmail !=
                    "Proszę wpisać poprawny adres skrzynki pocztowej"
                    ? false
                    : true
                }
              >
                {this.state.errorEmail}
              </HelperText>

              {this.state.errorDateOfBirth !=
              "Proszę wpisać poprawną datę urodzenia" ? (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Dzień"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userPickerValueDayInput.focus()}
                    onChangeText={date_of_birth_day =>
                      this.setState({ pickerValueDay: date_of_birth_day })
                    }
                    value={this.state.pickerValueDay}
                    ref={input => (this.userPickerValueDayInput = input)}
                    style={{
                      height: 40,
                      width: "20%",
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      fontFamily: "Quicksand-Light",
                      color: "rgba(0,0,0,0.2)",
                      paddingLeft: 10
                    }}
                  />
                  <View
                    style={{
                      height: 40,
                      width: "40%",
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      color: "rgba(0,0,0,0.5)",
                      marginLeft: "4%"
                    }}
                  >
                    <Picker
                      placeholderTextColor="rgba(0,0,0,0.5)"
                      selectedValue={this.state.pickerValueMonth}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ pickerValueMonth: itemValue })
                      }
                      style={styles.input}
                    >
                      <Picker.Item label="Miesiąc" value="" />
                      <Picker.Item label="Styczeń" value="01" />
                      <Picker.Item label="Luty" value="02" />
                      <Picker.Item label="Marzec" value="03" />
                      <Picker.Item label="Kwiecień" value="04" />
                      <Picker.Item label="Maj" value="05" />
                      <Picker.Item label="Czerwiec" value="06" />
                      <Picker.Item label="Lipiec" value="07" />
                      <Picker.Item label="Sierpień" value="08" />
                      <Picker.Item label="Wrzesień" value="09" />
                      <Picker.Item label="Pażdziernik" value="10" />
                      <Picker.Item label="Listopad" value="11" />
                      <Picker.Item label="Grudzień" value="12" />
                    </Picker>
                  </View>
                  <View
                    style={{
                      height: 40,
                      width: "32%",
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      color: "rgba(0,0,0,0.5)",
                      marginLeft: "4%"
                    }}
                  >
                    <Picker
                      style={styles.input}
                      placeholderTextColor="rgba(0,0,0,0.5)"
                      selectedValue={this.state.pickerValueYear}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ pickerValueYear: itemValue })
                      }
                    >
                      <Picker.Item label="Rok" value="" />
                      {this.createPickerYearBirthList()}
                    </Picker>
                  </View>
                </View>
              ) : (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Dzień"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onSubmitEditing={() => this.userPickerValueDayInput.focus()}
                    onChangeText={date_of_birth_day =>
                      this.setState({ pickerValueDay: date_of_birth_day })
                    }
                    value={this.state.pickerValueDay}
                    ref={input => (this.userPickerValueDayInput = input)}
                    style={{
                      height: 40,
                      width: "20%",
                      borderColor: "rgba(255,0,0,1.0)",
                      borderWidth: 1,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255,0,0,0.05)",
                      fontFamily: "Quicksand-Light",
                      color: "rgba(255,0,0,1.0)",
                      paddingLeft: 10
                    }}
                  />
                  <View
                    style={{
                      height: 40,
                      width: "40%",
                      borderColor: "rgba(255,0,0,1.0)",
                      borderWidth: 1,
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      color: "rgba(255,0,0,1.0)",
                      marginLeft: "4%"
                    }}
                  >
                    <Picker
                      placeholderTextColor="rgba(255,0,0,1.0)"
                      selectedValue={this.state.pickerValueMonth}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ pickerValueMonth: itemValue })
                      }
                      style={styles.input_error}
                    >
                      <Picker.Item label="Miesiąc" value="" />
                      <Picker.Item label="Styczeń" value="01" />
                      <Picker.Item label="Luty" value="02" />
                      <Picker.Item label="Marzec" value="03" />
                      <Picker.Item label="Kwiecień" value="04" />
                      <Picker.Item label="Maj" value="05" />
                      <Picker.Item label="Czerwiec" value="06" />
                      <Picker.Item label="Lipiec" value="07" />
                      <Picker.Item label="Sierpień" value="08" />
                      <Picker.Item label="Wrzesień" value="09" />
                      <Picker.Item label="Pażdziernik" value="10" />
                      <Picker.Item label="Listopad" value="11" />
                      <Picker.Item label="Grudzień" value="12" />
                    </Picker>
                  </View>
                  <View
                    style={{
                      height: 40,
                      width: "32%",
                      borderColor: "rgba(255,0,0,1.0)",
                      borderWidth: 1,
                      borderRadius: 3,
                      backgroundColor: "transparent",
                      color: "rgba(255,0,0,1.0)",
                      marginLeft: "4%"
                    }}
                  >
                    <Picker
                      style={styles.input_error}
                      placeholderTextColor="rgba(255,0,0,1.0)"
                      selectedValue={this.state.pickerValueYear}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ pickerValueYear: itemValue })
                      }
                    >
                      <Picker.Item label="Rok" value="" />
                      {this.createPickerYearBirthList()}
                    </Picker>
                  </View>
                </View>
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.errorDateOfBirth == "" ||
                  this.state.errorDateOfBirth !=
                    "Proszę wpisać poprawną datę urodzenia"
                    ? false
                    : true
                }
              >
                {this.state.errorDateOfBirth}
              </HelperText>

              {this.state.errorCountry == "" ? (
                <View
                  style={{
                    height: 40,
                    borderColor: "rgba(0,0,0,0.3)",
                    borderWidth: 1,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "rgba(0,0,0,0.5)",
                    marginTop: 0
                  }}
                >
                  <Picker
                    style={styles.input}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    selectedValue={this.state.userCountry}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ userCountry: itemValue })
                    }
                    onChangeText={country =>
                      this.setState({ userCountry: country })
                    }
                  >
                    {this.state.dataSource.map((item, key) => (
                      <Picker.Item
                        label={item.name_pl}
                        value={item.name_pl}
                        key={key}
                      />
                    ))}
                  </Picker>
                </View>
              ) : (
                <View
                  style={{
                    height: 40,
                    borderColor: "rgba(255,0,0,1.0)",
                    borderWidth: 1,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,0,0,0.05)",
                    color: "rgba(255,0,0,1.0)",
                    marginTop: 0
                  }}
                >
                  <Picker
                    style={styles.input}
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    selectedValue={this.state.userCountry}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ userCountry: itemValue })
                    }
                    onChangeText={country =>
                      this.setState({ userCountry: country })
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
              )}
              <HelperText
                type="error"
                padding="none"
                visible={this.state.errorCountry == "" ? false : true}
              >
                {this.state.errorCountry}
              </HelperText>
              <View style={styles.sex_container_chooser}>
                <RadioButton.Group
                  onValueChange={value => this.setState({ value })}
                  value={this.state.value}
                >
                  <View style={styles.button_container}>
                    <RadioButton
                      value="M"
                      color="rgba(0,0,0,0.5)"
                      uncheckedColor="rgba(0,0,0,0.5)"
                    />
                    <Text style={styles.button_text}>Mężczyzna</Text>
                  </View>
                  <View style={styles.button_container}>
                    <RadioButton
                      value="K"
                      color="rgba(0,0,0,0.5)"
                      uncheckedColor="rgba(0,0,0,0.5)"
                    />
                    <Text style={styles.button_text}>Kobieta</Text>
                  </View>
                </RadioButton.Group>
              </View>
              <TouchableOpacity
                onPress={this.userRegistrationFunction}
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
                    fontWeight: "700",
                    textTransform: "uppercase"
                  }}
                >
                  Dalej
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
  inputs_inner_container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  healper_text: {
    marginBottom: 5
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
    textTransform: "uppercase",
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
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 3,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    paddingVertical: 2
  },
  button_text: {
    textAlign: "center",
    fontFamily: "Quicksand-Light",
    fontSize: 13,
    color: "rgba(0,0,0,0.5)"
  },
  sex_container_chooser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5
  },
  input_item: {
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.2)"
  },
  input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.2)",
    paddingHorizontal: 10
  },
  input_error: {
    height: 40,
    borderColor: "rgba(255,0,0,1.0)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,0,0,0.05)",
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "rgba(255,0,0,1.0)",
    paddingHorizontal: 10
  }
});
