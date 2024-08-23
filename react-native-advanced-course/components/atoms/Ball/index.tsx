import { useEffect } from "react";
import { View, Animated } from "react-native"


export const Ball = () => {
    const position = new Animated.ValueXY({ x: 0, y: 0 }); // 1. where the item is right now

    useEffect(() => {
        Animated.spring(position, {
            useNativeDriver: false,
            toValue: { x: 200, y: 600 } // 2. where the item is moving to
        }).start();
    }, []);

    return (
        <Animated.View style={position.getLayout()} // 3. which item are we moving
        >
            <View style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: 'black',
                borderWidth: 1,
            }} />
        </Animated.View>);
}