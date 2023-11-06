import Gallery from "./components/Gallery";
import Upload from "./components/Upload";
import { Facebook, Google, WhatsApp, Youtube } from "./assets";
import { ImageGalleryContext } from "./context";

const IconContainer = ({ children }) => {
  return <div className="svgContainer">{children}</div>;
};

function App() {
  const componentMap = [
    { s: <Facebook color="black" size="30" />, link: "#" },
    { s: <Google color="black" size="30" />, link: "#" },
    { s: <WhatsApp color="black" size="30" />, link: "#" },
    { s: <Youtube color="black" size="30" />, link: "#" },
  ];
  const icons = componentMap.map((item, i) => (
    <IconContainer key={i}>{item.s}</IconContainer>
  ));

  return (
    <div className="app">
      <div className="header">
        <img src="socials/logo.png" alt="logo" />
        <div className="socMed">{icons}</div>
      </div>
      <h1 className="divider line one-line">Image Gallery</h1>
      <ImageGalleryContext>
        <Gallery />
        <Upload />
      </ImageGalleryContext>
    </div>
  );
}

export default App;
