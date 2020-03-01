/* eslint-disable no-param-reassign */
/* 
Probably should be using some type of callback storage solution.
For now I am just adding a storageProperty to the page object
*/
/* eslint-disable no-underscore-dangle */
/* 
Leaving '_transformMatrix' because I believe it has more browser 
support than the newer method 'ctx.getTransform()'

If that is wrong we can switch it and remove the lint disabler
*/

const getRealXY = (transformMatrix, [x, y]) => {
  const [a, b, c, d, e, f] = transformMatrix;
  // Apply the transformation to input coordinates using matrix dot product formula
  //
  // | a c e |   | x |    |x * a + y * c + 1 * e |
  // | b d f | * | y |  = |x * b + y * d + 1 * f |
  // | 0 0 1 |   | 1 |    |x * 0 + y * 0 + 1 * 1 |

  return [x * a + y * c + 1 * e, x * b + y * d + 1 * f];
};

/**
 * fillTextIntercept modified a canvas context object to intercept all calls to 'fillText' and recorder results into an array
 * Inspired by: https://www.garysieling.com/blog/extracting-tables-from-pdfs-in-javascript-with-pdf-js
 * @param {CanvasRenderingContext2D} ctx canvas context to intercept calls on.
 * @param {Boolean} debug Set to true to draw boxes around each 'fillText' call
 */
export default function fillTextIntercept(ctx, storageObject, debug = false) {
  const CHAR_CODE_OFFSET = 0;
  // Add chars array to storageObject
  if (storageObject.chars)
    throw new Error(
      `fillTextIntercept attempted to override '.chars' on storageObject: ${storageObject}`
    );
  storageObject.chars = [];

  // Save reference to the real fillText function
  const { fillText } = ctx;

  ctx.fillText = function intercept(text, x, y) {
    const realChar = String.fromCharCode(text.charCodeAt(0) - CHAR_CODE_OFFSET);
    const [realX, realY] = getRealXY(this._transformMatrix, [x, y]);
    const width = ctx.measureText(realChar).width * this._transformMatrix[0];

    // Store Character info in chars array
    storageObject.chars[storageObject.chars.length] = {
      text: realChar,
      x: realX,
      y: realY,
      width
    };

    if (debug) {
      const height = width; // Temporary solution is to draw a square box (height = width) since I don't know how to get real height.
      ctx.strokeRect(x, y - height, width, height);
    }

    // Call real filltext function
    fillText.apply(ctx, [text, x, y]);
  };
}
