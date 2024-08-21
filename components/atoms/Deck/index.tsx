import { PROFILES_DATA } from "@/constants"
import { FC } from "react";
import { View } from "react-native"

type Props = {
    data: any;
    renderCard: (item: any) => void;
};

export const Deck: FC<Props> = ({ data, renderCard }) => {
    return (
        <View>
            <>
                {PROFILES_DATA.map((item) => {
                    return renderCard(item);
                })}
            </>
        </View>
    )
}