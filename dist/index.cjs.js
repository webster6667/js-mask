'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var r = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var r__default = /*#__PURE__*/_interopDefaultLegacy(r);

/**
 * Replace all RegExp symbols in mask array to placeholder
 */
var replaceAllPatternRegExpsToPlaceholder = function replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) {
  return maskSymbolsArrayToOutPut.map(function (patternSymbol) {
    var shouldReplaceRegExpToPlaceholder = patternSymbol === regExpReplaceSymbol;
    return shouldReplaceRegExpToPlaceholder ? placeholder : patternSymbol;
  });
};

/**
 * delimit maskPattern by symbols, and replace regExp to special symbol
 */
var getMaskSymbolsArray = function getMaskSymbolsArray(maskPattern, regExpReplaceSymbol) {
  var regExp = /\[[\\d\w-]+\]/g,
      regExpResult = maskPattern.match(regExp),
      regExpsArray = regExpResult ? Array.from(regExpResult).reverse() : [],
      maskWithOutRegExps = maskPattern.replace(regExp, regExpReplaceSymbol),
      maskSymbolsArray = maskWithOutRegExps.split('');
  return {
    regExpsArray: regExpsArray,
    maskSymbolsArray: maskSymbolsArray
  };
};

/**
 * return first regExp symbol index after caret, or 0
 */
var getFirstFilledRegExpIndexAfterCaret = function getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, commonRegExpsArray, regExpReplaceSymbol, inputCaretPositionBeforeChangeText) {
  var regExpsArray = _toConsumableArray__default['default'](commonRegExpsArray);

  var firstRegExpSymbolIndexAfterCaret = 0;
  maskSymbolsArray.forEach(function (maskSymbol, maskSymbolIndex) {
    var textSymbol = prevValueMaskSymbolsArray[maskSymbolIndex],
        isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol;

    if (isMaskPatternRegExp) {
      var maskRegExp = regExpsArray.pop(),
          regExp = maskRegExp ? new RegExp(maskRegExp) : null;

      if (regExp && regExp.test(textSymbol) && maskSymbolIndex >= inputCaretPositionBeforeChangeText && firstRegExpSymbolIndexAfterCaret === 0) {
        firstRegExpSymbolIndexAfterCaret = maskSymbolIndex;
      }
    }
  });
  return firstRegExpSymbolIndexAfterCaret;
};

/**
 * Clear redundant symbol _ after input symbols
 */
var clearRedundantPlaceholderAfterInputText = function clearRedundantPlaceholderAfterInputText(textSymbolsArrayForMask, prevValueMaskSymbolsArray, newValueMaskSymbolsArray, inputCaretPositionBeforeChangeText, firstRegExpSymbolIndexAfterCaret, placeholder, lengthDifference) {
  var sliceFinish = inputCaretPositionBeforeChangeText + lengthDifference,
      inputSymbols = newValueMaskSymbolsArray.slice(inputCaretPositionBeforeChangeText, sliceFinish),
      finishPreValueIndexForSearchPlaceholder = firstRegExpSymbolIndexAfterCaret > 0 ? firstRegExpSymbolIndexAfterCaret : prevValueMaskSymbolsArray.length;
  var deletedPlaceholderCount = 0;

  for (var preValueIndex = inputCaretPositionBeforeChangeText; preValueIndex < finishPreValueIndexForSearchPlaceholder; preValueIndex++) {
    var preValueSymbol = prevValueMaskSymbolsArray[preValueIndex];

    if (preValueSymbol === placeholder && deletedPlaceholderCount < lengthDifference) {
      deletedPlaceholderCount++;
      textSymbolsArrayForMask.splice(preValueIndex + 1 - deletedPlaceholderCount, 1);
    }
  }

  inputSymbols.forEach(function (inputSymbol, index) {
    textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText + index, 0, inputSymbol);
  });
};

/**
 * get caret position after input
 */
var getNewCaretPosition = function getNewCaretPosition(isDeleteAction, maskSymbolsArray, textSymbolsArrayForMask, regExpReplaceSymbol, inputCaretPositionIndex, placeholder, maskedValue, maskPatternString, newValueLength) {
  var newCaretPosition = inputCaretPositionIndex;

  if (textSymbolsArrayForMask.includes(placeholder)) {

    for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsArray.length; maskSymbolIndex++) {
      var maskSymbol = maskSymbolsArray[maskSymbolIndex],
          isRegExpSymbol = maskSymbol === regExpReplaceSymbol;

      if (isRegExpSymbol) {
        if (isDeleteAction) {
          if (maskSymbolIndex === inputCaretPositionIndex) {
            newCaretPosition = maskSymbolIndex;
          } else if (maskSymbolIndex < inputCaretPositionIndex) {
            newCaretPosition = maskSymbolIndex + 1;
          }
        } else if (maskSymbolIndex >= inputCaretPositionIndex) {
          newCaretPosition = maskSymbolIndex;
          break;
        }
      }
    }
  }

  var isUnmaskedValueEmpty = maskedValue === maskPatternString,
      wasInputSymbolWithOutMask = newValueLength === 1;
  if (isUnmaskedValueEmpty) newCaretPosition = maskPatternString.indexOf(placeholder);
  if (wasInputSymbolWithOutMask) newCaretPosition = maskPatternString.indexOf(placeholder) + 1;
  return newCaretPosition;
};

