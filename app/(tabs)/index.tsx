import { View } from 'react-native';

import { ThemedText } from '@/components/atoms/ThemedText';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Hello!</ThemedText>
    </View>
  );
}
