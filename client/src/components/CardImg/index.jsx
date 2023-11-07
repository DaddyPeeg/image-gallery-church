import PhotoAlbum from "react-photo-album";
import useMediaQuery from "../../useMediaQuery";
import { Trash } from "../../assets";
import { useQuery } from "react-query";
import axios from "axios";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import processImages from "../../photos";
// console.log(photos);

import { useState } from "react";
import Loader from "../Loader";

import { useGalleryContext, useGalleryUpdateContext } from "../../context";
const CheckerBtn = ({ index, ...props }) => {
  return (
    <div className="btn-wrapper-div">
      <div className="checkbox-wrapper-13">
        <input id={`ck${index}`} type="checkbox" {...props} />
      </div>
    </div>
  );
};

const GridItem = ({ img, srcSet, alt, index, setIndex, imgDesc, ...props }) => {
  const { isDelete, toDelete } = useGalleryContext();
  const { setStatusDelete } = useGalleryUpdateContext();
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = (imgDesc) => {
    console.log(imgDesc);
  };
  const checkboxC = toDelete.some((obj) =>
    obj.checkBoxIdx === index ? true : false
  );
  const handleChange = (imgDesc) => {
    const itemToDelete = toDelete.findIndex(
      (item) => imgDesc.asset_id === item.asset_id
    );
    if (itemToDelete !== -1) {
      const removedArr = toDelete.filter(
        (item) => item.asset_id !== imgDesc.asset_id
      );
      setStatusDelete((prev) => ({ ...prev, toDelete: removedArr }));
    } else {
      setStatusDelete((prev) => ({
        ...prev,
        toDelete: [...toDelete, imgDesc],
      }));
    }
  };
  return (
    <div htmlFor={`ck${index}`} className="grid-item" {...props}>
      {isDelete && (
        <CheckerBtn
          index={index}
          onChange={() => handleChange(imgDesc)}
          checked={checkboxC}
        />
      )}
      {isLoading && <Loader />}
      <label htmlFor={`ck${index}`}>
        <img
          src={img}
          srcSet={srcSet}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
        />

        {!isLoading && !isDelete && (
          <div className="img-title">
            <h3>12/24/2023</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "6rem",
              }}
            >
              <div
                style={{
                  background: "#5050BA",
                  height: "100%",
                  width: "3.8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setIndex(index)}
              >
                View
              </div>
              <span onClick={() => handleDelete(imgDesc)}>
                <Trash color="white" size="20" />
              </span>
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

const fetchImages = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/photos`);
};

const GridContainer = () => {
  const [index, setIndex] = useState(-1);
  const device = useMediaQuery("(max-width:500px)");
  const isDeletion = useGalleryContext();
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "gallery-images",
    fetchImages
  );

  if (isLoading) return "Loading";
  if (isError) return <h2>{error.message}</h2>;
  else {
    const photos = processImages(data?.data.resources);
    return (
      <>
        <button onClick={() => refetch()}>Refresh</button>
        <div className="grid-container">
          {photos.map((item, index) => (
            <GridItem
              key={`item-${index}`}
              img={item.src}
              srcSet={item.srcSet.map(
                (subSrc, i) => subSrc.src + " " + subSrc.width + "w"
              )}
              alt={`img-${index}`}
              index={index}
              setIndex={setIndex}
              onClick={() => device && !isDeletion && setIndex(index)}
              imgDesc={{
                asset_id: item.asset_id,
                public_id: item.public_id,
                format: item.format,
                checkBoxIdx: index,
              }}
            />
          ))}
        </div>

        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails]}
        />
      </>
    );
  }
};

export default GridContainer;
