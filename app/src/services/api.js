const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const SEARCH_URL = `${URL}/search`;
const GAMES_URL = `${URL}/games`;
const BOARDS_URL = `${URL}/me/boards`;
const TEAMS_URL = `${URL}/teams`;
// const RESULTS_URL = `${URL}/results`;
const GAME_URL = `${URL}/game`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(body => {
    throw body.error;
  });
}

let token = '';

function getHeaders() {
  const headers = { 'Content-type': 'application/json' };
  if(token) headers['Authorization'] = token;
  return headers;
}

export function getGames() {
  return fetch ('api/games-played', {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function getBoards() {
  return fetch (BOARDS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function addGame(game) {
  return fetch(`${GAMES_URL}/${game.className}/${game.boardId}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function addTeam(teamName) {
  return fetch(`${TEAMS_URL}/${teamName}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function addTeamGame(teamId, gameId) {
  return fetch(`${TEAMS_URL}/games/${teamId}/${gameId}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function getResults(gameId) {
  return fetch (`RESULTS_URL/${gameId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
} 

export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

export function signOut() {
  token = '';
  window.localStorage.removeItem('user');
}

function storeUser(user) {
  token = user.id;
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function checkForToken() {
  const json = window.localStorage.getItem('user');
  if(!json) {
    return null;
  }

  const user = JSON.parse(json);
  token = user.id;
  return user;
}

export function getData(keywords) {
  return fetch(`${SEARCH_URL}/${keywords}`, {
    
    headers: getHeaders()
  })
    .then(responseHandler);
}
// export function addHistoricCLue(historicClue) {
//   return;
// }

export function addCategory(category, board) {
  console.log('api category', category, 'api board', board);
  return fetch(`${BOARDS_URL}/${board}/categories/${category}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function addBoard(board) {
  console.log('api board', board);
  return fetch(`${BOARDS_URL}/${board}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function addClue(clue, answer, value, category) {
  console.log('api category', category, 'api clue', clue);
  return fetch(`${URL}/me/categories/${category}/clues/${clue}/${answer}/${value}`, {
    method: 'POST',
    headers: getHeaders(),
  })
    .then(responseHandler);
}

export function getClues(gameId) {
  return fetch (`${GAME_URL}/${gameId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function getCategories(gameId) {
  return fetch (`${URL}/categories/${gameId}`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}