import { FC, ReactNode, useState } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native"

import { PROFILES_DATA } from "@/constants"

type Props = {
    data: any;
    renderCard: (item: any) => any;
    onSwipeLeft?: (item: any) => void;
    onSwipeRight?: (item: any) => void;
    renderNoMoreCards: () => ReactNode;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export const Deck: FC<Props> = ({
    data,
    renderCard,
    onSwipeLeft = (item) => { },
    onSwipeRight = (item) => { },
    renderNoMoreCards,
}) => {
    const [cardIndex, setCardIndex] = useState(1)
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true, // when user press the screen
        onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })
        }, // when user drag finger in screen
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                forceSwipe('right');
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                forceSwipe('left');
            } else {
                resetPosition();
            }
        }, // when user remove finger from screen
    })

    const resetPosition = () => {
        Animated.spring(position, {
            useNativeDriver: false,
            toValue: { x: 0, y: 0 },
        }).start();
    }

    const forceSwipe = (direction: string) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            useNativeDriver: false,
            toValue: { x, y: 0 },
            duration: 250
        }).start(() => onSwipeComplete(direction));
    }

    const onSwipeComplete = (direction: string) => {
        // const { onSwipeLeft, onSwipeRight } = 
        const item = data[cardIndex];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({ x: 0, y: 0 })
        setCardIndex((prevState) => prevState + 1);
    }

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            // inputRange and outputRange are related, we set the maximum number of pixels to move to the left or right to be SCREEN_WIDTH.
            // that will move to the left or to the right will be SCREEN_WIDTH, if the maximum stops are reached,
            // of each end, we will rotate 120 degrees maximum, on the other hand if we don't reach the maximum,
            // but if we go out of the center we will rotate 120 degrees maximum.
            // but if we go out of the center which is 0, we will rotate the 
            // percentage proportional to that range
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    if (PROFILES_DATA.length < cardIndex) return renderNoMoreCards();

    return PROFILES_DATA.map((item, i) => {
        if (i + 1 < cardIndex) return null;
        if (item.id === cardIndex) {
            return <Animated.View key={item.id}
                style={getCardStyle()}
                {...panResponder.panHandlers}
            >
                {renderCard(item)}
            </Animated.View>
        }
    })
}