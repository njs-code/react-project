const myFunctions = require('./target_functions.js');

test('Testing contains numbers false', () => {
    const result = myFunctions.containsNumbers("ABCDEBF");
    expect(result).toBe(false);
})

test('Testing contains numbers known true', () => {
    result = myFunctions.containsNumbers("1BCDEBF");
    expect(result).toBe(true);
})

test('Testing contains numbers mixed case', () => {
    result = myFunctions.containsNumbers("AbcDEBe");
    expect(result).toBe(false);
})

test('Testing lower case true', () => {
    result = myFunctions.containsNumbers("b12d385a");
    expect(result).toBe(true);
})

test('Testing white space true', () => {
    result = myFunctions.containsNumbers("b12 85a");
    expect(result).toBe(true);
})

test('Testing white space false', () => {
    result = myFunctions.containsNumbers(" afsf bfgf ");
    expect(result).toBe(false);
})

test('Testing empty string', () => {
    result = myFunctions.containsNumbers("");
    expect(result).toBe(false);
})

test('Testing special characters - false case', () => {
    result = myFunctions.containsNumbers("\nhello & % @")
    expect(result).toBe(false);
})

test('Testing special characters - true case', () => {
    result = myFunctions.containsNumbers("\nh3llo & % @")
    expect(result).toBe(true);
})

