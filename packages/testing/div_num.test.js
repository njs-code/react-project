const myFunctions = require('./target_functions.js');

test('Testing div_num -- success ', () => {
    const target = 30;
    const result = myFunctions.div_num(60,2);
    expect(target).toBe(result);
}) 

test('Testing divide by zero', () => {
    const result = myFunctions.div_num(60,0);
    expect(result).toBe(Infinity);
}) 

test('Testing negative result', () => {
    const target = 60 / -7;
    const result = myFunctions.div_num(60,-7);
    expect(result).toBe(target);
}) 

test('Testing division by fractional number', () => {
    const target = 60 / 0.35;
    const result = myFunctions.div_num(60,0.35);
    expect(result).toBe(target);
}) 