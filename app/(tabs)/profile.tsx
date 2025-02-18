import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import React, { useEffect, useState } from 'react';
import { CText } from '@/components/text/CText';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { useData } from '@/components/CDataProvider';
import { TransparentBlack } from '@/constants/TransparentBlack';
import { storeData } from '@/utils/asyncDataStorage';
import Checkbox from 'expo-checkbox';

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
import { CPadding } from '@/components/containers/CPadding';


export default function Profile() {
  const {user, setUser, userId, setUserId} = useData();
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

  const validateForm = () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
  };

  const handleLogIn = async () => {
    validateForm();
    try {
      console.log(username)
      const response = await axios.get(`${DATABASE_SERVER_URI}/login/${username}`);
      setUserId(response.data[0].id);
      console.log(response.data[0].id)
      setUser(response.data.user);
      console.log(userId);
      
      storeData("id", response.data[0].id.toString());
    } catch (error) {
      console.error("Log-in error:", error);
      setError("Invalid username or password.");
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${DATABASE_SERVER_URI}/create-user`, {
        username,
        password
      });
      console.log(response.data);
      setUserId(response.data[0].insertId);
      storeData("id", response.data[0].insertId.toString());
    } catch (error) {
      console.error("User error:", error);
      setError("Username already exists.");
    }
  };

  const logOut = () => {
    setUserId(0);
    storeData("id", "0")
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
        <CPadding>
          <CArrowButton />
          <View style={styles.container}>
            <View style={styles.form}>
              {userId ? (
                <>
                  {/* {user ? <CText outlined size={40}>{`Hi, @${user[0].name}!`}</CText> : null} */}
                  <View style={styles.settings}>
                    <CBoxField title="Music" />
                    <CBoxField title="Sounds" />
                    <CBoxField title="Vibration" />
                  </View>
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
                  <View style={styles.buttons}>
                    <CButton style={styles.button} onPress={handleLogIn}>
                      <CText size={20}>Log in</CText>
                    </CButton>
                    <CButton style={styles.button} onPress={createUser}>
                      <CText size={20}>Create</CText>
                    </CButton>
                  </View>
                </>
              )}
            </View>
          </View>
        </CPadding>
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

const CBoxField = ({title}: {title: string}) => {
  const [checked, setCheked] = useState(true);
  return (
    <View style={styles.checkboxField}>
      <CText size={16}>{title}</CText>
      <Checkbox
        value={checked}
        onValueChange={setCheked}
        color="#663399"
        style={styles.checkbox}
      />
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
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  checkbox: {
    width: 30,
    height: 30,
  },
  settings: {
    backgroundColor: TransparentBlack,
    width: "80%",
    gap: 30,
    borderRadius: 15,
    padding: 15
  }
});
