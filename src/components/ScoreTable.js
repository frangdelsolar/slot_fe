import { useEffect, useState } from "react";
import { requestUserData } from "../requests/users";
import Table from "react-bootstrap/Table";

const ScoreTable = ({ refresh }) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (refresh) {
      const usersData = requestUserData();
      usersData.then((data) => {
        if (data) {
          data.sort((a, b) => {
            return b.total_points - a.total_points;
          });
          setUsersData(data);
        }
      });
    }
  }, [refresh]);
  return (
    <div>
      <h1>Score Table</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rounds</th>
            <th>Rewards</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.rounds_played}</td>
                  <td>{user.total_points}</td>
                  <td>{(user.average_points * 100).toFixed(2)}%</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ScoreTable;
