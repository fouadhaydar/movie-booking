import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PressableStyeld, StyeldText, StyledView } from "../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigations/NavigationType";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../hooks/Data";
import { Image } from "react-native";

type NowPlayingCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "details"
>;

type NowPlayingType = {
  Movie: Movie;
  closeModal?: () => void;
};
const NowPlayingCard: FC<NowPlayingType> = ({ Movie, closeModal }) => {
  const { navigate } = useNavigation<NowPlayingCardNavigationProp>();

  const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const handlePress = (id: string) => {
    navigate("details", { id });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <PressableStyeld
      className="max-w-[400px] border-solid border-black rounded-2xl border-[1px]"
      onPress={() => handlePress(Movie.id.toString())}
      style={{
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: baseImagePath("w780", Movie.poster_path) }}
        style={{ width: 350, height: 350 }}
      />
      <StyledView className="p-3 gap-y-2">
        <StyeldText className="text-xl font-bold">{Movie.title}</StyeldText>
        <StyeldText className="text-[14px] text-gray-500">
          {/* 2h29m • Action, adventure, sci-fi */}
          Release Date: {Movie.release_date}
        </StyeldText>
        <StyeldText>Rating: {Movie.vote_average} / 10</StyeldText>
        <StyeldText className="text-[14px] text-gray-500">
          Voter Numbers:{Movie.vote_count}
        </StyeldText>
      </StyledView>
    </PressableStyeld>
  );
};

export default NowPlayingCard;
