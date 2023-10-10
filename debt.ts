import readline from 'readline-sync';
import fs from 'fs';

const DEBTS_FILE = 'debts.txt';

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

async function utangs() {
  while (true) {
    console.log('Utang menu:');
    console.log('1. dugang utang');
    console.log('2. lista ang may utang');
    console.log('3. guwa');

    const choice = readline.question('pili: ');

    switch (choice) {
      case '1':
        await addDebt();
        break;

      case '2':
        await displayDebtors();
        break;

      case '3':
        console.log('untat lista')
        return;

      default:
        console.log('Way sa choices na.');
        break;
    }
  }
}

async function addDebt() {
  const name = readline.question('Sino nag utang?: ');
  const amountStr = readline.question('Pila inutang?: ');

  if (!isNumber(amountStr)) {
    console.log('Ndi ko ya bi sugot ky nd na kwarta.');
    return;
  }

  const amount = parseFloat(amountStr);
  const newDebt = `${name}, ${amount} \n`;

  try {
    fs.appendFileSync(DEBTS_FILE, newDebt);
  } catch {
    console.error('way na sulod ky nag error')
  }
}

function displayDebtors() {
  console.log('--'.repeat(100))
  console.log('Mga pala utang:')

  try {
    const debtors = fs.readFileSync(DEBTS_FILE)
    console.log(debtors)
  } catch {
    console.error('wat hapen')
  }
}

utangs();
