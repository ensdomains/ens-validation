//MIXED ALPHABETS
const punycode = require('punycode')

// Test alphabets
var latin = 'yo'
var greek = "ϐ"
var cyrillic = "ⷠФ"
var ckj = "奥"
var bopomofo = "ㄆ"
var hangul_jamo = "ᄤ"

//Sample inputs for testing different alphabet string combinations
var input = punycode.ucs2.decode(ckj+hangul_jamo);
//converting Punycode ASCII labels into Unicode labels, so throwing any non-ASCII text into decode should throw an error
try{
	punycode.decode('h')
}
catch(error){
	console.error(error)
}
//Unicode ranges for each alphabet
var ranges = {
	'latin_ascii': [0x0000,0x007F],
	// 'latin-1_supplement': [0x0080, 0x00FF],
	'greek': [0x0370, 0x03FF],
	'cyrillic': [0x0400, 0x04FF],
	'ckj': [0x4e00, 0x9fff],
	'bopomofo': [0x3100, 0x312F],
	'katakana': [0x30a0, 0x30ff],
	'hiragana': [0x3040, 0x309f],
	'hangul_jamo': [0x1100, 0x11FF] 
}
//Keeps track of which alphabets are in the input string
var result = {
	'latin_ascii': false,
	// 'latin-1_supplement': false,
	'greek': false,
	'cyrillic': false,
	'ckj': false,
	'bopomofo':  false,
	'katakana': false,
	'hiragana': false,
	'hangul_jamo': false
};

var result = {}
var contains = {}
var i = 0;
// creates bitnumber flag in "contains" object and initiates result object for each alphabet 
for(alphabet in ranges){
	contains[alphabet] = 1 << i;
	result[alphabet] = false;
	i++;
}
//creates result object. currently doesn't check if input string is outside of the allowed unicode ranges
input.forEach(function(unicodeNumber, i){
	for(alphabet in ranges){
		let range = [ranges[alphabet][0], ranges[alphabet][1]];
		if(!result[alphabet]){
			if(unicodeNumber >= range[0] && unicodeNumber <= range[1]){
				return result[alphabet] = true;
			} 
			if(Object.keys(ranges)[Object.keys(ranges).length-1] == alphabet){
				throw new Error("Contains alphabet that lies outisde defined unicode ranges ", unicodeNumber)
			}
		}
	}
})

//creates bitwise result from input string
var bitresult = 0;
for(alphabet in result){
	if(result[alphabet]){
		console.log("CONTAINS ", alphabet)
		bitresult = bitresult | contains[alphabet];
	}
}

//checks for blank entry or 
if(bitresult < 1){
	throw new Error("Nothing entered")
}
//checks for more than one option and if it contains only western alphabet
if(bitresult < contains['ckj'] && bitresult !== (bitresult & -bitresult)){ //can only have one option
	throw new Error("Contains more than one western alphabet :(")
}
if(bitresult >= contains['ckj']){ //limits to western alphabet
	if(bitresult & contains["greek"] || bitresult & contains['cyrillic']){ 
		throw new Error("CONTAINS NON LATIN LANGUAGE with asian alphabet");
	}
	//checks if latin is mixed with only ONE asian alphabet
	if(bitresult & contains['latin_ascii'] && (bitresult - contains['latin_ascii']) !== ((bitresult - contains['latin_ascii']) & (-bitresult + contains['latin_ascii']))){
		throw new Error("latin is mixed with more than one of the following: chinese, japanese, or korean")
	}
	//checks if CKJ is paired  with only ONE of the asian alphabets
	if(bitresult & contains['ckj'] && (bitresult - contains['ckj']) !== ((bitresult - contains['ckj']) & (-bitresult + contains['ckj']))){
		throw new Error( "Contains CKJ and more than one other asian alphabet")
	}
	//checks if non-CKJ Asian alphabet is paired with another CKJ asian alphabet
	if(!(bitresult & contains['ckj']) && bitresult !== (bitresult & -bitresult)){
		throw new Error("Contains more than one non CKJ asian alphabet")
	}
}

