import { Wrapper } from "../Wrapper";
import GridContainer from "../CardImg";
import { useGalleryContext, useGalleryUpdateContext } from "../../context";
import { useRef } from "react";

const Gallery = () => {
  const { setStatusDelete } = useGalleryUpdateContext();
  const timeInput = useRef();
  const filterImages = () => {
    if (timeInput.current.value) {
      let s = timeInput.current.value;
      s = s.split("-");
      s = s.map((x) => {
        return parseInt(x, 10);
      });
      s[1] = s[1] - 1;
      const setDate = new Date(...s);
      const time1 = setDate.getTime();
      const time2 = time1 + 86399000;
      const persistData = JSON.parse(localStorage.getItem("persistData"));
      const filteredArray = persistData.filter((item) => {
        const imageDate = new Date(item.created_at);
        const imageTime = imageDate.getTime();
        return imageTime > time1 && imageTime < time2;
      });
      setStatusDelete((prev) => ({ ...prev, dataGeneral: [...filteredArray] }));
    } else {
      alert("Please choose a date");
    }
  };
  return (
    <>
      <div>
        <form action="" style={{ margin: "auto" }}>
          <div className="date-search">
            <input ref={timeInput} id="datePicker" type="date" />
            <input
              onClick={() => filterImages()}
              className="button-search"
              type="button"
              value="Search"
            />
          </div>
        </form>
        <GridContainer inputRef={timeInput} />
      </div>
    </>
  );
};

export default Wrapper(Gallery);
