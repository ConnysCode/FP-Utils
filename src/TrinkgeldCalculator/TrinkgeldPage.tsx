import React, { useRef, useState } from "react";
import "./Trinkgeld.css";

function TrinkgeldPage() {
  const [persons, setPersons] = useState<{ name: string; hours: number }[]>([]);
  const [currPersonIndex, setCurrPersonIndex] = useState(0);
  const [calculationPhase, setCalcPhase] = useState(0);
  const [hoursWorked, setHoursWoked] = useState(0);
  const [money, setMoney] = useState(0);

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

    setHoursWoked(hoursWorked + hours);
    setPersons(newP);
    nameInput.current?.focus();
    nameInput.current?.select();
  };
  const removePerson = (name: string) => {
    const newPersons = [...persons];
    const person = newPersons.findIndex((p) => p.name === name);
    if (person < 0) return;
    const personHours = newPersons[person].hours;    
    newPersons.splice(person, 1);
    console.log(newPersons);
    console.log(name);
    console.log(person);
    
    
    setPersons(newPersons);
    setHoursWoked(hoursWorked - personHours);
  };

  const calculateHours = () => {
    let hours = 0;
    for (const p of persons) {
      hours = hours + p.hours;
    }
    return hours;
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
      percent: parseFloat((persons[currPersonIndex].hours / hoursWorked).toFixed(2)),
    };
  };

  if (calculationPhase === 1)
    return (
      <div className="App">
        <h2>Trinkgeld Rechner</h2>
        <p>
          Es wurden insgesamt <b>{hoursWorked} Stunden</b> gearbeitet
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
                <button onClick={() => {
                  removePerson(p.name)
                }}>X</button> {p.name} - <b>{p.hours}</b>
                <br />
              </>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (persons.length > 0) {
              setCalcPhase(2);
            }
          }}
          className={`BigButton`}
        >
          Finish Calculation
        </button>
      </div>
    );
  else if (calculationPhase === 2)
    return (
      <div className="App">
        <h2>
          {getPerson().name}
          <p></p>
        </h2>
        <div className={`content`}>
          <h3>
            Trinkgeld: <b>{money * getPerson().percent}€</b>
          </h3>
          <p>
            Stunden gearbeitet: <b>{persons[currPersonIndex].hours}h</b>
            <br />
            Prozentualer Anspruch: <b>{getPerson().percent * 100} %</b>
          </p>
        </div>
        <div className={`buttons`}>
          <button onClick={prevPerson} className={`BigButton`}>
            Previous Person
          </button>
          <button onClick={nextPerson} className={`BigButton`}>
            Next Person
          </button>
        </div>
      </div>
    );
  else {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default TrinkgeldPage;
