import React, { Component } from "react";
import {
  AppRegistry,
  ActivityIndicator,
  ListView,
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
  Button,
  TextInput,
  ToastAndroid
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
import { HelperText, withTheme, Theme } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import moment from "moment";

const { height } = Dimensions.get("window");

const options = {
  title: "Wybierz zdjęcie profilowe",
  takePhotoButtonTitle: "Zrób zdjęcie",
  chooseFromLibraryButtonTitle: "Wybierz z galerii",
  cancelButtonTitle: "Anuluj",
  quality: 1
};

export default class ModifyProfile extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isUploading: false,
      screenHeight: 0,
      imageSource: null,
      userId: this.props.navigation.state.params.id,
      userUserName: "",
      userOldPassword: "",
      userNewPassword: "",
      userEmail: "",
      userWeight: "",
      userHeight: "",
      userProfileIcon: "",
      errorEmail: "",
      errorWeight: "",
      errorHeight: ""
    };
  }

  componentDidMount() {
    return fetch(
      "http://jasiu1047.unixstorm.org/smartactivity/user_data_values.php",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.state.userId
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          userUserName: responseJson[0].username,
          userOldPassword: responseJson[0].password,
          userEmail: responseJson[0].email,
          userWeight: responseJson[0].weight,
          userHeight: responseJson[0].height,
          userProfileIcon: responseJson[0].profile_icon
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  userModifyFunction = () => {
    fetch(
      "http://jasiu1047.unixstorm.org/smartactivity/user_profile_modify.php",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.state.userId,
          password:
            this.state.userNewPassword == this.state.userOldPassword
              ? this.state.userNewPassword
              : this.state.userOldPassword,
          email: this.state.userEmail,
          weight: this.state.userWeight,
          height: this.state.userHeight,
          profile_icon: this.state.userProfileIcon
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (
          this.state.userEmail != "" &&
          this.state.userWeight != "" &&
          this.state.userHeight != ""
        ) {
          if (responseJson != "Nastąpiło poprawna modyfikacja konta") {
            this.props.navigation.navigate("Profile");
          } else {
            Toast.showShortBottom(responseJson);
          }
        } else if (this.state.userEmail == "") {
          this.setState({
            errorUserName: "Proszę wpisać poprawny adres skrzynki pocztowej",
            errorWeight: "",
            errorHeight: ""
          });
        } else if (this.state.userWeight == "") {
          this.setState({
            errorUserName: "",
            errorWeight: "Proszę wpisać poprawną wagę ciała",
            errorHeight: ""
          });
        } else if (this.state.userHeight == "") {
          this.setState({
            errorUserName: "",
            errorWeight: "",
            errorHeight: "Proszę wprowadzić poprawny wzrost"
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  selectProfileIcon = async () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        Alert.alert("Błąd", "Zatrzymano ImagePicker");
      } else if (response.error) {
        Alert.alert("Błąd", "Nieoczekiwany błąd ImagePicker");
      } else {
        this.setState({ userProfileIcon: response.uri });
        Alert.alert(response.uri);
        this.uploadPhoto(response.uri);
      }
    });
  };

  uploadPhoto = async imageUri => {
    this.setState({ isUploading: true });
    let baseUrl = "http://jasiu1047.unixstorm.org/smartactivity/";
    let uploadData = new FormData();

    uploadData.append("submit", "ok");
    uploadData.append("file", {
      type: "image/jpg",
      uri: imageUri,
      name: "profile_image.jpg"
    });
    fetch(baseUrl, {
      method: "POST",
      body: uploadData
    })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({
            isUploading: false,
            imageSource: baseUrl + response.image
          });
          Alert.alert(response.image);
        } else {
          this.setState({ isUploading: false });
          Alert.alert("Błąd", response.message);
        }
      })
      .catch(() => {
        this.setState({ isUploading: false });
        Alert.alert("Błąd", "Nie udało się nawiązać połączenia");
      });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    const { navigate } = this.props.navigation;
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
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.menu_open}
          >
            <Image
              style={styles.menu_button}
              source={require("../../assets/images/icons/left_arrow.png")}
            />
          </TouchableOpacity>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logo_container}>
              <TouchableOpacity onPress={this.selectProfileIcon.bind(this)}>
                <View style={styles.profile_icon_container}>
                  <Image
                    source={require("../../assets/images/icons/add_sign.png")}
                    style={styles.plus_action_container}
                  />
                  <Image
                    style={styles.profile_icon}
                    source={
                      this.state.imageSource == null
                        ? {
                            uri:
                              "http://jasiu1047.unixstorm.org/smartactivity/upload/images/" +
                              this.state.userProfileIcon
                          }
                        : { uri: this.state.imageSource }
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputs_container}>
              <Text style={styles.input_header}>Nazwa użytkownika</Text>
              <TextInput
                placeholder="Nazwa użytkownika"
                placeholderTextColor="rgba(0,0,0,0.5)"
                returKeyType="next"
                onSubmitEditing={() => this.userUserEmailInput.focus()}
                onChangeText={username =>
                  this.setState({ userUserName: username })
                }
                value={this.state.userUserName}
                style={styles.input}
              />
              <Text style={styles.input_input_header}>E-mail</Text>
              {this.state.errorUserName !=
              "Proszę wpisać poprawny adres skrzynki pocztowej" ? (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userOldPasswordInput.focus()}
                  onChangeText={email => this.setState({ UserEmail: email })}
                  value={this.state.userEmail}
                  ref={input => (this.userUserEmailInput = input)}
                  style={styles.input_input}
                />
              ) : (
                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userOldPasswordInput.focus()}
                  onChangeText={email => this.setState({ UserEmail: email })}
                  value={this.state.userEmail}
                  ref={input => (this.userUserEmailInput = input)}
                  style={styles.input_error}
                />
              )}
              {this.state.errorEmail !=
              "Proszę wpisać poprawny adres skrzynki pocztowej" ? null : (
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
              )}
              <Text style={styles.input_header}>Stare hasło</Text>
              <TextInput
                placeholder="Stare hasło"
                placeholderTextColor="rgba(0,0,0,0.5)"
                secureTextEntry
                returKeyType="next"
                onSubmitEditing={() => this.userNewPasswordInput.focus()}
                onChangeText={old_password =>
                  this.setState({ userOldPassword: old_password })
                }
                ref={input => (this.userOldPasswordInput = input)}
                style={styles.input}
              />
              <Text style={styles.input_header}>Nowe hasło</Text>
              <TextInput
                placeholder="Nowe hasło"
                placeholderTextColor="rgba(0,0,0,0.5)"
                secureTextEntry
                returKeyType="next"
                onSubmitEditing={() => this.userWeightInput.focus()}
                onChangeText={new_password =>
                  this.setState({ userNewPassword: new_password })
                }
                ref={input => (this.userNewPasswordInput = input)}
                style={styles.input}
              />
              <Text style={styles.input_input_header}>Waga</Text>
              {this.state.errorWeight != "Proszę wpisać poprawną wagę ciała" ? (
                <TextInput
                  placeholder="Waga (kg)"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userHeightInput.focus()}
                  onChangeText={weight => this.setState({ userWeight: weight })}
                  value={this.state.userWeight}
                  ref={input => (this.userWeightInput = input)}
                  style={styles.input_input}
                />
              ) : (
                <TextInput
                  placeholder="Waga (kg)"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userHeightInput.focus()}
                  onChangeText={weight => this.setState({ userWeight: weight })}
                  value={this.state.userWeight}
                  ref={input => (this.userWeightInput = input)}
                  style={styles.input_error}
                />
              )}
              {this.state.errorWeight !=
              "Proszę wpisać poprawną wagę ciała" ? null : (
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorWeight == "" ||
                    this.state.errorWeight !=
                      "Proszę wpisać poprawną wagę ciała"
                      ? false
                      : true
                  }
                >
                  {this.state.errorWeight}
                </HelperText>
              )}
              <Text style={styles.input_input_header}>Wzrost</Text>
              {this.state.errorWeight != "Proszę wprowadzić poprawny wzrost" ? (
                <TextInput
                  placeholder="Wzrost (cm)"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userHeightInput.focus()}
                  onChangeText={height => this.setState({ userHeight: height })}
                  value={this.state.userHeight}
                  ref={input => (this.userHeightInput = input)}
                  style={styles.input_input}
                />
              ) : (
                <TextInput
                  placeholder="Wzrost (cm)"
                  placeholderTextColor="rgba(255,0,0,1.0)"
                  returKeyType="next"
                  onSubmitEditing={() => this.userHeightInput.focus()}
                  onChangeText={height => this.setState({ userHeight: height })}
                  value={this.state.userHeight}
                  ref={input => (this.userHeightInput = input)}
                  style={styles.input_error}
                />
              )}
              {this.state.errorHeight !=
              "Proszę wprowadzić poprawny wzrost" ? null : (
                <HelperText
                  type="error"
                  padding="none"
                  visible={
                    this.state.errorHeight == "" ||
                    this.state.errorHeight !=
                      "Proszę wprowadzić poprawny wzrost"
                      ? false
                      : true
                  }
                >
                  {this.state.errorHeight}
                </HelperText>
              )}
              <TouchableOpacity
                onPress={this.userModifyFunction}
                style={{
                  backgroundColor: "#000000",
                  borderWidth: 1,
                  alignItems: "center",
                  borderRadius: 3,
                  marginTop: 10,
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
                  Edytuj
                </Text>
              </TouchableOpacity>
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
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 2
  },
  profile_icon: {
    width: 136,
    height: 136,
    borderRadius: 68
  },
  plus_action_container: {
    position: "absolute",
    height: 25,
    width: 25,
    top: 1,
    right: 20,
    zIndex: 3
  },
  inputs_container: {
    padding: 20
  },
  menu_button: {
    width: 20,
    height: 20,
    zIndex: 3
  },
  menu_open: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 20,
    top: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    zIndex: 3
  },
  logo: {
    width: 100,
    height: 100
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 1
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
    marginBottom: 0,
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10
  },
  input_input: {
    height: 40,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: 5,
    fontFamily: "Quicksand-Light",
    color: "rgba(0,0,0,0.5)",
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
  },
  healper_text: {
    marginBottom: 5
  },
  input_header: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.5)",
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5
  },
  input_input_header: {
    fontFamily: "Quicksand-Bold",
    color: "rgba(0,0,0,0.5)",
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5
  }
});
