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
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import { useEffect, useState } from 'react';
import { CText } from '@/components/text/CText';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { CPadding } from '@/components/containers/CPadding';
import axios from 'axios';

import SignoutButton from '@/assets/images/buttons/SignoutButton';
import { useData } from '@/components/CDataProvider';
import { TransparentBlack } from '@/constants/TransparentBlack';

export default function Profile() {
  const { user, setUser, userId, setUserId } = useData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${DATABASE_SERVER_URI}/user`);
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
      const response = await axios.post(`${DATABASE_SERVER_URI}/login`, {
        username,
        password,
      });
      setUserId(response.data.userId);
      setUser(response.data.user);
    } catch (error) {
      console.error("Log-in error:", error);
      setError("Invalid username or password.");
    }
  };

  useEffect(() => {
    fetchUsers();
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
            {userId ? (
              <View style={styles.centeredContent}>
                <CText size={45}>{user.name}</CText>
                <CControlPanel>
                  <CButton>
                    <SignoutButton width={270} height={90} />
                  </CButton>
                </CControlPanel>
              </View>
            ) : (
              <View style={[styles.form, styles.centeredContent]}>
                <CText outlined size={45}>Log in</CText>
                {error ? <CText style={styles.errorText}>{error}</CText> : null}
                <TextInput
                  style={styles.textInput}
                  maxLength={20}
                  placeholder="Enter your user name"
                  placeholderTextColor="#fff"
                  cursorColor="white"
                  value={username}
                  onChangeText={setUsername}
                  selectionColor="red"

                />
                <TextInput
                  style={styles.textInput}
                  maxLength={20}
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  cursorColor="white"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  selectionColor="red"
                />
                <CButton style={[styles.button, styles.buttonShadow]} onPress={handleLogIn}>
                  <CText size={20} style={styles.buttonText}>Log in</CText>
                </CButton>
              </View>
            )}
          </View>
        </CPadding>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

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
  },
  centeredContent: {
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: TransparentBlack,
    fontFamily: "BlackHanSans",
    fontSize: 16,
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
