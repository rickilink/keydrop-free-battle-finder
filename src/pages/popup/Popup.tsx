import { useState } from "react";

export default function Popup(): JSX.Element {
  const [authValue, setAuthValue] = useState("");

  const [isRunning, setIsrunning] = useState(false);
  const [enableStopButton, setEnableStopButton] = useState(false);
  const [message, setMessage] = useState("Waiting for startup...");
  const [battleLinkFound, setBattleLinkFound] = useState("");

  const buttonLinkIsDissbled = battleLinkFound.length > 0;
  const buttonFindCaseIsDisabled = authValue.length === 469;
  const buttonStopIsDisabled = isRunning && enableStopButton;

  const isBearerValueCorrect = authValue.length === 469;
  const handleChange = (event: any) => {
    setAuthValue(event.target.value);
  };
  function fetchCases(auth: string) {
    if (!isBearerValueCorrect) return;
    setEnableStopButton(true);
    setIsrunning(true);
    setMessage("Looking for Free Battle");

    const urlEnterBattle = (id: number, number: number) =>
      `https://kdrp2.com/CaseBattle/joinCaseBattle/${id}/${number}`;

    const options = {
      headers: {
        authorization: auth,
      },
    };
    const url =
      "https://kdrp2.com/CaseBattle/battle?type=active&page=0&priceFrom=0&priceTo=undefined&searchText=&sort=latest&players=all&roundsCount=all";

    const numPlayers = 4;

    const caseCost = 0.4;

    const Headers = {
      origin: "https://key-drop.com",
      "x-currency": "usd",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0",
      authorization: auth,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.data.filter(
          (obj: any) => obj.freeBattleTicketCost === 1
        );

        if (filteredData.length > 0) {
          const filteredResult = filteredData.filter(
            (bt: any) => bt.cost >= caseCost && bt.maxUserCount <= numPlayers
          );

          if (filteredResult?.length > 0) {
            const number = 1;
            const id = filteredResult[0].id;

            fetch(urlEnterBattle(id, number), {
              method: "POST",
              headers: Headers,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  setMessage(`Joined battle in slot ${number}.`);
                  setBattleLinkFound(
                    `https://key-drop.com/es/case-battle/${id}`
                  );
                } else if (data.errorCode === "slotUnavailable") {
                  setMessage(
                    `Failed to join battle in slot ${number}: battle is full.  Trying again in 5 seconds`
                  );

                  setTimeout(() => {
                    fetchCases(auth);
                  }, 5000);
                } else {
                  setMessage(
                    `Failed to join battle in slot ${number}.  Trying again in 5 seconds`
                  );

                  setTimeout(() => {
                    fetchCases(auth);
                  }, 5000);
                }
              })
              .catch((error) => setMessage(error));
          } else {
            setMessage(
              "Specific battle not found , Trying again in  5  seconds"
            );

            setTimeout(() => {
              fetchCases(auth);
            }, 5000);
          }
        } else {
          setMessage("No battles with free ticket cost found. Trying again");

          setTimeout(() => {
            fetchCases(auth);
          }, 10);
        }
      })
      .catch((error) => setMessage(error));
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full px-3 bg-primary-background">
      <header className="flex   text-primary-text">
        <ul className="flex justify-between flex-1 p-3 m-0">
          <li>
            <h1 className="font-Kristi text-xl tracking-[1px]">RICKILINK</h1>
          </li>
          {/*  <li>
            <img src={logo} className="w-16 h-16" />
          </li> */}
        </ul>
      </header>
      <section>
        <form>
          <input
            value={authValue}
            onChange={handleChange}
            type="text"
            className="w-full h-10 bg-secondary-background rounded-b-xl rounded-tr-xl text-primary-text pl-2 m-0 "
            placeholder="Bearer ..."
          ></input>
        </form>
      </section>
      <section className="flex justify-between py-3 w-full">
        <button
          disabled={!buttonFindCaseIsDisabled}
          onClick={() => fetchCases(authValue)}
          className={
            !buttonFindCaseIsDisabled
              ? "bg-gray-500/10 text-gray-500  border-gray-500 font-bold px-3  py-1 rounded-md  border-2 w-1/2 "
              : "bg-button-background text-secondary-text font-bold px-3  py-1 rounded-md border-button-border border-2 w-1/2 "
          }
        >
          Find Case
        </button>
        <button
          disabled={!buttonStopIsDisabled}
          onClick={() => window.close()}
          className={
            !buttonStopIsDisabled
              ? "font-bold px-3  py-1 text-secondary-text/10 w-1/2 "
              : "g-button-background text-secondary-text font-bold px-3  py-1 rounded-md border-button-border border-2 w-1/2"
          }
        >
          Stop
        </button>
      </section>
      <section>
        <div className="w-full h-24 bg-secondary-background rounded-xl flex  p-2">
          <p className="italic text-xs  animate-pulse  text-primary-text">
            {message}
          </p>
        </div>
      </section>

      <section className=" py-3 flex flex-1">
        <a
          href={
            buttonLinkIsDissbled
              ? battleLinkFound
              : "https://key-drop.com/es/case-battle/list"
          } //TODO: fix link
          target="_blank"
          rel="noreferrer"
          className={
            !buttonLinkIsDissbled
              ? "bg-gray-500/10 text-gray-500 font-bold  rounded-md border-gray-500 border-2 w-full py-1  hover:cursor-pointer"
              : "bg-yellow-500/10 text-secondary-text font-bold  rounded-md border-button-border border-2 w-full py-1"
          }
        >
          {!buttonLinkIsDissbled ? "Waiting for battle" : "Battle Found!!! "}
        </a>
      </section>
      <footer>
        <ul className="flex justify-between">
          <li className="text-xs italic text-primary-text opacity-50">
            v 0.1.0
          </li>
          {/*    <li>O</li> */}
        </ul>
      </footer>
    </div>
  );
}
