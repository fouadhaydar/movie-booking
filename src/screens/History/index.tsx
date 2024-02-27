import { View, Text } from "react-native";
import React from "react";
import TicketCard from "../Tickets/components/TicketCard";
import { Container, StyledView } from "src/StyledComponent";

const History = () => {
  return (
    <Container
      style={{
        rowGap: 24,
        marginTop: 24,
      }}
    >
      <TicketCard />
      <TicketCard />
      <TicketCard />
    </Container>
  );
};

export default History;
