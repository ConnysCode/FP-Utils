const readline = require('readline');
var AsciiTable = require('ascii-table')

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

  const people =[];
let money = 0;
let hours = 0;

const presets= {

  v: 169,
  t: 128

}

async function menu() {
  console.clear();
  

  console.log(await calculate());
  //const decision = await askQuestion("Was mÃ¶chtest du tun? (H)inzufÃ¼gen: ");
  decision = `h`;


  switch (decision.toLowerCase()) {
    case `h`:
    case `hinzufÃ¼gen`: {
        await addPerson();
      menu();
        break;
    }
    default:
      menu();
      break;
}
  
}

async function boot() {
  console.clear();
  money = parseFloat((await askQuestion("Wie viel Trinkgeld musst du aufteilen? ")).replace(`â‚¬`, ``));
  console.log(`Ok, du musst ${money}â‚¬ aufteilen.`);
  
  menu();
}

async function addPerson() {
  const obj = {};
  obj.name = await askQuestion("Wie heiÃŸt die Person? ")
  obj.hours = await askQuestion(`Wie viele Stunden hat ${obj.name} gearbeitet? <(V)ollzeit, (T)eilzeit, number> `)

	switch(`${obj.hours}`.toLowerCase()) {

		case `v`: obj.hours = presets.v; break;
		case `t`: obj.hours = presets.t;
		default: break;

 }
  people.push(obj);
}

async function calculate() {
  console.clear();
  const persons = [];
  hours = 0;
  for (const person of people) {
    hours += parseFloat(person.hours);
  }
  const table = new AsciiTable('Trinkgeld')
table.setHeading('Name', 'Gearbeitet', `Trinkgeld`);

console.log(table.toString())
  for (const person of people) {
    table.addRow(person.name, `${person.hours}h`, /*`${((person.hours / hours) * 100).toFixed(2)}%`, */`${(money * (person.hours / hours)).toFixed(2)}â‚¬`)
    persons.push(
      {
        name: person.name,
        hours: person.hours,
        fraction: (person.hours / hours).toFixed(2),
        money: money * (person.hours / hours).toFixed(2)
      
      })
  }
  return table.toString();
  
}

boot();
