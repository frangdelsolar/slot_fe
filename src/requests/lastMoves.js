export const requestLastMoves = (userID) => {
  const limit = 5;
  const url =
    process.env.REACT_APP_API_URL +
    "api/last?userID=" +
    userID +
    "&limit=" +
    limit;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => {
    return response.json();
  });
};
