import { ScrollView, Text, View } from 'react-native';

import { Deck } from '@/components/atoms/Deck';
import { PROFILES_DATA } from '@/constants';
import { Card, Image } from '@rneui/base';

export default function HomeScreen() {
  const renderCard = (item) => {
    return (
      <Card containerStyle={{ padding: 0, margin: 0, alignItems: "center", borderRadius: 20 }}>
        <Image
          style={{ width: 300, height: 400 }}
          resizeMode="contain"
          source={{ uri: item.photo }}
        />
        <Card.Title>{item.name}</Card.Title>
      </Card>
    )
  }

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Deck data={PROFILES_DATA} renderCard={renderCard} />
      </View>
    </ScrollView>
  );
}
