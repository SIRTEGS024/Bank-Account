function Bank() {
  this.accounts = [],
  this.currentID = 0;
}
Bank.prototype.addAccount = function(account) {
  this.currentID += 1;
  account.id = this.currentID;
  this.accounts.push(account);
}
Bank.prototype.findAccount = function(id) {
  var output = false;
  for(let i=0; i<this.accounts.length; i++) {
    if(this.accounts[i]) {
      if(this.accounts[i].id === id) {
        output = this.accounts[i];
      }
    }
  }
  return output;
}


function Account(name, balance) {
  this.name = name,
  this.balance = balance,
  this.history = [balance];
}
Account.prototype.makeDeposit = function(amount) {
  this.balance += parseInt(amount);
  this.history.push("Credit:" + amount);
}
Account.prototype.makeWithdrawl = function(amount) {
  if(amount > this.balance) {
    alert("Not enough funds! You only have: $" + this.balance);
  } else {
    this.balance -= parseInt(amount);
    this.history.push("Debit:" + amount);
  }
}
Account.prototype.getHistory = function() {
  let output = "";
  for(let i=0; i<this.history.length; i++) {
    if(this.history[i].toString().includes("-")){
      output += "<span class='negative'>$" + this.history[i] + "</span>";
    } else {
      output += "$" + this.history[i];
    }
    if(i < this.history.length-1) {
      output += ", ";
    }
  }
  return output;
}


$(document).ready(function() {
  let bank = new Bank();
  $("input:radio[value=new]").click(function() {
      $("#current").hide();
      $("#new").fadeIn("slow");
  });
  $("input:radio[value=current]").click(function() {
      $("#current").fadeIn("slow");
      $("#new").hide();
  });





});