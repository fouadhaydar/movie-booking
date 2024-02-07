import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import React from "react";
import MovieCard from "../../components/MovieCard";
import { PressableStyeld, StyeldText, StyledView } from "../../StyledComponent";

const Movies = () => {
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
        <PressableStyeld className="w-[50%] h-full justify-center items-center bg-black rounded-full">
          <StyeldText className="text-white ">Now Playing</StyeldText>
        </PressableStyeld>
        <PressableStyeld className="w-[50%] h-full justify-center items-center rounded-full">
          <StyeldText className="text-white">Comming Soon</StyeldText>
        </PressableStyeld>
      </StyledView>
      <FlatList
        data={["1", "2", "3", "4", "5", "6"]}
        numColumns={2}
        renderItem={() => {
          return <MovieCard />;
        }}
        keyExtractor={(item) => item}
        columnWrapperStyle={{
          justifyContent: "center",
          columnGap: 15,
          minWidth: "100%",
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Movies;

const styles = StyleSheet.create({});
