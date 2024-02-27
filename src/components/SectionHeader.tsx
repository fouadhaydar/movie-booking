import React, { FC } from "react";
import {
  Container,
  PressableStyeld,
  StyeldText,
  StyledView,
} from "../StyledComponent";
import { MaterialIcons } from "@expo/vector-icons";

type SectionHeaderType = {
  title: string;
  handlePress: () => void;
};
const SectionHeader: FC<SectionHeaderType> = ({ title, handlePress }) => {
  return (
    <Container className="flex-row justify-between items-end">
      <StyeldText className="text-2xl font-bold">{title}</StyeldText>
      <PressableStyeld
        className="flex-row justify-center items-center gap-x-1"
        onPress={handlePress}
      >
        <StyeldText className="text-[16px]">See All</StyeldText>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </PressableStyeld>
    </Container>
  );
};

export default SectionHeader;
