import { Wrapper } from "../Wrapper";
import GridContainer from "../CardImg";

const Gallery = () => {
  return (
    <>
      <div>
        <form action="" style={{ margin: "auto" }}>
          <div className="date-search">
            <input id="datePicker" type="date" />
            <input className="button-search" type="submit" value="Search" />
          </div>
        </form>
        <GridContainer />
      </div>
    </>
  );
};

export default Wrapper(Gallery);
