import { View, StyleSheet } from 'react-native';
import { CButton } from './CButton';
import ArrowbackButton from '@/assets/images/buttons/ArrowbackButton';

export function BackButton() {
  return (
    <View style={styles.container}>
      <CButton href="..">
        <ArrowbackButton width={200} height={200}/>
      </CButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 5
  }
});
