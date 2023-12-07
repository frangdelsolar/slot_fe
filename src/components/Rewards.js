import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SlotAnimation from "./SlotAnimation";

const Rewards = ({ animate, points }) => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        rowGap: "1rem",
        marginTop: "1rem",
      }}
    >
      <Row>
        <h3>Rewards</h3>
      </Row>
      <Row>
        <SlotAnimation value={points} running={animate} />
      </Row>
    </Container>
  );
};

export default Rewards;
