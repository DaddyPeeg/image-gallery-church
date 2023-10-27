import PhotoAlbum from "react-photo-album";

import { Trash } from "../../assets";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import photos from "../../photos";
console.log(photos);

import { useState } from "react";

const Loader = () => {
  return (
    <main>
      <svg
        class="ip"
        viewBox="0 0 256 128"
        width="256px"
        height="128px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#5ebd3e" />
            <stop offset="33%" stop-color="#ffb900" />
            <stop offset="67%" stop-color="#f78200" />
            <stop offset="100%" stop-color="#e23838" />
          </linearGradient>
          <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stop-color="#e23838" />
            <stop offset="33%" stop-color="#973999" />
            <stop offset="67%" stop-color="#009cdf" />
            <stop offset="100%" stop-color="#5ebd3e" />
          </linearGradient>
        </defs>
        <g fill="none" stroke-linecap="round" stroke-width="16">
          <g class="ip__track" stroke="#ddd">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>
          <g stroke-dasharray="180 656">
            <path
              class="ip__worm1"
              stroke="url(#grad1)"
              stroke-dashoffset="0"
              d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
            />
            <path
              class="ip__worm2"
              stroke="url(#grad2)"
              stroke-dashoffset="358"
              d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
            />
          </g>
        </g>
      </svg>
    </main>
  );
};

const GridItem = ({ img, mode, srcSet, title, alt, index, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="grid-item" {...props}>
      {isLoading && <Loader />}
      <img
        src={img}
        srcSet={srcSet}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
      />

      {!isLoading && (
        <div className="img-title">
          <h3>12/24/2023</h3>
          <span>
            <Trash color="white" size="20" />
          </span>
        </div>
      )}
    </div>
  );
};

const GridContainer = () => {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="grid-container">
        {photos.map((item, index) => (
          <GridItem
            key={`item-${index}`}
            img={item.src}
            srcSet={item.srcSet.map(
              (subSrc, i) => subSrc.src + " " + subSrc.width + "w"
            )}
            alt={`img-${index}`}
            onClick={() => setIndex(index)}
          />
        ))}
      </div>
      {/* <PhotoAlbum
        photos={photos}
        layout="rows"
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      /> */}

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
