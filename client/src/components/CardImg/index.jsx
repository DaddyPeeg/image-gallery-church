const GridContainer = () => {
  return (
    <div className="grid-container">
      <div
        style={{
          backgroundColor: "black",
          gridColumn: "span 1",
          display: "flex",
        }}
      ></div>
    </div>
  );
};

export default GridContainer;
