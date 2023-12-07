export const requestSlot = (userID) => {
  const url = process.env.REACT_APP_API_URL + "api/play?userID=" + userID;
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
