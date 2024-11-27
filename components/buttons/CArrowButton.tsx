import { View, StyleSheet } from 'react-native';
import { CButton } from './CButton';
import ArrowbackButton from '@/assets/images/buttons/ArrowbackButton';

export function CArrowButton() {
  return (
    <View style={styles.container}>
      <CButton href="..">
        <ArrowbackButton />
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
