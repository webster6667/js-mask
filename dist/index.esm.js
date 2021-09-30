import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';

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
  var regExpsArray = _toConsumableArray(commonRegExpsArray);

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
      _getMaskSymbolsArray2 = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      regExpsArray = _getMaskSymbolsArray2.regExpsArray,
      maskSymbolsArray = _getMaskSymbolsArray2.maskSymbolsArray,
      maskSymbolsCount = maskSymbolsArray.length;

  var prevValueLength = prevValue.length,
      newValueLength = textForMaskInput.length,
      isInputAction = newValueLength > prevValueLength,
      // unmaskedPrevValue = unmask(prevValue, maskSettings),
  // textForMaskSymbolsArrayTest = [...textForMaskSymbolsArray],  
  prevValueMaskSymbolsArray = _toConsumableArray(prevValue.split('')),
      newValueMaskSymbolsArray = textForMaskInput.split(''),
      textSymbolsArrayForMask = _toConsumableArray(prevValueMaskSymbolsArray),
      maskResultSymbolsArray = _toConsumableArray(maskSymbolsArray); // console.log('newVal', newValueMaskSymbolsArray.join(''), 'prevVal', prevValueMaskSymbolsArray.join(''), 'для перебора', inputCaretPositionIndex);


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
  }

  var textSymbolIndex = 0,
      regExpsArrayForMask = _toConsumableArray(regExpsArray);

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
  return maskedResultString; // console.log('смерджено',maskResultSymbolsArray.join(''));
  // if (placeholder) {
  //
  //     if (textForMaskSymbolsArray.length > maskSymbolsArray.length) {
  //
  //         /**
  //          * Проблема с лишним символом _ перед вводимым символом
  //          */
  //         clearRedundantPlaceholder(textForMaskSymbolsArray, maskSymbolsArray, placeholder, selectionStart)
  //
  //         /**
  //          * Проблема с переполнением секции маски
  //          *
  //          * ___)-___-__-__
  //          * 12567)-_4_-__-__
  //          */
  //
  //         textForMaskSymbolsArray = fixMaskSectionOverflow(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder)
  //
  //
  //     /**
  //      * Смещение символов при стерании
  //      */
  //     } else if(textForMaskSymbolsArray.length > 1 && textForMaskSymbolsArray.length < maskSymbolsArray.length) {
  //
  //         replaceDeletedSymbols(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder, selectionStart, prevValue)
  //     }
  //
  //
  // }
  // textSymbolIndex = 0
  //
  // /**
  //  * old
  //  */
  // let textForMaskSymbolsArray = textForMaskInput.split(''),
  //     maskSymbolsArrayToOutPut = [...maskSymbolsArray],
  //     lastMaskRegExpSymbolIndex = 0,
  //     textForMask = ''
  //
  //
  // textForMask = textForMaskSymbolsArray.join('')
  //
  // //Перебор символов маски +7(___)___-__-__
  // for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
  //
  //
  //     //Символ текущего шага из маски +7(___)___-__-__
  //     const maskSymbol = maskSymbolsArray[maskSymbolIndex],
  //
  //           //Символ из введенного текста +7(123)___-__-__
  //           textSymbol = textForMask[textSymbolIndex],
  //
  //           //Кол-во не заполненных символов в маске
  //           remainderMaskRegExpCount = regExpsArray.length,
  //               // countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
  //
  //           //Проверка на то что перебираемый символ является частью маски(+, 7, ()
  //           isMaskPatternSymbol = textSymbol === maskSymbol,
  //
  //           //Проверка на то что перебираемый символ, является символом регялрного выражения
  //           isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol,
  //
  //           //Проверка на то что все символы текста для маски перебрали
  //           wasAllTextSymbolsUsed = !textSymbol,
  //
  //           //Индекс символа до которого нужно обрезать лишний текст
  //           endSliceIndex = lastMaskRegExpSymbolIndex > 0 ? lastMaskRegExpSymbolIndex + 1 : 0
  //
  //     if (textSymbol) {
  //
  //         //Пропускаем если это символ из маски(+, 7, и тд)
  //         if (isMaskPatternSymbol) {
  //             textSymbolIndex++
  //             continue
  //         }
  //
  //         if (isMaskPatternRegExp) {
  //             const maskRegExp = regExpsArray.pop(),
  //                   regExp = maskRegExp ? new RegExp(maskRegExp) : null
  //
  //             if (regExp && regExp.test(textSymbol)) {
  //                 maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol
  //             } else {
  //
  //
  //                 if (hasPlaceholder) {
  //                     maskSymbolsArrayToOutPut[maskSymbolIndex] = placeholder
  //                 } else {
  //                     maskSymbolsArrayToOutPut.slice(0, endSliceIndex)
  //                     break
  //                 }
  //
  //             }
  //
  //
  //             textSymbolIndex++
  //         }
  //
  //     } else if (wasAllTextSymbolsUsed) {
  //
  //         /**
  //          * Если был заполнен последний RegExp патерна, не обрезать остаток шаблона
  //          */
  //         if (remainderMaskRegExpCount > 0) {
  //             maskSymbolsArrayToOutPut = hasPlaceholder ? replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) : maskSymbolsArrayToOutPut.slice(0, maskSymbolIndex)
  //             break
  //         }
  //
  //     }
  //
  //
  //     lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex
  //
  // }
  //
  // return maskSymbolsArrayToOutPut.join('')
}; // const unmask:Unmask = (textForMask, maskSettings) => {

export { mask, unmask };
