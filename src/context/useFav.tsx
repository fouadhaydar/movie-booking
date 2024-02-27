import { useContext } from "react";
import { FavoriteCtx } from "./favorite";

export const useFav = () => {
  const { favorite, handleFavorite } = useContext(FavoriteCtx);
  return { favorite, handleFavorite };
};
