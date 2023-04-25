import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";
import "tachyons";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        tiltMaxAngleX={40}
        tiltMaxAngleY={40}
        style={{
          height: 100,
          width: 100,
        }}
      >
        <div
          className="Tilt br2 shadow-2 pa3"
          style={{ height: 150, width: 150 }}
        >
          <div>
            <img style={{ paddingTop: "5px" }} alt="brain logo" src={brain} />
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
