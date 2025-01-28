const fs = require('fs');

const logConsole = new console.Console(fs.createWriteStream('./output.txt'));

class portfolio {
    constructor(){
        this.stocks = []
    }
    purchase(ticker, shares){
        let index = this.stocks.findIndex((stock) => stock.ticker === ticker);
        if (index === -1){
            this.stocks.push({ticker, shares});
        } else {
            this.stocks[index].shares += shares;
        }
        logConsole.log("Current Portfolio: ", this.stocks);

    }
    sell(ticker, shares){
        let index = this.stocks.findIndex((stock) => stock.ticker === ticker);
        if (index === -1){
            throw new Error("Cannot sell stock: not in portfolio");
        } else if (this.stocks[index].shares < shares){
            throw new Error("Cannot sell specified number of shares: not enough in portfolio")
        } else {
            this.stocks[index].shares -= shares;
            if (this.stocks[index].shares === 0){
                this.stocks.splice(index, 1);
            }
        }
        logConsole.log("Current Portfolio: ", this.stocks);
    }
    count(){
        return this.stocks.length;
    }
    isEmpty(){
        return this.stocks.length === 0;
    }
    sharesOf(ticker){
        let index = this.stocks.findIndex(stock => stock.ticker === ticker);
        if (index === -1) {
            return 0;
        }
        return this.stocks[index].shares;
    }
}

exports.portfolio = portfolio;