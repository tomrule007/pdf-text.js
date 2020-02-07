/**
 * fillTextIntercept modified a canvas context object to intercept all calls to 'fillText' and recorder results into an array
 * Inspired by: https://www.garysieling.com/blog/extracting-tables-from-pdfs-in-javascript-with-pdf-js
 * @author: Thomas Herzog
 * @param {CanvasRenderingContext2D} ctx canvas context to intercept calls on.
 * @param {Boolean} debug Set to true to draw boxes around each 'fillText' call
 */
export default function fillTextIntercept(ctx, debug = false) {
  const chars = [];
  // Save reference to the real fillText function
  var fillText = ctx.fillText;

  ctx.fillText = function(text, x, y) {
    const code = text.charCodeAt(0);

    // Unknown character encoding issue that is solved with this offset (for my specific pdf)
    const CHAR_CODE_OFFSET = 57344; //sales invoice
    const realCode = code - CHAR_CODE_OFFSET;
    const realChar = String.fromCharCode(realCode);
    const width = ctx.measureText(text).width;

    // Store Character info in chars array
    chars[chars.length] = {
      text,
      realChar,
      x: ctx._transformMatrix[4] + x,
      y: ctx._transformMatrix[5] + y,
      width,
      code,
      realCode
    };

    if (debug) {
      const height = width; // Temporary solution is to draw a square box (height = width) since I don't know how to get real height.
      ctx.strokeRect(x, y - height, width, height);
    }

    // Call real filltext function
    fillText.apply(ctx, [text, x, y]);
  };

  return chars;
}
