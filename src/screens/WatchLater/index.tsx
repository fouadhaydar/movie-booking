import { Platform, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFav } from "src/context/useFav";
import { FlatList } from "react-native-gesture-handler";
import MovieCard from "src/components/MovieCard";
import { Container, StyeldText, StyledView } from "src/StyledComponent";
import { Data, Movie, MovieDetail } from "src/hooks/Data";
import { REACT_APP_API_BASE_URL } from "@env";
import { useFetchData } from "src/hooks/useFetchMovies";
import NowPlayingCard from "src/components/NowPlayingCard";
import { useInfoUser } from "src/context/usercontext/useInfoUser";
import CustomeBtn from "src/components/CustomeBtn";
// import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
// import { RootStackParamList } from "src/Navigations/NavigationType";
import { RootTabParamsLits } from "src/Navigations/NavigationType";
import { RouteProp } from "@react-navigation/native";

type FavoritesNavigationProp = BottomTabNavigationProp<RootTabParamsLits>;

type FavoriteType = {
  navigation: FavoritesNavigationProp;
};

const WatchLater: FC<FavoriteType> = ({ navigation }) => {
  const { sessionId } = useInfoUser();
  const { favorite, handleFavorite } = useFav();
  const {
    data: favorites,
    isFetching: isfetching,
    isError: iserror,
    isFetched: isfetched,
  } = useFetchData<Data>(
    `${REACT_APP_API_BASE_URL}/account/20951589/favorite/movies?language=en-US&page=1&session_id=${sessionId}&sort_by=created_at.asc`,
    "fav",
    sessionId !== undefined && sessionId?.length > 0
  );
  useEffect(() => {
    if (!iserror && isfetched) {
      favorites?.results.forEach((ele) => {
        handleFavorite(ele.id.toString());
      });
    }
  }, [favorites]);
  console.log("fav => ", favorite);
  if (sessionId === undefined || sessionId?.length === 0) {
    return (
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? 50 : 0,
          rowGap: 10,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyeldText>Please Log in To see your Favorite's Movies</StyeldText>
        <CustomeBtn
          title={"Navigate to Login"}
          handlePress={() => navigation.navigate("profile")}
        />
      </SafeAreaView>
    );
  }
  if (isfetching) {
    return (
      <SafeAreaView>
        <StyeldText>Loding ....</StyeldText>
      </SafeAreaView>
    );
  }
  if (iserror) {
    return (
      <SafeAreaView>
        <StyeldText>No Favorite Movies</StyeldText>
      </SafeAreaView>
    );
  }
  console.log(favorites);

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? 50 : 0,
      }}
    >
      <StyledView className="w-[90%] mx-auto">
        <StyledView className="mx-auto">
          {favorites && favorites?.results?.length > 0 && (
            <FlatList
              data={favorites.results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MovieCard
                  id={item.id.toString()}
                  Movie={{
                    adult: item.adult,
                    genre_ids: item.genre_ids,
                    backdrop_path: item.backdrop_path,
                    id: item.id,
                    original_language: item.original_language,
                    original_title: item.title,
                    overview: item.overview,
                    popularity: item.popularity,
                    poster_path: item.poster_path,
                    release_date: item.release_date,
                    title: item.title,
                    video: item.video,
                    vote_average: item.vote_average,
                    vote_count: item.vote_count,
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <StyledView style={{ width: 15 }} />
              )}
            />
          )}
        </StyledView>
      </StyledView>
    </SafeAreaView>
  );
};
export default WatchLater;
