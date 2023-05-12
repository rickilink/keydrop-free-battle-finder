import fetch from "node-fetch";

const urlEnterBattle = (id, number) =>
  `https://kdrp2.com/CaseBattle/joinCaseBattle/${id}/${number}`;

const auth =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJsYW5nIjoiUEwiLCJjb3VudHJ5IjoiRU4iLCJzdWIiOiI3MTAwODYzIiwiZXhwIjoxNjgzNTg4NTA0fQ.TVe4Syp9GDd_GMYmmPnClJ1EYwwEOt0bGhnp8XmkinPPNrIbxFTBmiBaa5T26w5iu-PbqHKS_BfeuHuljpcqMdbrGUuu1H2DRaGJBf1iDxzdD5SqGt8DWVlK_fr9XSc8C6Eq9rNhqI1BP3oX7NLo-OrH0WW0HPDxMBEkvgFyidRXJ7GityB5VivTElT478jL2h4Jnc8AFFeM7c-0cstXxRFw8wFHcWdZiwP-SO8Eh13jIiMDHwFrF9ZemcxiUY4yg3vJD6tv1z-A43eBw0YbU43ymMFn5txy9WIJVubj77CSRlIZ5iH_4-ucD5rIzun1Ty76QfPeR0JxIgW6bd6WSQ";

const options = {
  headers: {
    authorization: auth,
  },
};
