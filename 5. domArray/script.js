const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let arrayData = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Get Random User
function getRandomUser() {
  fetch('https://randomuser.me/api')
  .then(res => res.json())
  .then(data => {
    data = data.results[0];

    newUser = {
      name: `${data.name.first} ${data.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    }
    addUserArrayData(newUser);
  });
}

// Add New user to array data
function addUserArrayData(user) {
  arrayData.push(user);
  screenUpdate(arrayData);
}

// Update display
function screenUpdate(arrayData) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  arrayData.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${getNeatNumbers(user.money)}`;

    main.appendChild(element);
  })
}

// get neat numbers
function getNeatNumbers(num) {
  return '$ ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double Money
function doubleMoney() {
  arrayData.map(user => {
    user.money *= 2;
  });
  screenUpdate(arrayData);
}
// Show Millionaires
function showMillionaires() {
  arrayData = arrayData.filter(user => user.money > 1000000 );
  screenUpdate(arrayData);
}

// Sort by Richest
function sortByMoney() {
  arrayData.sort((a, b) => b.money - a.money)
  screenUpdate(arrayData);
}

// Calculate Total
function calculateTotal() {
  let totalWealth = 0;
  arrayData.map(user => totalWealth += user.money);
  console.log(totalWealth);
  
  const elementTotal = document.createElement('div');
  elementTotal.innerHTML = `<h3><strong>Total Wealth: </strong>${getNeatNumbers(totalWealth)}</h3>`
  main.appendChild(elementTotal);
}

// Event Listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByMoney);
calculateWealthBtn.addEventListener('click', calculateTotal);
