import { View, Text } from "react-native";
import React from "react";
import {
  Container,
  PressableStyeld,
  StyeldText,
  StyledView,
} from "src/StyledComponent";

const TicketCard = () => {
  return (
    <PressableStyeld
      className="w-full h-[150px] rounded-xl flex-row overflow-hidden border-solid border-[1px] border-[black]"
      onPress={() => {
        console.log("log");
      }}
    >
      <StyledView className="w-[40%] h-full bg-slate-400 mr-2">
        {/* image */}
      </StyledView>
      <StyledView className="w-[60%] p-2 justify-center items-start gap-y-3">
        <StyeldText>Avengers: Infinity War</StyeldText>
        <StyeldText>2:30 PM 16/12/2022</StyeldText>
        <StyeldText>Hall Number: 10</StyeldText>
      </StyledView>
    </PressableStyeld>
  );
};

export default TicketCard;
