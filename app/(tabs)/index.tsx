import { Text, View } from 'react-native';

import { Deck } from '@/components/atoms/Deck';
import { PROFILES_DATA } from '@/constants';

export default function HomeScreen() {
  const renderCard = (item) => {
    return (
      <>
        <Text>{item.name}</Text>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Deck data={PROFILES_DATA} renderCard={renderCard} />
    </View>
  );
}
