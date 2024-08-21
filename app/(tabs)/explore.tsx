import { View } from 'react-native';

import { ThemedText } from '@/components/atoms/ThemedText';
import { Link } from 'expo-router';

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Explore!</ThemedText>
      <Link href="/ye" style={{
        marginTop: 15,
        paddingVertical: 15,
      }}>
        <ThemedText type="link">Go to unknown screen!</ThemedText>
      </Link>
    </View>
  );
}
