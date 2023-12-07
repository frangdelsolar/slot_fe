import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { requestLastMoves } from "../requests/lastMoves";

const LastMoves = ({ userID, refresh }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [averagePoints, setAveragePoints] = useState(0);
  const [lastMoves, setLastMoves] = useState([]);

  useEffect(() => {
    if (refresh) {
      const lastMoves = requestLastMoves(userID);
      lastMoves
        .then((data) => {
          if (data) {
            setLastMoves(data.slots);
            setTotalPoints(data.points);
            setRoundsPlayed(data.rounds_played);
            setAveragePoints(data.average_points);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [refresh, userID]);
  return (
    <div>
      <h3>Total Rewards</h3>
      <Card
        style={{
          minWidth: "3rem",
          backgroundColor: "#712cf926",
          color: "white",
          marginBottom: "2rem",
        }}
      >
        <Card.Body>
          <Card.Text>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              {totalPoints}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <ul
        style={{
          "list-style-type": "none",
        }}
      >
        <li>
          Rounds played: <b>{roundsPlayed}</b>
        </li>
        <li>
          Success rate: <b>{(averagePoints * 100).toFixed(2)} %</b>
        </li>
      </ul>
      <h4>Last Rounds</h4>
      <Stack gap={3}>
        {lastMoves &&
          lastMoves.map((value, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#712cf926",
                border: "1px solid #712cf94d",
                borderRadius: "0.5rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                rowGap: "1rem",
              }}
              className="p-2"
            >
              {value.map((v, i) => {
                return (
                  <div
                    style={{
                      color: i === 3 ? "black" : "white",
                      backgroundColor: "lightgray",
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      margin: "0.5rem",
                      marginLeft: i === 3 ? "2rem" : "",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                    key={i}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          ))}
      </Stack>
    </div>
  );
};

export default LastMoves;
