import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTNlNjE0OTcwMzE2Yzc3OTc0YTNmMDVmYWRmNTVlNyIsInN1YiI6IjY1YjYzNzcxNGYzM2FkMDEzMTBjN2JlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O93d7D1kkCB3ZqvNF20MKnJsPbs7wylCH6CrBJslYCc",
  },
};

export function useFetchData<T>(
  url: string,
  queryKey: string,
  enabled?: boolean
) {
  const getData = async () => {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isError, isFetched, isFetching, refetch } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: getData,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled: enabled ?? true,
  });
  return { data, isError, isFetched, isFetching, refetch };
}
