import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TicketCard from "./components/TicketCard";
import { Container, StyeldText, StyledView } from "src/StyledComponent";

const Tickets = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS == "android" ? 50 : 0,
      }}
    >
      <Container>
        <StyeldText className="text-center font-bold text-xl my-7">
          My Tickets
        </StyeldText>
        <StyledView
          style={{
            rowGap: 20,
          }}
        ></StyledView>
      </Container>
    </SafeAreaView>
  );
};

export default Tickets;

const styles = StyleSheet.create({});
