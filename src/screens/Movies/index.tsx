import { SafeAreaView, StyleSheet, FlatList, Platform } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { PressableStyeld, StyeldText, StyledView } from "../../StyledComponent";
import { fetcheOptions, useFetchData } from "src/hooks/useFetchMovies";
import { REACT_APP_API_BASE_URL, REACT_APP_BARER_API } from "@env";
import { Data, Movie } from "src/hooks/Data";
import { useInfiniteQuery } from "@tanstack/react-query";
import CustomeBtn from "src/components/CustomeBtn";
import { RouteProp } from "@react-navigation/native";
import { RootTabParamsLits } from "src/Navigations/NavigationType";

type MoviesScreenRoutProp = RouteProp<RootTabParamsLits>;

type MoviesType = {
  route: MoviesScreenRoutProp;
};
const Movies: FC<MoviesType> = ({ route }) => {
  const [checked, setChecked] = useState<"now playing" | "comming soon">(
    route?.params?.comingSoon ? "comming soon" : "now playing"
  );
  useEffect(() => {
    if (route.params?.comingSoon) setChecked("comming soon");
    else setChecked("now playing");
  }, [route]);

  console.log("checked = ", checked);
  const urlNowplaying = `${REACT_APP_API_BASE_URL}/movie/now_playing?language=en-US&page=`;
  const urlUpoming = `${REACT_APP_API_BASE_URL}/movie/upcoming?language=en-US&page=`;

  type ApiResponse = {
    data: Movie[];
    currentPage: number;
    nextPage: number | null;
  };
  const getMovies = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<ApiResponse> => {
    try {
      const res = await fetch(
        checked === "comming soon"
          ? `${urlUpoming}${pageParam}`
          : `${urlNowplaying}${pageParam}`,
        fetcheOptions
      );
      const data: Data = await res.json();
      return {
        data: data.results,
        currentPage: pageParam,
        nextPage: pageParam + 1,
      };
    } catch (e) {
      throw new Error(`Error fetching Movies: ${e}`);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    status,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [checked === "comming soon" ? "comming-soon" : "now-playing"],
    queryFn: async ({ pageParam }) => getMovies({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });

  const movieArr = useMemo(() => {
    return data?.pages.map((page) => page?.data).flat();
  }, [data, refetch]);
  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };
  // console.log(movieArr);
  // const {
  //   data: movies,
  //   isFetching: isfetching,
  //   isError: iserror,
  // } = useFetchData<Data>(
  //   checked === "comming soon" ? urlUpoming : urlNowplaying,
  //   checked
  // );
  const handlePress = () => {
    setChecked((prev) =>
      prev === "now playing" ? "comming soon" : "now playing"
    );
    refetch();
  };

  if (status === "error") {
    return (
      <SafeAreaView
        style={{
          margin: Platform.OS === "android" ? 50 : 0,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <StyeldText>Error</StyeldText>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "90%",
        marginHorizontal: "auto",
        alignSelf: "center",
      }}
    >
      <StyledView className="h-[50px] bg-gray-400 mt-10 mb-5 w-full mx-auto flex-row rounded-full">
        <PressableStyeld
          className={`
          w-[50%] h-full justify-center items-center ${
            checked === "now playing" ? "bg-black" : "bg-gray"
          } rounded-full
        `}
          onPress={handlePress}
        >
          <StyeldText className="text-white ">Now Playing</StyeldText>
        </PressableStyeld>
        <PressableStyeld
          className={`
            w-[50%] h-full justify-center items-center rounded-full ${
              checked === "comming soon" ? "bg-black" : "bg-gray"
            }
        `}
          onPress={handlePress}
        >
          <StyeldText className="text-white">Comming Soon</StyeldText>
        </PressableStyeld>
      </StyledView>
      {status === "pending" ? (
        <SafeAreaView
          style={{
            margin: Platform.OS === "android" ? 50 : 0,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <StyeldText>Loading...</StyeldText>
        </SafeAreaView>
      ) : (
        <FlatList
          data={movieArr}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <MovieCard
                id={item?.id?.toString()}
                Movie={{
                  adult: item?.adult,
                  backdrop_path: item?.backdrop_path,
                  genre_ids: item?.genre_ids,
                  id: item?.id,
                  original_language: item?.original_language,
                  original_title: item?.original_title,
                  overview: item?.overview,
                  popularity: item?.popularity,
                  poster_path: item?.poster_path,
                  release_date: item?.release_date,
                  title: item?.title,
                  video: item?.video,
                  vote_average: item?.vote_average,
                  vote_count: item?.vote_count,
                }}
              />
            );
          }}
          keyExtractor={({ id }) => id.toString()}
          columnWrapperStyle={{
            justifyContent: "center",
            columnGap: 15,
            minWidth: "100%",
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={onReachEnd}
          onEndReachedThreshold={0.2}
        />
      )}
      {isFetchingNextPage && (
        <StyeldText className="text-center p-2 font-bold ">
          {" "}
          Loading ...{" "}
        </StyeldText>
      )}
    </SafeAreaView>
  );
};

export default Movies;
