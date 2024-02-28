import React, { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PressableStyeld, StyeldText, StyledView } from "../StyledComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  RootTabParamsLits,
} from "../Navigations/NavigationType";
import { useNavigation } from "@react-navigation/native";
import { baseImagePath } from "src/util/util";
import { FlatList, Image } from "react-native";
import { Data, Genres, Movie } from "../hooks/Data";
import { useFetchData } from "src/hooks/useFetchMovies";
import { REACT_APP_API_BASE_URL, REACT_APP_MY_ACCOUNT_NUMBER } from "@env";
import { useFav } from "src/context/useFav";
import { useMutation } from "@tanstack/react-query";
import { useInfoUser } from "src/context/usercontext/useInfoUser";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { postOptions } from "../hooks/useFetchMovies";

type MovieCardTypeNavigationProp =
  | StackNavigationProp<RootStackParamList>
  | BottomTabNavigationProp<RootTabParamsLits>;

type MovieCardType = {
  Movie: Movie;
  id: string;
};

const MovieCard: FC<MovieCardType> = ({ id, Movie }) => {
  const navigation = useNavigation<MovieCardTypeNavigationProp>();
  const [fav, setFav] = useState(false);
  const [genersNames, setGenersNames] = useState<string[]>([]);

  const {
    data: genres,
    isFetched,
    isError,
  } = useFetchData<Genres>(
    `${REACT_APP_API_BASE_URL}/genre/movie/list?language=en`,
    "genres"
  );
  const { handleFavorite, favorite } = useFav();
  const { sessionId } = useInfoUser();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_BASE_URL}/account/${REACT_APP_MY_ACCOUNT_NUMBER}/favorite?session_id=${sessionId}`,
          {
            ...postOptions,
            body: JSON.stringify({
              media_type: "movie",
              media_id: id,
              favorite: false,
            }),
          }
        );
        return await response.json();
      } catch (e) {
        throw new Error("error");
      }
    },
    onSuccess: (r) => {
      // console.log("response", r);
      setFav((prev) => !prev);
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  const handlePress = (id: string) => {
    const nav = navigation as StackNavigationProp<RootStackParamList>;
    nav.navigate("details", { id });
  };
  const getGenersNames = () => {
    let arr = [];
    const movieGeneresIds = Movie.genre_ids;
    const allGeners = genres!.genres;

    for (let i = 0; i < movieGeneresIds.length; i++) {
      for (let j = 0; j < allGeners.length; j++) {
        const genre = allGeners[j];

        if (genre.id == movieGeneresIds[i]) {
          arr.push(genre.name);
        }
      }
    }
    return arr;
  };
  useEffect(() => {
    if (Movie && genres) setGenersNames(() => getGenersNames());
  }, [genres, Movie]);

  const addNewMovieToFav = () => {
    if (!sessionId || sessionId?.length === 0) {
      const nav = navigation as BottomTabNavigationProp<RootTabParamsLits>;
      nav.navigate("profile");
    } else {
      mutateAsync();
    }
  };

  return (
    <PressableStyeld
      className=" flex-1 mb-[15px] border-solid border-black rounded-2xl border-[1px] overflow-hidden"
      onPress={() => handlePress(id)}
      style={{
        position: "relative",
      }}
    >
      <Image
        source={{ uri: baseImagePath("w780", Movie.poster_path) }}
        style={{ width: 300, height: 300 }}
      />
      <Ionicons
        name={fav || favorite.has(id) ? "heart" : "heart-outline"}
        size={24}
        color={"red"}
        style={{
          left: "85%",
          top: 20,
          position: "absolute",
        }}
        onPress={addNewMovieToFav}
      />
      <StyledView className=" p-3 gap-y-2">
        <StyeldText className="text-[14px] font-bold">{Movie.title}</StyeldText>
        <StyledView className="flex-row items-center gap-x-1">
          <Ionicons name="calendar" size={14} color={"black"} />
          <StyeldText className="text-[12px] text-gray-500">
            {Movie.release_date}
          </StyeldText>
        </StyledView>
        <StyledView className=" gap-x-1 flex-row">
          <StyledView className="flex-row items-start gap-x-1">
            <Ionicons name="videocam" size={16} color={"black"} />
            {genersNames.length > 0 && (
              <FlatList
                data={genersNames}
                renderItem={({ item, index }) => (
                  <StyeldText className="text-[14px] text-gray-500">
                    {item}
                    {index < genersNames.length - 1 ? ", " : "."}
                  </StyeldText>
                )}
                keyExtractor={(item) => item}
                scrollEnabled={false}
                numColumns={4}
              />
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </PressableStyeld>
  );
};

export default MovieCard;
