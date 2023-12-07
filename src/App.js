import "bootstrap/dist/css/bootstrap.min.css";
import SlotMachine from "./components/SlotMachine";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserSection from "./components/User";
import { useState } from "react";
import ScoreTable from "./components/ScoreTable";

function App() {
  const [user, setUser] = useState();
  const handleUserChange = (user) => {
    setUser(user);
  };
  if (!user) {
    return (
      <div className="bg-dark text-light p-3 text-center min-vh-100">
        <Container>
          <Row className="m-4 text-center">
            <h1>Slot Machine</h1>
          </Row>
          <Row className="m-4 text-center">
            <UserSection handleChange={handleUserChange} />
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light p-3 text-center min-vh-100">
      <Container>
        <Row className="m-4 text-center">
          <h1>Slot Machine</h1>
        </Row>
        <Row className="m-4 text-center">
          <UserSection handleChange={handleUserChange} />
        </Row>
        <Row className="m-4">
          <SlotMachine userID={user.id} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
