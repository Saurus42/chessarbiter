/**
 * Substitutes a single character in a string.
 * @param {number} index 
 * @param {string} replacement 
 * @returns 
 */
String.prototype.replaceAt = function( index, replacement ) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}