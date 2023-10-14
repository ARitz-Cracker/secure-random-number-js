const RANDOM_BYTES = 7;
const BUFFER_AMOUNT = 64;
const getRandomBuffer = function(len){
	if(typeof crypto == "object" && crypto.getRandomValues){
		return crypto.getRandomValues(new Uint8Array(len));
	}
	return require("crypto").randomBytes(len);
}
let float64Buf = new Uint8Array([
	0b11111111,
	0b11111111,
	0b11111111,
	0b11111111,
	0b11111111,
	0b11111111,
	0b11101111,
	0b00111111
]);
let float64View = new Float64Array(float64Buf.buffer);
let randomBufIndex = 0;
let randomBuf = new Uint8Array(0);
const getRandomSlice = function(){
	if(randomBufIndex >= randomBuf.length){
		randomBufIndex = 0;
		randomBuf = getRandomBuffer(RANDOM_BYTES * BUFFER_AMOUNT);
	}
	return randomBuf.subarray(randomBufIndex, randomBufIndex += RANDOM_BYTES);
}
/**
 * `Math.random` but slightly more unpredictable!
 * @returns {number}
 */
const secureRandom = function(){
	// ofc we're assuming LE here
	const slice = getRandomSlice();
	// Don't mess up the exponent
	slice[6] = slice[6] & 0b00001111 | 0b11100000;
	// and presto, 52 random bits ready
	float64Buf.set(slice);
	/* Unfortunatly we end up with range from 0.5 to 0.9999999999999999, as the mantissa is in base 2 and not base 10.
	   Attempting to randomize the other bits will bias the result towards 0, which is not a linear distribution.
	   Doing this might loose us 1 bit of precision so it's probably closer to 51 random bits but w/e it's fine.
	   This still gives us a range from 0 to 1-Number.EPSILON (0.9999999999999998) */
	return float64View[0] * 2 - 1;
}
const secureRandomRange = function(min, max){
	return secureRandom() * (max - min) + min;
}
module.exports = {secureRandom, secureRandomRange};
