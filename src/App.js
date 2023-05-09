import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import "./App.css";
import "tachyons";

function App() {
  const [input, setInput] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState("false");

  function calculateFaceLocation(data, index) {
    const clarifaiFace = data.region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  function displayFaceBox(data) {
    setBox((box) => [...box, data]);
  }

  function onInputChange(event) {
    setInput(event.target.value);
    setBox([]);
  }

  function onRouteChange(route) {
    if (route === "home") setIsSignedIn(true);
    else setIsSignedIn(false);
    setRoute(route);
  }

  function onSubmit(event) {
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
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        // console.log(result.outputs[0].data.regions);
        // console.log("input:");
        result.outputs[0].data.regions.forEach((data, index) =>
          displayFaceBox(calculateFaceLocation(data, index))
        );
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : route === "register" ? (
        <Register onRouteChange={onRouteChange} />
      ) : (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm InputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition URL={input} box={box} />
        </div>
      )}
    </div>
  );
}

export default App;
