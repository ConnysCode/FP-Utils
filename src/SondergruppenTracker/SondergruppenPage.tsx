import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import "./sondergruppen.css";
import { Helmet } from "react-helmet";
import "../index.css";
import "./sondergruppen.css";
import { isTemplateTail } from "typescript";
import {
  bookingTypeInterface,
  bookingTypes,
  softdrinks,
  sondergruppeInterface,
} from "./sondergruppenInterfaces";

function SondergruppenPage() {
  const [items, setItems] = useState<sondergruppeInterface[]>([]);
  const [addWindow, setAddWindow] = useState(false);
  const [editWindow, setEditWindow] = useState({ open: false, groupID: 0 });

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

  const changeItems = (items: sondergruppeInterface[]) => {
    setItems(items);
    console.log(items);

    caches.open(`sondergruppen`).then(async (cache) => {
      cache.put(`gruppen`, new Response(JSON.stringify(items)));
    });
    setAddWindow(false);
  };

  const changeEditWindow = (eWindow: typeof editWindow) => {
    setEditWindow(eWindow);
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
        <div className="SonderButtons">
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
        <h2>LaserTag</h2>
        <br />
        <div className="SonderItemList">
          {items.map((i) => {
            return (
              <>
                <ListItem
                  changeEditWindow={changeEditWindow}
                  changeItems={changeItems}
                  items={items}
                  item={i}
                />
              </>
            );
          })}
        </div>
      </div>
      {addWindow && <AddWindow changeItems={changeItems} items={items} />}
      {editWindow && editWindow.open && items.find((i) => i.id === editWindow.groupID) && (
        <EditGroupWindow
          item={items.find((i) => i.id === editWindow.groupID)}
          changeItems={changeItems}
          items={items}
        />
      )}
    </>
  );
}
export default SondergruppenPage;

