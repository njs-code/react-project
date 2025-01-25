function div_number(a, b) {
    return a/b;
}

function containsNumbers(text){
    if (text !== undefined && text !== null){
        for (let i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            if (c >= '0' && c <= '9'){
                return true;
                console.error(c);
            }
        }
    }
    return false;
  }

exports.div_num = div_number;
exports.containsNumbers = containsNumbers;