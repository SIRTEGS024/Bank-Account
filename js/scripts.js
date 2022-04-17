function Bank() {
  this.accounts = {},
  this.currentId = 2209146835;
}
Bank.prototype.assignID = function () {
  this.currentId += 1268;
  return this.currentId;
};
Bank.prototype.addAccount = function(account) {
  account.id = this.assignID();
  this.accounts[account.id] = account
}
Bank.prototype.findAccount = function (id) {
  if (this.accounts[id] != undefined) {
    return this.accounts[id];
  }
  return false;
};

function account(name, balance) {
  this.name = name,
  this.balance = balance,
  this.history = [balance];
}
account.prototype.makeDeposit = function(amount) {
  this.balance += parseInt(amount);
  this.history.push("Credit:" + amount);
}
account.prototype.makeWithdrawl = function(amount) {
  if(amount > this.balance) {
    alert("Not enough funds! You only have: $" + this.balance);
  } else {
    this.balance -= parseInt(amount);
    this.history.push("Debit:" + amount);
  }
}
account.prototype.getHistory = function() {
  let output = "";
  Object.keys(this.history).forEach(function (key) {
    if(this.history[key].toString().includes("Debit")){
      output += "<span class='negative'>$" + this.history[key] + "</span>";
    } else {
      output += "$" + this.history[key];
    }
    if(key < this.history.length-1) {
      output += ", ";
    }
  });
  return output;
}
let bank = new Bank();

function displayAccs(bankToDisplay){
  let accList = $("#accSelect");
  let accHTML = "";
  Object.keys(bankToDisplay.accounts).forEach(function (key) {
    const account = bankToDisplay.findAccount(key);
    accHTML += "<option id=" + account.id + ">" + account.name + "</option>";
  });
  accList.html(accHTML);
}
function showAccount(accountId) {
  const account = bank.findAccount(accountId);
  $("##balanceDisp").show();
  $("#accName").html(account.name);
  $("#accNum").html(account.id);
  $("#curBal").html("$" + account.balance);
  $("#accHistory").html(account.getHistory());
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + account.id + ">Delete</button>");
}



$(document).ready(function() {
  $("input:radio[value=new]").click(function() {
      $("#current").hide();
      $("#new").fadeIn("slow");
  });
  $("input:radio[value=current]").click(function() {
      $("#current").fadeIn("slow");
      $("#new").hide();
  });





});