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

/**
 * fillTextIntercept modified a canvas context object to intercept all calls to 'fillText' and recorder results into an array
 * Inspired by: https://www.garysieling.com/blog/extracting-tables-from-pdfs-in-javascript-with-pdf-js
 * @param {CanvasRenderingContext2D} ctx canvas context to intercept calls on.
 * @param {Boolean} debug Set to true to draw boxes around each 'fillText' call
 */
export default function fillTextIntercept(ctx, storageObject, debug = false) {
  // Add chars array to storageObject
  if (storageObject.chars)
    throw new Error(
      `fillTextIntercept attempted to override '.chars' on storageObject: ${storageObject}`
    );
  storageObject.chars = [];

  // Save reference to the real fillText function
  const { fillText } = ctx;

  ctx.fillText = function intercept(text, x, y) {
    const { width } = ctx.measureText(text);

    // Store Character info in chars array
    storageObject.chars[storageObject.chars.length] = {
      text,
      x: this._transformMatrix[4] + x,
      y: this._transformMatrix[5] + y,
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
