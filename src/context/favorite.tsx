import { createContext } from "react";
type DefaultValueType = {
  favorite: Set<string>;
  handleFavorite: (id: string) => void;
};
export const FavoriteCtx = createContext<DefaultValueType>({
  favorite: new Set(),
  handleFavorite: () => {},
});
