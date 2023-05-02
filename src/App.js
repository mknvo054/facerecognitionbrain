import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import "./App.css";
import "tachyons";

function App() {
  function onInputChange(event) {
    console.log(event.target.value);
  }

  const [input, setInput] = useState("");

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm InputChange={onInputChange} />
      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
