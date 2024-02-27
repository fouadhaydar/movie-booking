import { View, Text } from "react-native";
import { FC } from "react";
import { PressableStyeld, StyeldText, StyledView } from "src/StyledComponent";

type TimeType = {
  selected: boolean;
  time: string;
};

const TimeBtn: FC<TimeType> = ({ selected, time }) => {
  return (
    <PressableStyeld
      className="px-4 py-3 mx-2 rounded-3xl"
      style={{
        backgroundColor: selected ? "orange" : "",
        borderStyle: "solid",
        borderWidth: !selected ? 0.5 : 0,
        borderColor: "gray",
      }}
    >
      <StyeldText className={`${selected ? "text-white font-bold" : ""}`}>
        {time}
      </StyeldText>
    </PressableStyeld>
  );
};

export default TimeBtn;
