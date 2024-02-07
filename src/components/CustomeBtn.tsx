import React, { FC } from "react";
import { PressableStyeld, StyeldText } from "../StyledComponent";

type CustomeBtnTypes = {
  title: string;
  handlePress: () => void;
};

const CustomeBtn: FC<CustomeBtnTypes> = ({ title, handlePress }) => {
  return (
    <PressableStyeld
      className="bg-black justify-center items-center rounded-full px-4 py-5"
      onPress={handlePress}
    >
      <StyeldText className="text-white font-bold text-[14px]">
        {title}
      </StyeldText>
    </PressableStyeld>
  );
};

export default CustomeBtn;