const AddWindow = (props: {
  changeItems: (items: sondergruppeInterface[]) => void;
  items: sondergruppeInterface[];
}) => {
  const [type, setType] = useState<bookingTypeInterface>();
  const [players, setPlayers] = useState<number>();
  const [gruppenname, setGruppenname] = useState(`Mustermann`);
  return (
    <>
      <br />
      <div className="App Panel">
        <h2>Gruppe Hinzufügen</h2>
        <div className="SonderButtons">
          <input
            onBlur={(t) => {
              setGruppenname(t.target.value);
            }}
            placeholder="Gruppenname"
            min={4}
          />
        </div>
        <div className="SonderButtons">
          <select
            onBlur={(t) => {
              setType(bookingTypes[t.target.value]);
            }}
          >
            {Object.entries(bookingTypes).map(([key, bookingType]) => {
              return <option value={key}>{key}</option>;
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
        <div className="SonderButtons">
          <button
            onClick={() => {
              if (type && players && gruppenname) {
                props.changeItems([
                  ...props.items,
                  {
                    id: getRandomInt(Date.now()),
                    name: gruppenname,
                    players: players,
                    beer: [],
                    nachos: false,
                    sweets: false,
                    softdrinks: [],
                    bookingConfig: type,
                  },
                ]);
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

const EditGroupWindow = (props: {
  changeItems: (items: sondergruppeInterface[]) => void;
  items: sondergruppeInterface[];
  item: sondergruppeInterface | undefined;
}) => {
  const [type, setType] = useState<bookingTypeInterface>();
  const [players, setPlayers] = useState<number>();
  const [gruppenname, setGruppenname] = useState(`Mustermann`);
  return (
    <>
      <br />
      <div className="App Panel">
        <h2>{props.item?.name}</h2>
        <br />
        <h3>Softgetränke (0,3l)</h3>
        <div className="CheckListItem">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
        </div>
          <div className="SonderButtons">
            <select
              onBlur={(t) => {
                setType(bookingTypes[t.target.value]);
              }}
            >
              {softdrinks.map((drink) => {
                return <option value={drink}>{drink}</option>;
              })}
            </select>
            <button
              onClick={() => {
                if (type && players && gruppenname) {
                  props.changeItems([
                    ...props.items,
                    {
                      id: getRandomInt(Date.now()),
                      name: gruppenname,
                      players: players,
                      beer: [],
                      nachos: false,
                      sweets: false,
                      softdrinks: [],
                      bookingConfig: type,
                    },
                  ]);
                }
              }}
            >
              Hinzufügen
            </button>
          </div>
        <br />
        <h3>Biere (klein)</h3>
        <div className="CheckListItem">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
        </div>
          <div className="SonderButtons">
            <select
              onBlur={(t) => {
                setType(bookingTypes[t.target.value]);
              }}
            >
              {softdrinks.map((drink) => {
                return <option value={drink}>{drink}</option>;
              })}
            </select>
            <button
              onClick={() => {
                if (type && players && gruppenname) {
                  props.changeItems([
                    ...props.items,
                    {
                      id: getRandomInt(Date.now()),
                      name: gruppenname,
                      players: players,
                      beer: [],
                      nachos: false,
                      sweets: false,
                      softdrinks: [],
                      bookingConfig: type,
                    },
                  ]);
                }
              }}
            >
              Hinzufügen
            </button>
          </div>
        <br />
      </div>
    </>
  );
};

const ListItem = (props: {
  complete?: boolean;
  item: sondergruppeInterface;
  items: sondergruppeInterface[];
  changeItems: (items: sondergruppeInterface[]) => void;
  changeEditWindow: (eWindow: { open: boolean; groupID: number }) => void;
}) => {
  return (
    <>
      <div className={`SonderListItem ${props.complete ? `complete` : ``}`}>
        <p
          onClick={() => {
            props.changeEditWindow({ open: true, groupID: props.item.id });
          }}
          className="sonderGroupName"
        >
          {props.item.name}
        </p>
        <p style={{ color: `${props.item.bookingConfig.colorCode}` }} className="typeName">
          {props.item.bookingConfig.typeName}
        </p>
        <p className="sonderGroupDetails">
          {props.item.bookingConfig.softdrinkPerPlayer > 0 && (
            <p>
              Softdrinks: {props.item.softdrinks.filter((s) => s.revieved).length} (
              {props.item.softdrinks.length}) /{" "}
              {props.item.bookingConfig.softdrinkPerPlayer * props.item.players}
            </p>
          )}
          {props.item.bookingConfig.beerPerPlayer > 0 && (
            <p>
              Biere: {props.item.beer.filter((s) => s.revieved).length} ({props.item.beer.length}) /{" "}
              {props.item.bookingConfig.beerPerPlayer * props.item.players}
            </p>
          )}

          {props.item.bookingConfig.sweets && (
            <p
              className="SonderSweets"
              onClick={() => {
                const elementIndex = props.items.findIndex((i) => i.id === props.item.id);
                const newItems = [...props.items];
                newItems[elementIndex] = { ...props.item, sweets: !props.item.sweets };
                props.changeItems(newItems);
              }}
            >
              Süßigkeiten:{" "}
              <span style={{ color: `${props.item.sweets ? `green` : `red`}` }}>
                {`${props.item.sweets}`
                  .replace(`false`, `Nicht erhalten`)
                  .replace(`true`, `Erhalten`)}
              </span>
            </p>
          )}

          {props.item.bookingConfig.nachos && (
            <p
              className="SonderSweets"
              onClick={() => {
                const elementIndex = props.items.findIndex((i) => i.id === props.item.id);
                const newItems = [...props.items];
                newItems[elementIndex] = { ...props.item, nachos: !props.item.nachos };
                props.changeItems(newItems);
              }}
            >
              Nachos:{" "}
              <span style={{ color: `${props.item.nachos ? `green` : `red`}` }}>
                {`${props.item.nachos}`
                  .replace(`false`, `Nicht erhalten`)
                  .replace(`true`, `Erhalten`)}
              </span>
            </p>
          )}
        </p>
      </div>
    </>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
