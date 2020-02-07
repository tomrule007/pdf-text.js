const CHAR_CODE_OFFSET = 57344; //sales invoice
var chars = [];
var cur = {};

/**
 * fillTextIntercept modified a canvas context object to intercept all calls to 'fillText' and recorder results into an array
 * Inspired by: https://www.garysieling.com/blog/extracting-tables-from-pdfs-in-javascript-with-pdf-js
 * @author: Thomas Herzog
 * @param {CanvasRenderingContext2D} ctx canvas context to intercept calls on.
 * @param {Boolean} debug Set to true to draw boxes around each 'fillText' call
 */
export default function fillTextIntercept(ctx, debug = false) {
  var fillText = ctx.fillText;

  ctx.fillText = function(...args) {
    var c = args[0];
    cur.c = c;
    cur.code = c.charCodeAt(0);
    cur.realChar = String.fromCharCode(cur.code - CHAR_CODE_OFFSET);
    cur.width = ctx.measureText(c).width;
    cur.height = cur.width; // Temporary solution is to draw a square box (height = width) since I don't know how to get real height.
    cur.x = args[1];
    cur.y = args[2];
    chars[chars.length] = cur;

    if (debug) {
      ctx.strokeRect(...[cur.x, cur.y - cur.height, cur.width, cur.height]);
      console.log(cur);
    }

    cur = {};

    return fillText.apply(ctx, args);
  };

  return chars;
}
