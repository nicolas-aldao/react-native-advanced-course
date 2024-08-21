import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { ThemedText } from '@/components/atoms/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>This screen doesn't exist.</ThemedText>
        <Link href="/" style={{
          marginTop: 15,
          paddingVertical: 15,
        }}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}
