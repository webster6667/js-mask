(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/esm/toConsumableArray')) :
    typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/esm/toConsumableArray'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myLib = {}, global._toConsumableArray));
}(this, (function (exports, _toConsumableArray) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

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
     * Найти индекс первого заполненного символа маски, после каретки
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

          if (regExp && regExp.test(textSymbol) && maskSymbolIndex >= inputCaretPositionBeforeChangeText) {
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

    // import {fixMaskSectionOverflow} from '@helpers/fix-mask-section-overflow'
    // import {replaceDeletedSymbols} from '@helpers/replace-deleted-symbols'

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
     * @param {string} textForMask - text for mask
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
          prevValue = _ref2$prevValue === void 0 ? '' : _ref2$prevValue;
          _ref2.handleEventInput;
          var regExpReplaceSymbol = '[',
          regExpRemoveSymbol = ']',
          _getMaskSymbolsArray2 = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          regExpsArray = _getMaskSymbolsArray2.regExpsArray,
          maskSymbolsArray = _getMaskSymbolsArray2.maskSymbolsArray,
          maskSymbolsCount = maskSymbolsArray.length;

      var prevValueLength = prevValue.length,
          newValueLength = textForMaskInput.length,
          isInputAction = newValueLength > prevValueLength,
          isDeleteAction = newValueLength < prevValueLength,
          // unmaskedPrevValue = unmask(prevValue, maskSettings),
      // textForMaskSymbolsArrayTest = [...textForMaskSymbolsArray],  
      prevValueMaskSymbolsArray = _toConsumableArray__default['default'](prevValue.split('')),
          newValueMaskSymbolsArray = textForMaskInput.split(''),
          textSymbolsArrayForMask = _toConsumableArray__default['default'](prevValueMaskSymbolsArray),
          maskResultSymbolsArray = _toConsumableArray__default['default'](maskSymbolsArray);

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
          /**
           * Если что, искать изьян тут(не четкие числа...)
           */
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
        return prevValueMaskSymbolsArrayWithDeleteRegExp.join('');
      }

      var textSymbolIndex = 0,
          regExpsArrayForMask = _toConsumableArray__default['default'](regExpsArray);

      for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount;) {
        var maskSymbol = maskSymbolsArray[maskSymbolIndex],
            textSymbol = textSymbolsArrayForMask[textSymbolIndex],
            isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
            isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol;

        if (isMaskSymbolPattern) {
          maskSymbolIndex++;

          if (textSymbol === maskSymbol) {
            textSymbolIndex++;
          }
        } else if (isMaskSymbolRegExp) {
          var maskRegExp = regExpsArrayForMask.pop(),
              regExp = maskRegExp ? new RegExp(maskRegExp) : null;

          if (regExp && regExp.test(textSymbol)) {
            maskResultSymbolsArray[maskSymbolIndex] = textSymbol;
            maskSymbolIndex++;
            textSymbolIndex++;
          } else if (textSymbol === placeholder) {
            maskResultSymbolsArray[maskSymbolIndex] = placeholder;
            maskSymbolIndex++;
            textSymbolIndex++;
          } else {
            textSymbolIndex++;
          }

          if (textSymbolIndex > newValueLength) {
            break;
          }
        }
      }

      var maskedResultString = replaceAllPatternRegExpsToPlaceholder(maskResultSymbolsArray, placeholder, regExpReplaceSymbol).join('');
      return maskedResultString;
    }; // const unmask:Unmask = (textForMask, maskSettings) => {

    exports.mask = mask;
    exports.unmask = unmask;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
