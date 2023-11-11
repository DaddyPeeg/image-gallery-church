import { useRef, useState, useEffect } from "react";
import { useGalleryUpdateContext } from "../../context";
import { useGalleryContext } from "../../context";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { addImages } from "../../api/imageGalleryApi";

const UploadScreen = () => {
  return (
    <>
      <div className="loading-modal">
        <div className="loading-screen">
          <img src="loading.gif" alt="loading" />
          <h2>Uploading...</h2>
        </div>
      </div>
    </>
  );
};

const ModalUpload = ({ modalOpen, setModalOpen, addImagesApi }) => {
  const uploadFile = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileImages, setFileImages] = useState([]);

  function newFileImages(n) {
    let newFilelist = new DataTransfer();
    const files = [...fileImages];
    files.splice(n, 1);
    for (let i = 0; i < files.length; i++) {
      newFilelist.items.add(files[i]);
    }
    // console.log(newFilelist.files);
    setFileImages(newFilelist.files);
  }

  function onSetFiles(event) {
    const files = event.target.files;
    setFileImages(files);
    const filesArray = Array.from(files);
    if (filesArray.length > 10) {
      event.preventDefault();
      alert("Cannot upload more than 10 files");
      return;
    }

    const imagesArray = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
  }
  const isImages = () => {
    if (!selectedImages.length > 0)
      return {
        justifyContent: "center",
        alignItems: "center",
        color: "#545454",
      };
  };

  const UploadImages = () => {
    if (fileImages.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < fileImages.length; i++) {
        formData.append("photos", fileImages[i]);
      }

      addImagesApi.mutate(formData);
      setFileImages([]);
      setSelectedImages([]);
      // setModalOpen(false);
      console.log("wew");
    }
  };

  const btnDisabled = (n) => {
    if (n)
      return {
        opacity: "0.3",
        cursor: "not-allowed",
      };
  };

  const logic = selectedImages.length === 0 ? true : false;

  if (modalOpen)
    return (
      <>
        <div
          className="modal-popup"
          onClick={() => {
            setModalOpen(false);
          }}
        ></div>
        <div className="modal">
          <div className="modal-control">
            <label>
              + Add Images
              <br />
              <span>Up to 10 Images</span>
              <input
                ref={uploadFile}
                type="file"
                name="imagesUpload"
                onChange={onSetFiles}
                multiple
                accept="image/png, image/jpeg, image/webp"
              />
            </label>
            <div className="modal-btn">
              <button
                style={btnDisabled(logic)}
                onClick={() => UploadImages()}
                disabled={logic}
              >
                Upload
              </button>
              <button
                style={btnDisabled(logic)}
                onClick={() => {
                  setSelectedImages([]);
                  setFileImages([]);
                }}
                disabled={logic}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="imageSet" style={isImages()}>
            {selectedImages.length > 0
              ? selectedImages.map((image, index) => {
                  return (
                    <div key={`${image}-${index}`}>
                      <img
                        src={image}
                        alt={`${image}-${index}`}
                        onClick={() => {
                          setSelectedImages(
                            selectedImages.filter((item, i) => i !== index)
                          );
                          newFileImages(index);
                        }}
                      />
                    </div>
                  );
                })
              : "Image Preview"}
          </div>
        </div>
      </>
    );
};

const Upload = () => {
  const { toggleIsDelete } = useGalleryUpdateContext();
  const { isDelete } = useGalleryContext();
  const [clicked, setClicked] = useState(false);
  const StyleComp = (distance) => {
    return clicked ? { transform: `translateY(${distance}rem)` } : {};
  };
  const [isModal, setIsModal] = useState(false);
  const queryClient = useQueryClient();
  const addImagesApi = useMutation(addImages, {
    onSuccess: () => {
      queryClient.invalidateQueries("gallery-images");
    },
  });
  useEffect(() => {
    if (!addImagesApi.isLoading) {
      setIsModal((prev) => !prev);
    }
  }, [addImagesApi.isLoading]);
  function disableScroll() {
    const bodyObject = document.getElementsByTagName("body");
    if (isModal) bodyObject[0].style.overflow = "hidden";
    else bodyObject[0].style.overflow = "auto";
  }
  disableScroll();
  return (
    <>
      <div className="toolbar-container">
        <div
          onClick={() => {
            setIsModal(true);
          }}
          style={StyleComp(-3.9 - 3.3)}
          className="toolbar toolbar-upload"
        >
          +
        </div>
        <div
          onClick={toggleIsDelete}
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
      <ModalUpload
        modalOpen={isModal}
        setModalOpen={setIsModal}
        addImagesApi={addImagesApi}
      />
      {addImagesApi.isLoading && <UploadScreen />}
    </>
  );
};

export default Upload;
