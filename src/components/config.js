import React from 'react';

let Config = (props) => {
  if (!props.playing) {
    return (
      <div id="layer"
           className={"config-layer"}>
        <div className={"config-layer config"}
             id="config">
          <p>
            Please choose an option
          </p>

          <button className={"config__button"}
                  onClick={() => props.onModeSelection("easy")}>Easy</button>
          <button className={"config__button"}
                  onClick={() => props.onModeSelection("medium")}>Medium</button>
          <button className={"config__button"}
                  onClick={() => props.onModeSelection("hard")}>Hard</button>
        </div>
      </div>
    );
  } else return (null);
};

export default Config;