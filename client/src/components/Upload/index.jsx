import { useState } from "react";
import { useGalleryUpdateContext } from "../../context";
import { useGalleryContext } from "../../context";

const ModalUpload = ({ modalOpen }) => {
  console.log("Modal Rendered", modalOpen);
  if (modalOpen) return <div className="modal">wewew</div>;
};

const Upload = () => {
  const setIsDelete = useGalleryUpdateContext();
  const isDelete = useGalleryContext();
  const [clicked, setClicked] = useState(false);
  const StyleComp = (distance) => {
    return clicked ? { transform: `translateY(${distance}rem)` } : {};
  };
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className="toolbar-container">
        <div
          onClick={() => setIsModal(true)}
          style={StyleComp(-3.9 - 3.3)}
          className="toolbar toolbar-upload"
        >
          +
        </div>
        <div
          onClick={setIsDelete}
          style={StyleComp(-3.9)}
          className="toolbar toolbar-delete"
        >
          {isDelete ? "X" : "Del"}
        </div>
        <div
          className="toolbar toolbar-main"
          onClick={() => setClicked((prev) => !prev)}
        >
          {clicked ? "X" : "0 0 0"}
        </div>
      </div>
      <ModalUpload modalOpen={isModal} />
    </>
  );
};

export default Upload;
