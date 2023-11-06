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
  const [isDelete, setIsDelete] = useState(false);

  const toggleIsDelete = () => {
    setIsDelete((prev) => !prev);
  };

  return (
    <GalleryContext.Provider value={isDelete}>
      <GalleryUpdateContext.Provider value={toggleIsDelete}>
        {children}
      </GalleryUpdateContext.Provider>
    </GalleryContext.Provider>
  );
};
