var stringOperators = {

  /**
   * Concatenates two strings.
   *
   * @param obj
   * @param expr
   * @returns {string|*}
   */
  $concat: function (obj, expr) {
    var args = computeValue(obj, expr, null)
    // does not allow concatenation with nulls
    if ([null, undefined].some(inArray.bind(null, args))) {
      return null
    }
    return args.join('')
  },

  /**
   * Searches a string for an occurence of a substring and returns the UTF-8 code point index of the first occurence.
   * If the substring is not found, returns -1.
   *
   * @param  {Object} obj
   * @param  {*} expr
   * @return {*}
   */
  $indexOfBytes: function (obj, expr) {
    var arr = computeValue(obj, expr, null)

    if (isNil(arr[0])) return null

    assert(isString(arr[0]), '$indexOfBytes first operand must resolve to a string')
    assert(isString(arr[1]), '$indexOfBytes second operand must resolve to a string')

    var str = arr[0]
    var searchStr = arr[1]
    var start = arr[2]
    var end = arr[3]

    assert(
      isNil(start) || (isNumber(start) && start >= 0 && Math.round(start) === start),
      '$indexOfBytes third operand must resolve to a non-negative integer'
    )
    start = start || 0

    assert(
      isNil(end) || (isNumber(end) && end >= 0 && Math.round(end) === end),
      '$indexOfBytes fourth operand must resolve to a non-negative integer'
    )
    end = end || str.length

    if (start > end) return -1

    var index = str.substring(start, end).indexOf(searchStr)
    return (index > -1)
      ? index + start
      : index
  },

  /**
   * Splits a string into substrings based on a delimiter.
   * If the delimiter is not found within the string, returns an array containing the original string.
   *
   * @param  {Object} obj
   * @param  {Array} expr
   * @return {Array} Returns an array of substrings.
   */
  $split: function (obj, expr) {
    var args = computeValue(obj, expr, null)
    assert(isString(args[0]), '$split requires an expression that evaluates to a string as a first argument, found: ' + getType(args[0]))
    assert(isString(args[1]), '$split requires an expression that evaluates to a string as a second argument, found: ' + getType(args[1]))
    return args[0].split(args[1])
  },

  /**
   * Compares two strings and returns an integer that reflects the comparison.
   *
   * @param obj
   * @param expr
   * @returns {number}
   */
  $strcasecmp: function (obj, expr) {
    var args = computeValue(obj, expr, null)
    args[0] = isEmpty(args[0]) ? '' : args[0].toUpperCase()
    args[1] = isEmpty(args[1]) ? '' : args[1].toUpperCase()
    if (args[0] > args[1]) {
      return 1
    }
    return (args[0] < args[1]) ? -1 : 0
  },

  /**
   * Returns a substring of a string, starting at a specified index position and including the specified number of characters.
   * The index is zero-based.
   *
   * @param obj
   * @param expr
   * @returns {string}
   */
  $substr: function (obj, expr) {
    var args = computeValue(obj, expr, null)
    if (isString(args[0])) {
      if (args[1] < 0) {
        return ''
      } else if (args[2] < 0) {
        return args[0].substr(args[1])
      } else {
        return args[0].substr(args[1], args[2])
      }
    }
    return ''
  },

  /**
   * Converts a string to lowercase.
   *
   * @param obj
   * @param expr
   * @returns {string}
   */
  $toLower: function (obj, expr) {
    var value = computeValue(obj, expr, null)
    return isEmpty(value) ? '' : value.toLowerCase()
  },

  /**
   * Converts a string to uppercase.
   *
   * @param obj
   * @param expr
   * @returns {string}
   */
  $toUpper: function (obj, expr) {
    var value = computeValue(obj, expr, null)
    return isEmpty(value) ? '' : value.toUpperCase()
  }
}
