import { View, Text } from "react-native";
import { FC } from "react";
import { StyeldText, StyledView } from "src/StyledComponent";
import { capitalizeFirstLetter } from "src/util/util";

type SeatStatusType = {
  color: string;
  title: string;
};

const SeatStatus: FC<SeatStatusType> = ({ color, title }) => {
  return (
    <StyledView className="flex-row gap-x-2 items-center p-4">
      <StyledView
        style={{ backgroundColor: color, borderColor: color }}
        className="w-[15px] h-[15px] rounded-full"
      />
      <StyeldText>{capitalizeFirstLetter(title)}</StyeldText>
    </StyledView>
  );
};
export default SeatStatus;
