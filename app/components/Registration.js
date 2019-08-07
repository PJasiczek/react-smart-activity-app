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
      UserUserName: "",
      UserPassword: "",
      UserEmail: "",
      UserFirstName: "",
      UserLastName: "",
      PickerValueCountry: "",
      PickerValueDay: "",
      PickerValueMonth: "",
      PickerValueYear: "",
      UserCountry: "",
      value: "M",
      UserWeight: "",
      UserHeight: "",
      UserProfileIcon: "",
      ErrorFirstName: "",
      ErrorLastName: "",
      ErrorUserName: "",
      ErrorPassword: "",
      ErrorEmail: "",
      ErrorDateOfBirth: "",
      ErrorCountry: "",
      ErrorSex: ""
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
        date_of_birth:
          this.state.PickerValueYear +
          "-" +
          this.state.PickerValueMonth +
          "-" +
          this.state.PickerValueDay,
        country: this.state.UserCountry,
        sex: this.state.value,
        weight: this.state.UserWeight,
        height: this.state.UserHeight,
        profile_icon: this.state.UserProfileIcon
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson == "Użytkownik istnieje już w systemie") {
          Toast.showShortBottom(responseJson);
        } else if (responseJson == "Proszę wpisać poprawne imię") {
          this.setState({
            ErrorFirstName: responseJson,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: "",
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawne nazwisko") {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: responseJson,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: "",
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawną nazwę użytkownika") {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: responseJson,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: "",
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawne hasło") {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: responseJson,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: "",
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (
          responseJson == "Proszę wpisać poprawny adres skrzynki pocztowej"
        ) {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: responseJson,
            ErrorDateOfBirth: "",
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (responseJson == "Proszę wpisać poprawną datę urodzenia") {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: responseJson,
            ErrorCountry: this.state.UserCountry,
            ErrorSex: this.state.value
          });
        } else if (
          responseJson == "Proszę wprowadzić poprawny region zamieszkania"
        ) {
          this.setState({
            ErrorFirstName: this.state.UserFirstName,
            ErrorLastName: this.state.UserLastName,
            ErrorUserName: this.state.UserUserName,
            ErrorPassword: this.state.UserPassword,
            ErrorEmail: this.state.UserEmail,
            ErrorDateOfBirth: "",
            ErrorCountry: responseJson,
            ErrorSex: this.state.value
          });
        } else if (responseJson == "Proszę wybrać płeć") {
          this.setState({
            ErrorSex: responseJson
          });
        } else if (responseJson == "Nastąpiło poprawne utworzenie konta") {
          this.props.navigation.navigate("CreateAccount", {
            username: this.state.UserUserName
          });
        }
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
    Alert.alert(
      this.state.PickerValueYear +
        "-" +
        this.state.PickerValueMonth +
        "-" +
        this.state.PickerValueDay
    );
  };

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
            <ActivityIndicator />
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
              {this.state.ErrorFirstName != "Proszę wpisać poprawne imię" &&
              this.state.ErrorLastName != "Proszę wpisać poprawne nazwisko" ? (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Imię"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onChangeText={first_name =>
                      this.setState({ UserFirstName: first_name })
                    }
                    value={this.state.UserFirstName}
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
                    onChangeText={last_name =>
                      this.setState({ UserLastName: last_name })
                    }
                    value={this.state.UserLastName}
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
                    onChangeText={first_name =>
                      this.setState({ UserFirstName: first_name })
                    }
                    value={this.state.UserFirstName}
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
                    onChangeText={last_name =>
                      this.setState({ UserLastName: last_name })
                    }
                    value={this.state.UserLastName}
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
                  this.state.ErrorFirstName == "" &&
                  this.state.ErrorLastName == ""
                    ? false
                    : true
                }
                style={styles.healper_text}
              >
                {this.state.ErrorFirstName == "" &&
                this.state.ErrorLastName == ""
                  ? ""
                  : this.state.ErrorFirstName}
              </HelperText>

              {this.state.ErrorUserName !=
              "Proszę wpisać poprawną nazwę użytkownika" ? (
                <TextInput
                  placeholder="Nazwa użytkownika"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userUserNameInput.focus()}
                  onChangeText={username =>
                    this.setState({ UserUserName: username })
                  }
                  value={this.state.UserUserName}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="Nazwa użytkownika"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userUserNameInput.focus()}
                  onChangeText={username =>
                    this.setState({ UserUserName: username })
                  }
                  value={this.state.UserUserName}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.ErrorUserName == "" ||
                  this.state.ErrorUserName !=
                    "Proszę wpisać poprawną nazwę użytkownika"
                    ? false
                    : true
                }
              >
                {this.state.ErrorUserName}
              </HelperText>

              {this.state.ErrorPassword != "Proszę wpisać poprawne hasło" ? (
                <TextInput
                  placeholder="Hasło"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  secureTextEntry
                  returKeyType="next"
                  ref={input => (this.userUserNameInput = input)}
                  onChangeText={password =>
                    this.setState({ UserPassword: password })
                  }
                  value={this.state.UserPassword}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="Hasło"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  secureTextEntry
                  returKeyType="next"
                  ref={input => (this.userUserNameInput = input)}
                  onChangeText={password =>
                    this.setState({ UserPassword: password })
                  }
                  value={this.state.UserPassword}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.ErrorPassword == "" ||
                  this.state.ErrorPassword != "Proszę wpisać poprawne hasło"
                    ? false
                    : true
                }
              >
                {this.state.ErrorPassword}
              </HelperText>

              {this.state.ErrorEmail !=
              "Proszę wpisać poprawny adres skrzynki pocztowej" ? (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  ref={input => (this.userEmailInput = input)}
                  returKeyType="next"
                  onChangeText={email => this.setState({ UserEmail: email })}
                  value={this.state.UserEmail}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  ref={input => (this.userEmailInput = input)}
                  returKeyType="next"
                  onChangeText={email => this.setState({ UserEmail: email })}
                  value={this.state.UserEmail}
                  style={styles.input_error}
                />
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.ErrorEmail == "" ||
                  this.state.ErrorEmail !=
                    "Proszę wpisać poprawny adres skrzynki pocztowej"
                    ? false
                    : true
                }
              >
                {this.state.ErrorEmail}
              </HelperText>

              {this.state.ErrorDateOfBirth !=
              "Proszę wpisać poprawną datę urodzenia" ? (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Dzień"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    returKeyType="next"
                    onChangeText={date_of_birth_day =>
                      this.setState({ PickerValueDay: date_of_birth_day })
                    }
                    value={this.state.PickerValueDay}
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
                      selectedValue={this.state.PickerValueMonth}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ PickerValueMonth: itemValue })
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
                      selectedValue={this.state.PickerValueYear}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ PickerValueYear: itemValue })
                      }
                    >
                      <Picker.Item label="Rok" value="" />
                      <Picker.Item label="1996" value="1996" />
                      <Picker.Item label="1997" value="1997" />
                      <Picker.Item label="1998" value="1998" />
                      <Picker.Item label="1999" value="1999" />
                      <Picker.Item label="2000" value="2000" />
                      <Picker.Item label="2001" value="2001" />
                      <Picker.Item label="2002" value="2002" />
                      <Picker.Item label="2003" value="2003" />
                      <Picker.Item label="2004" value="2004" />
                    </Picker>
                  </View>
                </View>
              ) : (
                <View style={styles.inputs_inner_container}>
                  <TextInput
                    placeholder="Dzień"
                    placeholderTextColor="rgba(255,0,0,1.0)"
                    returKeyType="next"
                    onChangeText={date_of_birth_day =>
                      this.setState({ PickerValueDay: date_of_birth_day })
                    }
                    value={this.state.PickerValueDay}
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
                      selectedValue={this.state.PickerValueMonth}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ PickerValueMonth: itemValue })
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
                      selectedValue={this.state.PickerValueYear}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ PickerValueYear: itemValue })
                      }
                    >
                      <Picker.Item label="Rok" value="" />
                      <Picker.Item label="1996" value="1996" />
                      <Picker.Item label="1997" value="1997" />
                      <Picker.Item label="1998" value="1998" />
                      <Picker.Item label="1999" value="1999" />
                      <Picker.Item label="2000" value="2000" />
                      <Picker.Item label="2001" value="2001" />
                      <Picker.Item label="2002" value="2002" />
                      <Picker.Item label="2003" value="2003" />
                      <Picker.Item label="2004" value="2004" />
                    </Picker>
                  </View>
                </View>
              )}
              <HelperText
                type="error"
                padding="none"
                visible={
                  this.state.ErrorDateOfBirth == "" ||
                  this.state.ErrorDateOfBirth !=
                    "Proszę wpisać poprawną datę urodzenia"
                    ? false
                    : true
                }
              >
                {this.state.ErrorDateOfBirth}
              </HelperText>

              {this.state.ErrorCountry == "" ? (
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
                    selectedValue={this.state.UserCountry}
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
                    selectedValue={this.state.UserCountry}
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
              )}
              <HelperText
                type="error"
                padding="none"
                visible={this.state.ErrorCountry == "" ? false : true}
              >
                {this.state.ErrorCountry}
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
    width: 160,
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
