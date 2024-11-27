import { StyleSheet, View } from 'react-native';
import { CBackground } from '@/components/containers/CBackground';
import { CContainer } from '@/components/containers/CContainer';
import { CButton } from '@/components/buttons/CButton';
import { BackButton } from '@/components/buttons/BackButton';
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
    <CBackground>
      <BackButton />
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
    </CBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
