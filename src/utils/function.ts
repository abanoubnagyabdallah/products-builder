/**
 *
 * @param {string}txt - string to be sliced
 * @param {number}[max=50] - the maximum length of the string
 * @returns -sliced string
 */

export function textSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
}

