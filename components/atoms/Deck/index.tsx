import { FC } from "react";
import { Animated, PanResponder, View } from "react-native"

import { PROFILES_DATA } from "@/constants"

type Props = {
    data: any;
    renderCard: (item: any) => any;
};

export const Deck: FC<Props> = ({ data, renderCard }) => {
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true, // when user press the screen
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
        }, // when user drag finger in screen
        onPanResponderRelease: () => { console.log() }, // when user remove finger from screen
    })

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            // inputRange and outputRange are related, we set the maximum number of pixels to move to the left or right to be 500.
            // that will move to the left or to the right will be 500, if the maximum stops are reached,
            // of each end, we will rotate 120 degrees maximum, on the other hand if we don't reach the maximum,
            // but if we go out of the center we will rotate 120 degrees maximum.
            // but if we go out of the center which is 0, we will rotate the 
            // percentage proportional to that range
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    return (
        <View>
            <>
                {PROFILES_DATA.map((item) => {
                    if (item.id === 1) {
                        return <Animated.View key={item.id}
                            style={getCardStyle()}
                            {...panResponder.panHandlers}>
                            {renderCard(item)}
                        </Animated.View>
                    }
                    return <View key={item.id}>
                        {renderCard(item)}
                    </View>
                })}
            </>
        </View>
    )
}