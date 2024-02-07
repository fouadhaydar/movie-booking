import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PressableStyeld, StyeldText, StyledView } from "../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigations/NavigationType";
import { useNavigation } from "@react-navigation/native";

type NowPlayingCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "details"
>;

type NowPlayingType = {
  id: string;
  closeModal?: () => void;
};
const NowPlayingCard: FC<NowPlayingType> = ({ id, closeModal }) => {
  const { navigate } = useNavigation<NowPlayingCardNavigationProp>();

  const handlePress = (id: string) => {
    navigate("details", { id });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <PressableStyeld
      className="min-w-[300px] border-solid border-black rounded-2xl border-[1px]"
      onPress={() => handlePress(id)}
    >
      <StyledView className="w-full h-[350px] bg-[black]" />
      <StyledView className=" p-3 gap-y-2">
        <StyeldText className="text-xl font-bold text-center">
          Avengers - Infinity War
        </StyeldText>
        <StyeldText className="text-[14px] text-center text-gray-500">
          2h29m • Action, adventure, sci-fi
        </StyeldText>
        <StyledView className=" justify-center gap-x-1 flex-row">
          <StyeldText>
            4.8
            <StyeldText className="text-[14px] text-center text-gray-500">
              (126)
            </StyeldText>
          </StyeldText>
          <Ionicons name="star" size={16} color={"black"} />
        </StyledView>
      </StyledView>
    </PressableStyeld>
  );
};

export default NowPlayingCard;
