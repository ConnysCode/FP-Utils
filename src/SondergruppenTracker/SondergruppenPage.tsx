import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import "./sondergruppen.css";
import { Helmet } from "react-helmet";
import { GeburtstagLaserTag, groups, groupsType, softdrinks } from "./sondergruppenInterfaces";
import "../index.css";
import "./sondergruppen.css";
import { isTemplateTail } from "typescript";

function SondergruppenPage() {
  const [items, setItems] = useState<GeburtstagLaserTag[]>([]);
  const [addWindow, setAddWindow] = useState(false);

  useEffect(() => {
    if ("caches" in window) {
      // Opening given cache and putting our data into it
      caches.open(`sondergruppen`).then(async (cache) => {
        const cachedResponse = await cache.match(`gruppen`);
        var data = await cachedResponse?.json();
        if (cachedResponse && data) setItems(data);
      });
    }
  }, []);

  const changeItems = (items: GeburtstagLaserTag[]) => {
    setItems(items);
    console.log(items);

    caches.open(`sondergruppen`).then(async (cache) => {
      cache.put(`gruppen`, new Response(JSON.stringify(items)));
    });
    setAddWindow(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Sondergruppen Tracker`}</title>
      </Helmet>

      <nav>
        <ol>
          <li>
            <Link to={`/`}>Menu</Link>
          </li>
          <li>Sondergruppen Tracker</li>
        </ol>
      </nav>
      <div className="App Panel">
        <div className="sonderButtons">
          {/* <Link to={``}></Link> */}
          <button
            onClick={() => {
              setAddWindow(true);
            }}
          >
            Gruppe Hinzufügen
          </button>
        </div>
        <br />
        <h2>Gruppen</h2>
        <div className="SonderItemList">
          {items.map((i) => {
            return <ListItem changeItems={changeItems} items={items} item={i} />;
          })}
        </div>
        <br />
        <h2>Abgeschlossen</h2>
        <div className="SonderItemList">
          {items.map((i) => {
            return <ListItem changeItems={changeItems} items={items} complete item={i} />;
          })}
        </div>
      </div>
      {addWindow && <AddWindow changeItems={changeItems} items={items} />}
    </>
  );
}
export default SondergruppenPage;

const AddWindow = (props: {
  changeItems: (items: GeburtstagLaserTag[]) => void;
  items: GeburtstagLaserTag[];
}) => {
  const [type, setType] = useState<groupsType>();
  const [players, setPlayers] = useState<number>();
  const [gruppenname, setGruppenname] = useState(`Mustermann`);
  return (
    <>
      <br />
      <div className="App Panel">
        <h2>Gruppe Hinzufügen</h2>
        <div className="sonderButtons">
          <input
            onBlur={(t) => {
              setGruppenname(t.target.value);
            }}
            placeholder="Gruppenname"
            min={4}
          />
        </div>
        <div className="sonderButtons">
          <select
            onBlur={(t) => {
              console.log(`oiii`);

              setType(t.target.value as groupsType);
            }}
          >
            {groups.map((s) => {
              return <option value={s}>{s}</option>;
            })}
          </select>
          <input
            onBlur={(t) => {
              if (t.target.value && !isNaN(parseInt(t.target.value)))
                setPlayers(parseInt(t.target.value));
            }}
            type={"number"}
            placeholder="Spieleranzahl"
            min={4}
          />
        </div>
        <div className="sonderButtons">
          <button
            onClick={() => {
              if (type && players && gruppenname) {
                switch (type) {
                  case `LT Geburtsag x2`:
                    props.changeItems([
                      ...props.items,
                      {
                        id: getRandomInt(Date.now()),
                        name: gruppenname,
                        type: type,
                        players: players,
                        softdrinks: [],
                        softdrinkLimit: players,
                        sweets: false,
                      },
                    ]);
                    break;
                  case "LT Geburtsag x3":
                    props.changeItems([
                      ...props.items,
                      {
                        id: getRandomInt(Date.now()),
                        name: gruppenname,
                        type: type,
                        players: players,
                        softdrinks: [],
                        softdrinkLimit: 2 * players,
                        sweets: false,
                      },
                    ]);
                    break;

                  case "LT Geburtsag x4":
                    props.changeItems([
                      ...props.items,
                      {
                          id: getRandomInt(Date.now()),
                        name: gruppenname,
                        type: type,
                        players: players,
                        softdrinks: [],
                        softdrinkLimit: 3 * players,
                        sweets: false,
                      },
                    ]);
                    break;
                }
              }
            }}
          >
            Hinzufügen
          </button>
        </div>
      </div>
    </>
  );
};

const ListItem = (props: {
  complete?: boolean;
  item: GeburtstagLaserTag;
  items: GeburtstagLaserTag[];
  changeItems: (items: GeburtstagLaserTag[]) => void;
}) => {
  return (
    <>
      <div className={`SonderListItem ${props.complete ? `complete` : ``}`}>
        <p className="sonderGroupName">{props.item.name}</p>
        <p className="lasertagName">Kindergeburtstag</p>
        <p className="sonderGroupDetails">
          <p>
            Softdrinks: {props.item.softdrinks.length}/{props.item.softdrinkLimit}
          </p>
          <p className="SonderSweets"
            onClick={() => {
              const elementIndex = props.items.findIndex((i) => i.id === props.item.id);
              const newItems = [...props.items];
              newItems[elementIndex] = { ...props.item, sweets: !props.item.sweets };
              props.changeItems(newItems);
            }}
          >
            Süßigkeiten:{" "}
            <span style={{color: `${props.item.sweets ? `green` : `red`}`}}>{`${props.item.sweets}`.replace(`false`, `Nicht erhalten`).replace(`true`, `Erhalten`)}</span>
          </p>
        </p>
      </div>
    </>
  );
};


function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }