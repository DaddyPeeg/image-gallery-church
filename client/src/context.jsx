import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const GalleryContext = createContext();
const GalleryUpdateContext = createContext();

export function useGalleryContext() {
  return useContext(GalleryContext);
}

export function useGalleryUpdateContext() {
  return useContext(GalleryUpdateContext);
}

export const ImageGalleryContext = ({ children }) => {
  const [statusDelete, setStatusDelete] = useState({
    isDelete: false,
    toDelete: [],
  });
  console.log(statusDelete);

  const toggleIsDelete = () => {
    setStatusDelete((prevValue) => ({
      ...prevValue,
      isDelete: !statusDelete.isDelete,
    }));
  };

  const allSet = {
    setStatusDelete,
    toggleIsDelete,
  };

  return (
    <GalleryContext.Provider value={statusDelete}>
      <GalleryUpdateContext.Provider value={allSet}>
        {children}
      </GalleryUpdateContext.Provider>
    </GalleryContext.Provider>
  );
};
