import { useQuery } from "react-query";
import { getImages } from "./imageGalleryApi";

export default function newUseQuery() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "gallery-images",
    getImages,
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    isLoading,
    data,
    isError,
    error,
    isFetching,
    refetch,
  };
}
