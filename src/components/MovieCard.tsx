import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PressableStyeld, StyeldText, StyledView } from "../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigations/NavigationType";
import { useNavigation } from "@react-navigation/native";

type MovieCardTypeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "details"
>;

type MovieCardType = {
  id: string;
};

const MovieCard: FC<MovieCardType> = ({ id }) => {
  const { navigate } = useNavigation<MovieCardTypeNavigationProp>();

  const handlePress = (id: string) => {
    navigate("details", { id });
  };
  return (
    <PressableStyeld
      className=" flex-1 mb-[15px] border-solid border-black rounded-2xl border-[1px]"
      onPress={() => handlePress(id)}
    >
      <StyledView className="w-full h-[200px] bg-[black]" />
      <StyledView className=" p-3 gap-y-2">
        <StyeldText className="text-[14px] font-bold">
          Avengers - Infinity War
        </StyeldText>
        <StyledView className="flex-row items-center gap-x-1">
          <Ionicons name="calendar" size={14} color={"black"} />
          <StyeldText className="text-[12px] text-gray-500">
            20.12.2022
          </StyeldText>
        </StyledView>
        <StyledView className=" gap-x-1 flex-row">
          <StyledView className="flex-row items-center gap-x-1">
            <Ionicons name="videocam" size={16} color={"black"} />
            <StyeldText className="text-[14px] text-gray-500">
              Adventure, Sci-fi
            </StyeldText>
          </StyledView>
        </StyledView>
      </StyledView>
    </PressableStyeld>
  );
};

export default MovieCard;
