import { StyleSheet, View } from 'react-native';
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CButton } from '@/components/buttons/CButton';
import { CArrowButton } from '@/components/buttons/CArrowButton';
import { useEffect, useState } from 'react';
import { CText } from '@/components/text/CText';
import { DATABASE_SERVER_URI } from '@/constants/URI';
import { CPadding } from '@/components/containers/CPadding';
import axios from 'axios';

import SignoutButton from '@/assets/images/buttons/SignoutButton';

export default function Profile() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(DATABASE_SERVER_URI + "/user");
    setUsers(response.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <CPadding>
      <CArrowButton />
      <View style={styles.container}>
        {users ? users.map((user, idx) => {
          return <CText size={45} key={idx}>{user.mail}</CText>
        }) : <CText size={45}>e</CText>}
      </View>
      <CControlPanel>
        <CButton>
          <SignoutButton width={270} height={90} />
        </CButton>
      </CControlPanel>
    </CPadding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
