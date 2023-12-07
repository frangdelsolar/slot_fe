import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

export const getRandomZeroNine = () => {
  return Math.floor(Math.random() * 9) + 1;
};

const SlotAnimation = ({ value, running }) => {
  const [slotValue, setSlotValue] = useState(getRandomZeroNine());
  const [intervalo, setIntervalo] = useState(null);

  useEffect(() => {
    if (running) {
      let interval = setInterval(() => setSlotValue(getRandomZeroNine()), 100);
      setIntervalo(interval);
    } else {
      setIntervalo(null);
      clearInterval(intervalo);
      setSlotValue(value);
    }
  }, [running]);

  return (
    <Card style={{ minWidth: "10rem" }}>
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
            {slotValue}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SlotAnimation;
