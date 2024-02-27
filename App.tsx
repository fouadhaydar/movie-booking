import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "./src/Navigations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteCtxProvider } from "src/context/FavCtxProvider";
import { UserContextProvider } from "src/context/usercontext/UserCtxProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <FavoriteCtxProvider>
          <QueryClientProvider client={queryClient}>
            <RootStackNavigator />
          </QueryClientProvider>
        </FavoriteCtxProvider>
      </UserContextProvider>
    </SafeAreaProvider>
  );
}
