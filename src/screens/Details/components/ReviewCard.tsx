import { FlatList } from "react-native-gesture-handler";
import React, { FC } from "react";
import {
  PressableStyeld,
  StyeldText,
  StyledView,
} from "../../../StyledComponent";
import { Ionicons } from "@expo/vector-icons";

type ReviewCardType = {
  title: string;
  time: string;
  date: Date;
  review: number;
  trailerUrl: string;
};

const ReviewCard: FC<ReviewCardType> = () => {
  return (
    <StyledView className="bg-gray-400 rounded-lg p-3">
      <StyeldText className="font-bold text-lg text-white">
        Avengers: Infinity War
      </StyeldText>
      <StyeldText className="text-sm text-gray-100">
        2h29m . 16.12.2022
      </StyeldText>
      <StyledView className="flex-row items-center gap-1 mt-3">
        <StyeldText className="text-sm text-gray-100">Review 4.8</StyeldText>
        <Ionicons name="star" color={"yellow"} size={18} />
      </StyledView>
      <StyledView className="flex-row items-end mt-3">
        <FlatList
          data={["1", "2", "3", "4", "5"]}
          renderItem={() => {
            return <Ionicons name="star" color={"yellow"} size={24} />;
          }}
          horizontal
        />
        <PressableStyeld className="flex-row gap-x-1 items-center border-[1px] border-solid border-[white] rounded-sm p-2">
          <Ionicons name="play" color={"white"} size={18} />
          <StyeldText className="text-white">Watch Trailer</StyeldText>
        </PressableStyeld>
      </StyledView>
    </StyledView>
  );
};

export default ReviewCard;
