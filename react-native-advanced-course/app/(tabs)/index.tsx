import { TouchableOpacity, View } from 'react-native';

import { Deck } from '@/components/atoms/Deck';
import { Button, Card, Image } from '@rneui/base';
import { ThemedText } from '@/components/atoms/ThemedText';
import { useState } from 'react';
import { generateRandomProfiles } from '@/utils';

export default function HomeScreen() {
  const [data, setData] = useState(generateRandomProfiles(3))

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
    return (
      <Card containerStyle={{
        padding: 0, margin: 0, alignItems: "center", borderRadius: 20, width: 300
      }}>
        <TouchableOpacity
          onPress={() => setData(generateRandomProfiles(3))}
          style={{
            width: 300, height: 520, alignItems: "center", justifyContent: "center",
            padding: 50
          }}
        >
          <ThemedText style={{
            marginBottom: 16, textAlign: "center",
            fontSize: 20
          }}>
            No more profiles.
          </ThemedText>
          <ThemedText style={{
            marginBottom: 0, textAlign: "center",
            fontSize: 20
          }}>
            Tap to browse more!
          </ThemedText>
        </TouchableOpacity>
      </Card>)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Deck data={data} renderCard={renderCard}
        onSwipeLeft={() => { }}
        onSwipeRight={() => { }}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}
