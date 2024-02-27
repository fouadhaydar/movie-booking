import { FC } from "react";
import { PressableStyeld, StyeldText, StyledView } from "src/StyledComponent";
import { capitalizeFirstLetter } from "src/util/util";

type DayBtnType = {
  date: number;
  day: string;
  selelcted: boolean;
  select: () => void;
};

const DayBtn: FC<DayBtnType> = ({ date, day, selelcted, select }) => {
  return (
    <PressableStyeld className="items-center mx-2 my-4" onPress={select}>
      <StyledView
        className="w-[70px] rounded-3xl gap-y-2 items-center justify-center py-2"
        style={{
          backgroundColor: selelcted ? "orange" : "",
          borderStyle: "solid",
          borderWidth: !selelcted ? 0.5 : 0,
          borderColor: "gray",
        }}
      >
        <StyeldText className={`${selelcted ? "text-white font-bold" : ""}`}>
          {capitalizeFirstLetter(day)}
        </StyeldText>
        <StyeldText className={`${selelcted ? "text-white font-bold" : ""}`}>
          {date}
        </StyeldText>
      </StyledView>
    </PressableStyeld>
  );
};

export default DayBtn;
