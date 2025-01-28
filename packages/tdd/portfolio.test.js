const { portfolio } = require('./portfolio'); 

let pf;

beforeEach(() => {
    pf = new portfolio(); 
});

test("Test if portfolio is empty", () => {
    expect(pf.isEmpty()).toBeTruthy();
})

test("Performing a purchase", () =>{
    pf.purchase("AAPL", 2);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 2}])
    pf.purchase("AAPL", 2);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 4}])
})

test("Performing a sale", () => {
    pf.purchase("AAPL", 2);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 2}])
    pf.sell("AAPL", 1);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 1}]);
    pf.sell("AAPL", 1);
    expect(pf.stocks).toEqual([]);
})

test("Counting stocks in portfolio", () => {
    expect(pf.count()).toEqual(0);
    pf.purchase("GOOGL", 5);
    expect(pf.count()).toEqual(1);
    pf.purchase("AAPL", 3);
    pf.purchase("GMR", 3);
    expect(pf.count()).toEqual(3);
})

test("Retrieving number of shares", () => {
    expect(pf.sharesOf("AAPL")).toEqual(0);
    pf.purchase("AAPL", 5);
    expect(pf.sharesOf("AAPL")).toEqual(5);
    pf.purchase("AAPL", 4);
    expect(pf.sharesOf("AAPL")).toEqual(9);
})


