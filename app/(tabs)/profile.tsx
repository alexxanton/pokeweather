import { StyleSheet, View } from 'react-native';
import { CContainer } from '@/components/containers/CContainer';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import { useEffect, useState } from 'react';
import { CText } from '@/components/text/CText';
import { uri } from '@/constants/URI';
import axios from 'axios';

import SignoutButton from '@/assets/images/buttons/SignoutButton';

export default function Team() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(uri + "/user");
    setUsers(response.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <CArrowButton />
      <View style={styles.container}>
        {users ? users.map((user, idx) => {
          return <CText size={45} key={idx}>{user.mail}</CText>
        }) : <CText size={45}>e</CText>}
      </View>
      <CContainer>
        <CButton>
          <SignoutButton width={270} height={90} />
        </CButton>
      </CContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
