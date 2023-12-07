import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

import SlotAnimation, { getRandomZeroNine } from "./SlotAnimation";
import Rewards from "./Rewards";
import LastMoves from "./LastMoves";
import { requestSlot } from "../requests/slot";
import ScoreTable from "./ScoreTable";

const SlotMachine = ({ userID }) => {
  const audio = new Audio("/tragamonedas.mp3");

  const playSound = () => {
    audio.loop = true;
    audio.play();
  };

  const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const [slots, setSlots] = useState([
    getRandomZeroNine(),
    getRandomZeroNine(),
    getRandomZeroNine(),
  ]);
  const [animate, setAnimate] = useState([false, false, false]);
  const [points, setPoints] = useState(0);

  const [runRewardsAnimation, setRunRewardsAnimation] = useState(false);

  const setAnimation = () => {
    playSound();
    setRunRewardsAnimation(true);
    setAnimate([true, true, true]);
    setTimeout(() => {
      setAnimate([true, false, true]);
    }, 3250);
    setTimeout(() => {
      setAnimate([false, false, true]);
    }, 2543);
    setTimeout(() => {
      setAnimate([false, false, false]);
    }, 4100);

    setTimeout(() => {
      setRunRewardsAnimation(false);
      stopSound();
    }, 5000);
  };

  const handleRoll = () => {
    setAnimation();
    for (let i = 0; i < 1000; i++) {
      const data = requestSlot(userID);
      data
        .then((data) => {
          setSlots([data.slots[0], data.slots[1], data.slots[2]]);
          setPoints(data.points);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="container" style={{ maxWidth: "75rem", marginTop: "3rem" }}>
      <div className="row">
        <div className="col">
          <div className="row justify-content-between align-items-center gap-5">
            <div className="col justify-content-center align-items-center">
              <div className="row d-flex flex-row justify-content-around align-items-center">
                <div className="col p-1 col-4">
                  <SlotAnimation value={slots[0]} running={animate[0]} />
                </div>
                <div className="col p-1 col-4">
                  <SlotAnimation value={slots[1]} running={animate[1]} />
                </div>
                <div className="col p-1 col-4">
                  <SlotAnimation value={slots[2]} running={animate[2]} />
                </div>
              </div>
              <div className="row mt-2">
                <Button
                  className="btn btn-danger btn-lg w-100"
                  onClick={handleRoll}
                  disabled={runRewardsAnimation}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                    }}
                  >
                    Play
                  </span>
                </Button>
              </div>
            </div>
            <div className="col col-3">
              <Rewards points={points} animate={runRewardsAnimation} />
            </div>
          </div>
          <div className="row mt-5">
            <ScoreTable refresh={!runRewardsAnimation} />
          </div>
        </div>
        <div className="col col-4">
          <LastMoves userID={userID} refresh={!runRewardsAnimation} />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
