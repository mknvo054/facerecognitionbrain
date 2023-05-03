import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import "./App.css";
import "tachyons";

function App() {
  const [input, setInput] = useState("");

  function onInputChange(event) {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  function onSubmit(event) {
    console.log("click");

    // URL of image to use. Change this to your image.
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "7o0mt3senr4d",
        app_id: "my-app",
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + "4b90df8e56ad43c9a6a5f27d6ef151aa",
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result.parse())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm InputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition URL={input} />
    </div>
  );
}

export default App;
