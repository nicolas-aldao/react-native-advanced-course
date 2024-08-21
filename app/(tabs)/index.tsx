import { ScrollView, Text, View } from 'react-native';

import { Deck } from '@/components/atoms/Deck';
import { PROFILES_DATA } from '@/constants';
import { Card, Image } from '@rneui/base';
import { ThemedText } from '@/components/atoms/ThemedText';

export default function HomeScreen() {
  const renderCard = (item) => {
    return (
      <Card containerStyle={{
        padding: 0, margin: 0, alignItems: "center", borderRadius: 20, width: 300
      }}
        wrapperStyle={{}}>
        <Image
          style={{ width: 300, height: 520 }}
          resizeMode="cover"
          source={{ uri: item.photo }}
        />
        <Card.Title style={{ marginBottom: 0 }}>{item.name}</Card.Title>
      </Card>
    )
  }

  const renderNoMoreCards = () => {
    return <ThemedText style={{ color: 'red' }}>No more cards!!</ThemedText>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Deck data={PROFILES_DATA} renderCard={renderCard}
        onSwipeLeft={() => console.log('Something was swipped')}
        onSwipeRight={() => console.log('Something was swipped')}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}
