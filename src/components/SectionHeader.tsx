import React, { FC } from "react";
import { Container, StyeldText, StyledView } from "../StyledComponent";
import { MaterialIcons } from "@expo/vector-icons";

type SectionHeaderType = {
  title: string;
};
const SectionHeader: FC<SectionHeaderType> = ({ title }) => {
  return (
    <Container className="flex-row justify-between items-end">
      <StyeldText className="text-2xl font-bold">{title}</StyeldText>
      <StyledView className="flex-row justify-center items-center gap-x-1">
        <StyeldText className="text-[16px]">See All</StyeldText>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </StyledView>
    </Container>
  );
};

export default SectionHeader;
