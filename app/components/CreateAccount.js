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
import Toast from "@remobile/react-native-toast";
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

export default class CreateAccount extends Component {
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
      UserUserName: this.props.navigation.state.params.username,
      UserWeight: "",
      UserHeight: "",
      UserProfileIcon: ""
    };
  }

  UserModifyFunction = () => {
    fetch("http://192.168.0.2/smartActivity/user_account_modify.php", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.UserUserName,
        weight: this.state.UserWeight,
        height: this.state.UserHeight,
        profile_icon: this.state.UserProfileIcon
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Toast.showShortBottom(responseJson);
        this.props.navigation.navigate("Login");
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
        this.setState({ UserProfileIcon: response.uri });
        this.uploadPhoto(response.uri);
      }
    });
  };

  uploadPhoto = async imageUri => {
    this.setState({ isUploading: true });
    let baseUrl = "http://192.168.0.2/smartActivity/";
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
              <TouchableOpacity onPress={this.selectProfileIcon.bind(this)}>
                <View style={styles.profile_icon_container}>
                  <Image
                    source={require("../../assets/images/icons/add_sign.png")}
                    style={styles.plus_action_container}
                  />
                  {this.state.imageSource && (
                    <Image
                      style={styles.profile_icon}
                      source={{ uri: this.state.imageSource }}
                    />
                  )}
                  {this.state.isUploading && <ActivityIndicator />}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputs_container}>
              <TextInput
                placeholder="Waga"
                placeholderTextColor="rgba(0,0,0,0.5)"
                returKeyType="next"
                onSubmitEditing={() => this.userUserNameInput.focus()}
                onChangeText={weight => this.setState({ UserWeight: weight })}
                style={styles.input}
              />
              <TextInput
                placeholder="Wzrost"
                placeholderTextColor="rgba(0,0,0,0.5)"
                returKeyType="next"
                ref={input => (this.userUserNameInput = input)}
                onChangeText={height => this.setState({ UserHeight: height })}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={this.UserModifyFunction}
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
                  Utwórz konto
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
  profile_icon: {
    width: 166,
    height: 166,
    borderRadius: 85
  },
  plus_action_container: {
    position: "absolute",
    height: 30,
    width: 30,
    top: 1,
    right: 20,
    zIndex: 3
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
