const TRansactionUL = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expanseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransections = JSON.parse(
  localStorage.getItem('transactions')
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransections : [];




const removeTransiction = ID => {
  transactions = transactions.filter(
    transaction => transaction.id !== ID
    )
    updateLocalStorage()
    init();
};

const addTransactionInDOm = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const cssClass = transaction.amounr < 0 ? "minus" : "plus";
  const amountOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(cssClass);
  li.innerHTML = `

${transaction.name} <span>${operator} R$${amountOperator}</span> 
 <button class="delete-btn" onClick="removeTransiction(${transaction.id})">
 x
 </button>

 `;

  TRansactionUL.append(li);
};
const updateValues = () => {
  const TRansactionsAMount = transactions.map(
    (transaction) => transaction.amount
  );
  const total = TRansactionsAMount.reduce(
    (accumulator, transaction) => accumulator + transaction,
    0
  ).toFixed(2);
  const income = TRansactionsAMount.filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = Math.abs(
    TRansactionsAMount.filter((value) => value < 0).reduce(
      (accumulator, value) => accumulator + value,
      0
    )
  ).toFixed(2);

  balanceDisplay.textContent = `
    R$ ${total}
    `;
  incomeDisplay.textContent = `R$ ${income}`;

  expanseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  TRansactionUL.innerHTML = "";
  transactions.forEach(addTransactionInDOm);
  updateValues();
};

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateId = () => Math.round(Math.random() * 1000);

const addToTrsansactiontoArray = (transactionName, transactionAmount) => {
    transaction.push({
        name: transactionName,
        id: generateId,
        amount: number(transactionAmount)
    })
}

const cleanInput = ()=> {
    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();
const isSomeINput = transactionName === "" || transactionAmount === ""
  if (isSomeINput) {
    alert("não deixe os campos em branco");
    return;
  }

  const transaction = {
    id: generateId,
    name: transactionName,
    amount: Number(transactionAmount),
  };

  transactions.push(transaction);
  updateLocalStorage()
  init();

cleanInput()
});
