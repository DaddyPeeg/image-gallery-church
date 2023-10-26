import Gallery from "./components/Gallery";
import { Facebook, Google, WhatsApp, Youtube } from "./assets";

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
      <Gallery />
    </div>
  );
}

export default App;
