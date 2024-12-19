import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import React, { useEffect, useState } from 'react';
import { CText } from '@/components/text/CText';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { CGestureHandler } from '@/components/containers/CGestureHandler';
import { useData } from '@/components/CDataProvider';
import { TransparentBlack } from '@/constants/TransparentBlack';
import { storeData } from '@/utils/asyncDataStorage';

import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert
} from 'react-native';


export default function Profile() {
  const { user, setUser, userId, setUserId } = useData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${DATABASE_SERVER_URI}/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Unable to fetch user data.");
    }
  };

  const handleLogIn = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      console.log(username)
      const response = await axios.get(`${DATABASE_SERVER_URI}/login/${username}`);
      setUserId(response.data[0].id);
      console.log(response.data[0].id)
      setUser(response.data.user);
      storeData("id", "1");
    } catch (error) {
      console.error("Log-in error:", error);
      setError("Invalid username or password.");
    }
  };

  const logOut = () => {
    setUserId(0);
  };

  useEffect(() => {
    fetchUsers();
    console.log(user)
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <CGestureHandler>
          <CArrowButton />
          <View style={styles.container}>
          <View style={styles.form}>
            {userId ? (
              <>
                {/* <CText size={45}>{user.name}</CText> */}
                <CButton style={styles.button} onPress={logOut}>
                  <CText size={20}>Log out</CText>
                </CButton>
              </>
            ) : (
              <>
                <CText outlined size={45}>Log in</CText>
                <TextInput
                  style={styles.textInput}
                  maxLength={20}
                  placeholder="Enter your user name"
                  placeholderTextColor="#fff"
                  cursorColor="red"
                  value={username}
                  onChangeText={setUsername}
                  selectionColor="red"
                />
                {error ? <InputField error={error} /> : null}
                <TextInput
                  style={styles.textInput}
                  maxLength={20}
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  cursorColor="red"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  selectionColor="red"
                />
                <CButton style={styles.button} onPress={handleLogIn}>
                  <CText size={20}>Log in</CText>
                </CButton>
              </>
            )}
            </View>
          </View>
        </CGestureHandler>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const InputField = ({error}: {error:string}) => {
  return (
    <View>
      <CText outlined color="red">{error}</CText>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    gap: 20,
    alignContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: TransparentBlack,
    fontFamily: "BlackHanSans",
    fontSize: 16,
    color: "white",
    padding: 15,
    borderRadius: 8,
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#663399",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
