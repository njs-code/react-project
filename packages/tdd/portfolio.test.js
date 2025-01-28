const { portfolio } = require('./portfolio'); 

let pf;

/*
    Reflection:

    I enjoyed the TDD pratice, it was easy to follow 
    and felt good to break the problem down into many 
    small successes. It was a quite easy to jump ahead and 
    and implement more than the test required (throwing 
    an error when trying to sell too many shares for example). 

    Refactoring sometimes feels a little ambiguous: should I leave 
    purchasing in every test (to test the ticker count, number of shares, 
    etc?) so I can test if portfolio is empty in one test and keep each 
    unit test autonomous? Or should I purchase in beforeEach() and 
    significantly trim down the lines of code?
*/

beforeEach(() => {
    pf = new portfolio(); 
});

test("Test if portfolio is empty", () => {
    //test if portfolio begins empty
    expect(pf.isEmpty()).toBeTruthy();
})

test("Performing a purchase", () =>{
    //perform two purchases
    pf.purchase("AAPL", 2);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 2}])
    pf.purchase("AAPL", 2);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 4}])
})

test("Performing a sale", () => {
    //selling multiple shares
    pf.purchase("AAPL", 4);
    pf.sell("AAPL", 3);
    expect(pf.stocks).toEqual([{ticker: "AAPL", shares: 1}]);
    //ticker is removed at last sale
    pf.sell("AAPL", 1);
    expect(pf.stocks).toEqual([]);
})

test("Counting stocks in portfolio", () => {
    //returns 0 at first
    expect(pf.count()).toEqual(0);
    //adding and counting the first ticker
    pf.purchase("GOOGL", 5);
    expect(pf.count()).toEqual(1);
    //adding 3 total
    pf.purchase("AAPL", 3);
    pf.purchase("GMR", 3);
    expect(pf.count()).toEqual(3);
})

test("Retrieving number of shares", () => {
    //Initially returns 0
    expect(pf.sharesOf("AAPL")).toEqual(0);
    pf.purchase("AAPL", 5);
    //returns share count after multiple purchases
    expect(pf.sharesOf("AAPL")).toEqual(5);
    pf.purchase("AAPL", 4);
    expect(pf.sharesOf("AAPL")).toEqual(9);
})