function e(r,e){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!n){if(Array.isArray(r)||(n=function(r,e){if(!r)return;if("string"==typeof r)return t(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(r);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(r,e)}(r))||e&&r&&"number"==typeof r.length){n&&(r=n);var o=0,a=function(){};return {s:a,n:function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function(r){throw r},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,f=!0,c=!1;return {s:function(){n=n.call(r);},n:function(){var r=n.next();return f=r.done,r},e:function(r){c=!0,i=r;},f:function(){try{f||null==n.return||n.return();}finally{if(c)throw i}}}}function t(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var n=function t(n,o){var a=!0;if(n&&o){if(!("object"===r__default['default'](n)&&"object"===r__default['default'](o)))return !1;var i=Object.keys(n),f=Object.keys(o);if(i.length===f.length){var c,u=e(i);try{for(u.s();!(c=u.n()).done;){var l=c.value,b=n[l];if(!Object.hasOwnProperty.call(o,l)){a=!1;break}var s=o[l];if("object"===r__default['default'](b)&&"object"===r__default['default'](s)){if(!t(b,s)){a=!1;break}}else if(s!=b){a=!1;break}}}catch(r){u.e(r);}finally{u.f();}}else a=!1;}else a=!1;return a},o=function(e){var t=!0;if(!Array.isArray(e))throw new Error("compared object must be in array");for(var o=0;;o++){var a=e[o],i=e[o+1];if(!a||!i){if("object"!==r__default['default'](a))throw new Error("type of compared items must be object");break}if(!("object"===r__default['default'](a)&&"object"===r__default['default'](i)))throw new Error("type of compared items must be object");if(!1===(t=n(a,i)))break}return t};

function countValueInArray(e,o$1){if(Array.isArray(e))return "object"===r__default['default'](o$1)?e.filter((function(e){return "object"===r__default['default'](e)&&o([e,o$1])})).length:e.filter((function(r){return r==o$1})).length;throw new Error("first parameter is not Array")}

var unmask = function unmask(textForMask, maskSettings) {
  var _ref = maskSettings || {},
      _ref$maskPattern = _ref.maskPattern,
      maskPattern = _ref$maskPattern === void 0 ? '' : _ref$maskPattern,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '_' : _ref$placeholder,
      regExpReplaceSymbol = '[',
      _getMaskSymbolsArray = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      maskSymbolsArray = _getMaskSymbolsArray.maskSymbolsArray,
      maskSymbolsCount = maskSymbolsArray.length,
      clearValueSymbolsArray = [];

  for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
    var maskSymbol = maskSymbolsArray[maskSymbolIndex],
        textSymbol = textForMask[maskSymbolIndex],
        isMaskPatternSymbol = textSymbol === maskSymbol,
        isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol;

    if (textSymbol) {
      //Пропускаем если это символ из маски(+, 7, и тд)
      if (isMaskPatternSymbol) {
        continue;
      }

      if (isMaskPatternRegExp && textSymbol !== placeholder) {
        clearValueSymbolsArray.push(textSymbol);
      }
    }
  }

  var clearValueText = clearValueSymbolsArray.join('');
  return clearValueText;
};
/**
 * @description
 * covering value to mask, relative settings
 *
 * @param {string} textForMaskInput - text for mask
 * @param {maskSettingsProps} maskSettings - setting for covering mask
 *
 * @returns {string}
 *
 * @example
 * function() // => true
 */


var mask = function mask(textForMaskInput, maskSettings) {
  var _ref2 = maskSettings || {},
      _ref2$maskPattern = _ref2.maskPattern,
      maskPattern = _ref2$maskPattern === void 0 ? '' : _ref2$maskPattern,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? '' : _ref2$placeholder,
      _ref2$inputCaretPosit = _ref2.inputCaretPositionIndex,
      inputCaretPositionIndex = _ref2$inputCaretPosit === void 0 ? 0 : _ref2$inputCaretPosit,
      _ref2$prevValue = _ref2.prevValue,
      prevValue = _ref2$prevValue === void 0 ? '' : _ref2$prevValue,
      hasPlaceholder = placeholder,
      regExpReplaceSymbol = '[',
      regExpRemoveSymbol = ']',
      _getMaskSymbolsArray2 = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      regExpsArray = _getMaskSymbolsArray2.regExpsArray,
      maskSymbolsArray = _getMaskSymbolsArray2.maskSymbolsArray,
      maskPatternString = replaceAllPatternRegExpsToPlaceholder(_toConsumableArray__default['default'](maskSymbolsArray), placeholder, regExpReplaceSymbol).join(''),
      maskSymbolsCount = maskSymbolsArray.length;

  if (hasPlaceholder) {
    var prevValueLength = prevValue.length,
        newValueLength = textForMaskInput.length,
        isInputAction = newValueLength > prevValueLength,
        isDeleteAction = newValueLength < prevValueLength,
        isReplaceAction = prevValueLength === newValueLength,
        unmaskedPrevValue = unmask(prevValue, maskSettings),
        prevValueMaskSymbolsArray = _toConsumableArray__default['default'](prevValue.split('')),
        newValueMaskSymbolsArray = textForMaskInput.split(''),
        maskResultSymbolsArray = _toConsumableArray__default['default'](maskSymbolsArray);

    var textSymbolsArrayForMask = _toConsumableArray__default['default'](prevValueMaskSymbolsArray);

    if (isInputAction) {
      var lengthDifference = newValueLength - prevValueLength,
          wasInputSingleSymbol = lengthDifference === 1,
          wasInputManySymbols = lengthDifference > 1;

      if (wasInputSingleSymbol) {
        var inputCaretPositionBeforeChangeText = inputCaretPositionIndex > 0 ? inputCaretPositionIndex - 1 : 0,
            inputSymbol = newValueMaskSymbolsArray[inputCaretPositionBeforeChangeText],
            firstRegExpSymbolIndexAfterCaret = getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, regExpsArray, regExpReplaceSymbol, inputCaretPositionBeforeChangeText),
            quantitySymbolForDeleteAfterCaret = firstRegExpSymbolIndexAfterCaret === inputCaretPositionBeforeChangeText ? 0 : 1;
        textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText, quantitySymbolForDeleteAfterCaret, inputSymbol);
      } else if (wasInputManySymbols) {
        var _inputCaretPositionBeforeChangeText = inputCaretPositionIndex - lengthDifference,
            _firstRegExpSymbolIndexAfterCaret = getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, regExpsArray, regExpReplaceSymbol, _inputCaretPositionBeforeChangeText);

        clearRedundantPlaceholderAfterInputText(textSymbolsArrayForMask, prevValueMaskSymbolsArray, newValueMaskSymbolsArray, _inputCaretPositionBeforeChangeText, _firstRegExpSymbolIndexAfterCaret, placeholder, lengthDifference);
      }
    } else if (isDeleteAction) {
      var _lengthDifference = prevValueLength - newValueLength,
          deletedSymbols = _toConsumableArray__default['default'](prevValueMaskSymbolsArray).slice(inputCaretPositionIndex, inputCaretPositionIndex + _lengthDifference).join(''),
          prevValueMaskSymbolsArrayWithDeleteRegExp = _toConsumableArray__default['default'](newValueMaskSymbolsArray);
      /**
       * replace deleted symbols to regExpRemoveSymbol
       */


      deletedSymbols.split('').forEach(function (_, index) {
        prevValueMaskSymbolsArrayWithDeleteRegExp.splice(inputCaretPositionIndex + index, 0, regExpRemoveSymbol);
      });
      /**
       * replace regExpRemoveSymbols, to maskPattern symbols
       */

      prevValueMaskSymbolsArrayWithDeleteRegExp.forEach(function (prevValueSymbol, index) {
        var maskSymbol = maskSymbolsArray[index],
            isRegExpForRemoveSymbol = prevValueSymbol === regExpRemoveSymbol;

        if (isRegExpForRemoveSymbol) {
          prevValueMaskSymbolsArrayWithDeleteRegExp[index] = maskSymbol === regExpReplaceSymbol ? placeholder : maskSymbol;
        }
      });
      textSymbolsArrayForMask = prevValueMaskSymbolsArrayWithDeleteRegExp;
    } else if (isReplaceAction) {
      textSymbolsArrayForMask = newValueMaskSymbolsArray;
    }

    if (!isDeleteAction) {
      var textSymbolIndex = 0,
          regExpsArrayForMask = _toConsumableArray__default['default'](regExpsArray),
          patternSymbols = [];

      for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount;) {
        var maskSymbol = maskSymbolsArray[maskSymbolIndex],
            textSymbol = textSymbolsArrayForMask[textSymbolIndex],
            isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
            isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol;

        if (isMaskSymbolPattern) {
          maskSymbolIndex++;
          patternSymbols.push(maskSymbol);

          if (textSymbol === maskSymbol) {
            textSymbolIndex++;
          }
        } else if (isMaskSymbolRegExp) {
          var maskRegExp = regExpsArrayForMask[0],
              regExp = maskRegExp ? new RegExp(maskRegExp) : null;

          if (regExp && regExp.test(textSymbol)) {
            regExpsArrayForMask.pop();
            maskResultSymbolsArray[maskSymbolIndex] = textSymbol;
            maskSymbolIndex++;
            textSymbolIndex++;
          } else if (textSymbol === placeholder) {
            maskResultSymbolsArray[maskSymbolIndex] = placeholder;
            maskSymbolIndex++;
            textSymbolIndex++;
          } else if (prevValueMaskSymbolsArray[textSymbolIndex] === placeholder) {
            maskResultSymbolsArray[maskSymbolIndex] = placeholder;
            maskSymbolIndex++;
            textSymbolIndex++;
          } else if (isReplaceAction && !patternSymbols.includes(textSymbol)) {
            maskResultSymbolsArray[maskSymbolIndex] = prevValueMaskSymbolsArray[textSymbolIndex];
            maskSymbolIndex++;
            textSymbolIndex++;
          } else {
            maskResultSymbolsArray[maskSymbolIndex] = placeholder;
            textSymbolIndex++;
          }

          if (textSymbolIndex > newValueLength) {
            break;
          }
        }
      }

      textSymbolsArrayForMask = replaceAllPatternRegExpsToPlaceholder(maskResultSymbolsArray, placeholder, regExpReplaceSymbol);
    }

    var maskedValue = textSymbolsArrayForMask.join(''),
        unmaskedValue = unmask(maskedValue, maskSettings),
        newCaretPosition = getNewCaretPosition(isDeleteAction, maskSymbolsArray, textSymbolsArrayForMask, regExpReplaceSymbol, inputCaretPositionIndex, placeholder, maskedValue, maskPatternString, newValueLength);
    return {
      maskedValue: maskedValue,
      unmaskedValue: unmaskedValue,
      unmaskedPrevValue: unmaskedPrevValue,
      newCaretPosition: newCaretPosition
    };
  } else {
    var _textSymbolIndex = 0,
        maskSymbolsArrayToOutPut = _toConsumableArray__default['default'](maskSymbolsArray),
        lastMaskRegExpSymbolIndex = 0;

    for (var _maskSymbolIndex = 0; _maskSymbolIndex < maskSymbolsCount; _maskSymbolIndex++) {
      var _maskSymbol = maskSymbolsArray[_maskSymbolIndex],
          _textSymbol = textForMaskInput[_textSymbolIndex],
          remainderMaskRegExpCount = countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
          isMaskPatternSymbol = _textSymbol === _maskSymbol,
          isMaskPatternRegExp = _maskSymbol === regExpReplaceSymbol,
          wasAllTextSymbolsUsed = !_textSymbol,
          endSliceIndex = lastMaskRegExpSymbolIndex > 0 ? lastMaskRegExpSymbolIndex + 1 : 0;

      if (_textSymbol) {
        //Пропускаем если это символ из маски(+, 7, и тд)
        if (isMaskPatternSymbol) {
          _textSymbolIndex++;
          continue;
        }

        if (isMaskPatternRegExp) {
          var _maskRegExp = regExpsArray.pop(),
              _regExp = _maskRegExp ? new RegExp(_maskRegExp) : null;

          if (_regExp && _regExp.test(_textSymbol)) {
            maskSymbolsArrayToOutPut[_maskSymbolIndex] = _textSymbol;
          } else {
            maskSymbolsArrayToOutPut = maskSymbolsArrayToOutPut.slice(0, endSliceIndex);
            break;
          }

          _textSymbolIndex++;
        }
      } else if (wasAllTextSymbolsUsed) {
        /**
         * Если был заполнен последний RegExp патерна, не обрезать остаток шаблона
         */
        if (remainderMaskRegExpCount > 0) {
          maskSymbolsArrayToOutPut = maskSymbolsArrayToOutPut.slice(0, _maskSymbolIndex);
          break;
        }
      }

      lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? _maskSymbolIndex : lastMaskRegExpSymbolIndex;
    }

    var _maskedValue = maskSymbolsArrayToOutPut.join(''),
        _unmaskedValue = unmask(_maskedValue, maskSettings);

    return {
      maskedValue: _maskedValue,
      unmaskedValue: _unmaskedValue
    };
  }
};

exports.mask = mask;
exports.unmask = unmask;
