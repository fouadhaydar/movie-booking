import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { FavoriteCtx } from "./favorite";
import { useFetchData } from "src/hooks/useFetchMovies";
import { Data } from "src/hooks/Data";
import { REACT_APP_API_BASE_URL } from "@env";
import { useInfoUser } from "./usercontext/useInfoUser";

type FavoriteCtxProviderType = {
  children: ReactElement;
};
export const FavoriteCtxProvider: FC<FavoriteCtxProviderType> = ({
  children,
}) => {
  const [favorite, setFav] = useState<Set<string>>(new Set([]));

  const addToFavorite = useCallback(
    (id: string) => {
      if (!favorite.has(id)) {
        setFav((prev) => prev.add(id));
      } else {
        favorite.delete(id);
        setFav(new Set(favorite));
      }
    },
    [favorite]
  );

  return (
    <FavoriteCtx.Provider value={{ favorite, handleFavorite: addToFavorite }}>
      {children}
    </FavoriteCtx.Provider>
  );
};

// {
//   "success": true,
//   "expires_at": "2024-02-24 10:16:31 UTC",
//   "request_token": "3a6e8aeb03b571cc2bcb4c89fe2b31f2df2d9bda"
// }
