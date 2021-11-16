import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Trinkgeld.css";
import { Helmet } from "react-helmet";
import Person from "./components/person";

function TrinkgeldPage() {
  const [persons, setPersons] = useState<{ name: string; hours: number }[]>([]);
  const [currPersonIndex, setCurrPersonIndex] = useState(0);
  const [calculationPhase, setCalcPhase] = useState(0);
  const [money, setMoney] = useState(0);
  const [title, setTitle] = useState(`Trinkgeld Rechner`);

  const nameInput = useRef<HTMLInputElement>(null);
  const hoursInput = useRef<HTMLInputElement>(null);
  const moneyInput = useRef<HTMLInputElement>(null);

  const addPerson = () => {
    if (!nameInput || !hoursInput || isNaN(parseFloat(hoursInput.current?.value || `0`))) return;

    const name = nameInput.current?.value || `Unknown`;
    const hours = parseFloat(hoursInput.current?.value || `0`);
    const newP = [...persons];
    const person = newP.findIndex((p) => p.name === name);
    if (person > -1) return;
    newP.push({ name: name, hours: hours });
    setPersons(newP);
    console.log(nameInput.current);
    
    //nameInput.current?.focus();
    nameInput.current?.select();
  };
  const removePerson = (name: string) => {
    const newPersons = [...persons];
    const person = newPersons.findIndex((p) => p.name === name);
    if (person < 0) return;
    newPersons.splice(person, 1);
    setPersons(newPersons);
  };

  const calculateHours = (persons: { name: string; hours: number }[]) => {
    let hours = 0;
    for (const p of persons) {
      hours = hours + p.hours;
    }
    return parseFloat(hours.toFixed(2));
  };
  const nextPerson = () => {
    if (currPersonIndex < persons.length - 1) setCurrPersonIndex(currPersonIndex + 1);
  };
  const prevPerson = () => {
    if (currPersonIndex === 0) setCalcPhase(1);
    else setCurrPersonIndex(currPersonIndex - 1);
  };

  const getPerson = () => {
    return {
      ...persons[currPersonIndex],
      percent: parseFloat((persons[currPersonIndex].hours / calculateHours(persons)).toFixed(2)),
    };
  };

  const MoneyInit = () => {
    return (
      <>
        <h2>
          Wie viel Trinkgeld wurde eingenommen?
          <p></p>
        </h2>
        <div className={`content`}>
          <input type={"number"} ref={moneyInput} placeholder={`0€`} />
        </div>
        <div className={`buttons`}>
          <button
            onClick={() => {
              if (moneyInput.current?.value !== ``) {
                setCalcPhase(1);
                setMoney(parseFloat(moneyInput.current?.value || `0`));
              }
            }}
            className={`BigButton`}
          >
            Fortfahren
          </button>
        </div>
      </>
    );
  };

  const MainMenu = () => {
    return (
      <>
        <h2>Trinkgeld Rechner</h2>
        <p>
          Es wurden wurden{" "}
          <b>
            <input
              type={`number`}
              className={`hidden`}
              style={{ width: `${`${money}`.length + 0.5}ch` }}
              onChange={(e) => {
                if (e.target.value === ``) return;
                setMoney(parseFloat(e.target.value));
                e.target.style.width = `${`${parseFloat(e.target.value)}`.length + 0.5}ch`;
              }}
              defaultValue={money}
            ></input>{" "}
            €{" "}
          </b>{" "}
          an Trinkgeld eingenommen.
          <br />
          Es wurden insgesamt <b>{calculateHours(persons)} Stunden </b> gearbeitet.
        </p>
        <div>
          <h4>Person Hinzufügen</h4>
          <input ref={nameInput} placeholder={`Name`} />{" "}
          <input type={"number"} ref={hoursInput} placeholder={`Hours`} />{" "}
          <button onClick={addPerson}>Add</button>
        </div>
        <div className={`content`}>
          {persons.map((p) => {
            return (
              <>
                <button
                  onClick={() => {
                    removePerson(p.name);
                  }}
                >
                  X
                </button>{" "}
                {p.name} - <b>{p.hours} Stunden</b>
                <br />
              </>
            );
          })}
        </div>
        {persons.length > 0 && (
          <button
            onClick={() => {
              if (persons.length > 0) {
                setCalcPhase(2);
              }
            }}
            className={`BigButton`}
          >
            Fortfahren
          </button>
        )}
      </>
    );
  };

  const CalculateMenu = () => {
    return (
      <>
        <h2>
          {getPerson().name}
          <p></p>
        </h2>
        <div className={`content`}>
          <h3>
            Trinkgeld: <b>{(money * getPerson().percent).toFixed(2)}€</b>
          </h3>
          <p>
            Stunden gearbeitet: <b>{persons[currPersonIndex].hours}h</b>
            <br />
            Prozentualer Anspruch: <b>{(getPerson().percent * 100).toFixed(2)} %</b>
          </p>
        </div>
        <div className={`buttons`}>
          <button onClick={prevPerson} className={`BigButton`}>
            {(currPersonIndex === 0 && <>Back to Menu</>) || <>Previous Person</>}
          </button>
          {currPersonIndex < persons.length - 1 && (
            <button onClick={nextPerson} className={`BigButton`}>
              Next Person
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{(calculationPhase === 2 && getPerson().name) || `Trinkgeld Rechner`}</title>
      </Helmet>
      <div className="App">
        {(calculationPhase === 2 && <CalculateMenu />) ||
          (calculationPhase === 1 && <MainMenu />) || <MoneyInit />}
      </div>
    </>
  );
}
export default TrinkgeldPage;
