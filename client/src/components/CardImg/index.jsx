import PhotoAlbum from "react-photo-album";
import useMediaQuery from "../../useMediaQuery";
import { Trash } from "../../assets";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import photos from "../../photos";
// console.log(photos);

import { useState } from "react";
import Loader from "../Loader";

import { useGalleryContext } from "../../context";

const CheckerBtn = ({ index }) => {
  return (
    <div className="btn-wrapper-div">
      <div className="checkbox-wrapper-13">
        <input id={`ck${index}`} type="checkbox" />
      </div>
    </div>
  );
};

const GridItem = ({ img, srcSet, alt, index, setIndex, ...props }) => {
  const isDeletion = useGalleryContext();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div htmlFor={`ck${index}`} className="grid-item" {...props}>
      {isDeletion && <CheckerBtn index={index} />}
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

        {!isLoading && !isDeletion && (
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
              <span>
                <Trash color="white" size="20" />
              </span>
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

const GridContainer = () => {
  const [index, setIndex] = useState(-1);
  const device = useMediaQuery("(max-width:500px)");

  return (
    <>
      <div
        className="grid-container"
        style={{
          marginTop: !device ? "20px" : "0px",
        }}
      >
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
            onClick={() => device && setIndex(index)}
          />
        ))}
      </div>

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
};

export default GridContainer;
