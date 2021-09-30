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

      if (regExp && regExp.test(textSymbol) && maskSymbolIndex > inputCaretPositionBeforeChangeText) {
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

  textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText, 0, inputSymbols.join(''));
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
      var hasPlaceholder = placeholder,
      regExpReplaceSymbol = hasPlaceholder ? placeholder : '[',
      _getMaskSymbolsArray2 = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      regExpsArray = _getMaskSymbolsArray2.regExpsArray,
      maskSymbolsArray = _getMaskSymbolsArray2.maskSymbolsArray;
      maskSymbolsArray.join('');
      var maskSymbolsCount = maskSymbolsArray.length;

  var prevValueLength = prevValue.length,
      newValueLength = textForMaskInput.length,
      isInputAction = newValueLength > prevValueLength,
      // unmaskedPrevValue = unmask(prevValue, maskSettings),
  // textForMaskSymbolsArrayTest = [...textForMaskSymbolsArray],  
  prevValueMaskSymbolsArray = _toConsumableArray(prevValue.split('')),
      newValueMaskSymbolsArray = textForMaskInput.split(''),
      textSymbolsArrayForMask = _toConsumableArray(prevValueMaskSymbolsArray),
      maskResultSymbolsArray = _toConsumableArray(maskSymbolsArray);

  if (isInputAction) {
    var lengthDifference = newValueLength - prevValueLength,
        wasInputSingleSymbol = lengthDifference === 1,
        wasInputManySymbols = lengthDifference > 1;

    if (wasInputSingleSymbol) {
      var inputCaretPositionBeforeChangeText = inputCaretPositionIndex - 1,
          inputSymbol = newValueMaskSymbolsArray[inputCaretPositionBeforeChangeText];
      textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText, 1, inputSymbol);
    } else if (wasInputManySymbols) {
      /**
       * Если что, искать изьян тут(не четкие числа...)
       */
      var _inputCaretPositionBeforeChangeText = inputCaretPositionIndex - lengthDifference,
          firstRegExpSymbolIndexAfterCaret = getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, regExpsArray, regExpReplaceSymbol, _inputCaretPositionBeforeChangeText);

      clearRedundantPlaceholderAfterInputText(textSymbolsArrayForMask, prevValueMaskSymbolsArray, newValueMaskSymbolsArray, _inputCaretPositionBeforeChangeText, firstRegExpSymbolIndexAfterCaret, placeholder, lengthDifference); // regExpsArrayForSearch = [...regExpsArray]
      // /**
      //  * Находим первый валидный regExp символ после каретки
      //  */
      // maskSymbolsArray.forEach((maskSymbol, maskSymbolIndex) => {
      //     const textSymbol = prevValueMaskSymbolsArray[maskSymbolIndex],
      //           isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol
      //
      //     if (isMaskPatternRegExp) {
      //         const maskRegExp = regExpsArrayForSearch.pop(),
      //               regExp = maskRegExp ? new RegExp(maskRegExp) : null
      //
      //         if (regExp && regExp.test(textSymbol) && maskSymbolIndex > inputCaretPositionBeforeChangeText) {
      //             firstRegExpSymbolIndexAfterCaret = maskSymbolIndex
      //         }
      //
      //     }
      //
      // })
      // const finishPreValueIndexForSearchPlaceholder = firstRegExpSymbolIndexAfterCaret > 0 ? firstRegExpSymbolIndexAfterCaret : prevValueMaskSymbolsArray.length
      //
      //
      //
      // /**
      //  * Теперь нужно перебрать preValue символы, начиная с каретки, заканчивая firstRegExpSymbolIndexAfterCaret,
      //  * И удалить lengthDifference плейсхолдер
      //  */
      //
      // let deletedPlaceholderCount = 0
      //
      //
      // for (let preValueIndex = inputCaretPositionBeforeChangeText; preValueIndex < finishPreValueIndexForSearchPlaceholder; preValueIndex++) {
      //     const preValueSymbol = prevValueMaskSymbolsArray[preValueIndex]
      //
      //     if (preValueSymbol === placeholder && deletedPlaceholderCount < lengthDifference) {
      //         deletedPlaceholderCount++
      //         textSymbolsArrayForMask.splice((preValueIndex + 1) - deletedPlaceholderCount, 1)
      //     }
      //
      // }
      //
      //
      // textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText, 0, inputSymbols.join(''))
    }
  } // console.log('для перебора',textSymbolsArrayForMask.join(''));


  var textSymbolIndexN = 0,
      regExpsArrayForMask = _toConsumableArray(regExpsArray); // maskSymbolsArrayToOutPutNew = [...maskSymbolsArray]


  console.log('Маск', maskResultSymbolsArray.join(''));
  console.log('для перебора', textSymbolsArrayForMask.join(''));

  for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount;) {
    var maskSymbol = maskSymbolsArray[maskSymbolIndex],
        textSymbol = textSymbolsArrayForMask[textSymbolIndexN],
        isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
        isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol;

    if (isMaskSymbolPattern) {
      maskSymbolIndex++;

      if (textSymbol === maskSymbol) {
        textSymbolIndexN++;
      }
    } else if (isMaskSymbolRegExp) {
      var maskRegExp = regExpsArrayForMask.pop(),
          regExp = maskRegExp ? new RegExp(maskRegExp) : null;

      if (regExp && regExp.test(textSymbol)) {
        maskResultSymbolsArray[maskSymbolIndex] = textSymbol;
        maskSymbolIndex++;
        textSymbolIndexN++;
      } else if (textSymbol === placeholder) {
        maskResultSymbolsArray[maskSymbolIndex] = placeholder;
        maskSymbolIndex++;
        textSymbolIndexN++;
      } else {
        textSymbolIndexN++;
      }

      if (textSymbolIndexN > newValueLength) {
        break;
      }
    }
  }

  console.log('смерджено', maskResultSymbolsArray.join('')); // if (placeholder) {
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

  /**
   * old
   */

  var textForMaskSymbolsArray = textForMaskInput.split(''),
      textSymbolIndex = 0,
      maskSymbolsArrayToOutPut = _toConsumableArray(maskSymbolsArray),
      lastMaskRegExpSymbolIndex = 0,
      textForMask = '';

  textForMask = textForMaskSymbolsArray.join(''); //Перебор символов маски +7(___)___-__-__

  for (var _maskSymbolIndex = 0; _maskSymbolIndex < maskSymbolsCount; _maskSymbolIndex++) {
    //Символ текущего шага из маски +7(___)___-__-__
    var _maskSymbol = maskSymbolsArray[_maskSymbolIndex],
        //Символ из введенного текста +7(123)___-__-__
    _textSymbol = textForMask[textSymbolIndex],
        //Кол-во не заполненных символов в маске
    remainderMaskRegExpCount = regExpsArray.length,
        // countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
    //Проверка на то что перебираемый символ является частью маски(+, 7, ()
    isMaskPatternSymbol = _textSymbol === _maskSymbol,
        //Проверка на то что перебираемый символ, является символом регялрного выражения
    isMaskPatternRegExp = _maskSymbol === regExpReplaceSymbol,
        //Проверка на то что все символы текста для маски перебрали
    wasAllTextSymbolsUsed = !_textSymbol,
        //Индекс символа до которого нужно обрезать лишний текст
    endSliceIndex = lastMaskRegExpSymbolIndex > 0 ? lastMaskRegExpSymbolIndex + 1 : 0;

    if (_textSymbol) {
      //Пропускаем если это символ из маски(+, 7, и тд)
      if (isMaskPatternSymbol) {
        textSymbolIndex++;
        continue;
      }

      if (isMaskPatternRegExp) {
        var _maskRegExp = regExpsArray.pop(),
            _regExp = _maskRegExp ? new RegExp(_maskRegExp) : null;

        if (_regExp && _regExp.test(_textSymbol)) {
          maskSymbolsArrayToOutPut[_maskSymbolIndex] = _textSymbol;
        } else {
          if (hasPlaceholder) {
            maskSymbolsArrayToOutPut[_maskSymbolIndex] = placeholder;
          } else {
            maskSymbolsArrayToOutPut.slice(0, endSliceIndex);
            break;
          }
        }

        textSymbolIndex++;
      }
    } else if (wasAllTextSymbolsUsed) {
      /**
       * Если был заполнен последний RegExp патерна, не обрезать остаток шаблона
       */
      if (remainderMaskRegExpCount > 0) {
        maskSymbolsArrayToOutPut = hasPlaceholder ? replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) : maskSymbolsArrayToOutPut.slice(0, _maskSymbolIndex);
        break;
      }
    }

    lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? _maskSymbolIndex : lastMaskRegExpSymbolIndex;
  }

  return maskSymbolsArrayToOutPut.join('');
}; // const unmask:Unmask = (textForMask, maskSettings) => {

export { mask, unmask };
