import "./FaceRecognition.css";

function FaceRecognition({ URL, box }) {
  console.log("box: " + box.length);
  return (
    <div className="center">
      <div className="absolute">
        <img alt="" id="inputimage" src={URL} width="500px" height="auto" />

        {box.length === 0
          ? null
          : box.map((element, i) => {
              return (
                <div
                  className="bounding-box"
                  key={i}
                  style={{
                    top: box[i].topRow,
                    right: box[i].rightCol,
                    bottom: box[i].bottomRow,
                    left: box[i].leftCol,
                  }}
                ></div>
              );
            })}
      </div>
    </div>
  );
}

export default FaceRecognition;
