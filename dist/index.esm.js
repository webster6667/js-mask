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
 * Clear redundant symbol _ after input symbols
 */
var clearRedundantPlaceholder = function clearRedundantPlaceholder(textForMaskSymbolsArray, maskSymbolsArray, placeholder, selectionStart) {
  var different = textForMaskSymbolsArray.length - maskSymbolsArray.length;

  for (var startIndex = 0; startIndex < different; startIndex++) {
    var symbolIndexForRemove = selectionStart + startIndex,
        symbolForRemove = textForMaskSymbolsArray[symbolIndexForRemove];

    if (symbolForRemove === placeholder) {
      textForMaskSymbolsArray.splice(symbolIndexForRemove, different);
    }
  }
};

/**
 * Fix textInput When mask section is overflow
 *
 * (___)-___-__-__
 * (12567)-_4_-__-__
 *
 */
var fixMaskSectionOverflow = function fixMaskSectionOverflow(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder) {
  var maskSymbolsCount = maskSymbolsArray.length,
      redundantMaskSectionsSymbolArray = [],
      maskSymbolsArrayForOverflow = _toConsumableArray(maskSymbolsArray);

  var textSymbolIndex = 0;

  for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount;) {
    var maskSymbol = maskSymbolsArray[maskSymbolIndex],
        textSymbol = textForMaskSymbolsArray[textSymbolIndex],
        isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
        isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol;

    if (isMaskSymbolPattern) {
      var isTextSymbolPattern = textSymbol === maskSymbol;

      if (isTextSymbolPattern) {
        textSymbolIndex++;
        maskSymbolIndex++;
      } else {
        redundantMaskSectionsSymbolArray.push(textSymbol);
        textSymbolIndex++;
      }
    } else if (isMaskSymbolRegExp) {
      var redundantMaskSectionsSymbolsExist = redundantMaskSectionsSymbolArray.length;

      if (redundantMaskSectionsSymbolsExist) {
        var textRedundantSymbol = redundantMaskSectionsSymbolArray.shift();
        maskSymbolsArrayForOverflow[maskSymbolIndex] = textRedundantSymbol;
        maskSymbolIndex++;

        if (textSymbol === placeholder) {
          textSymbolIndex++;
        }
      } else {
        maskSymbolsArrayForOverflow[maskSymbolIndex] = textSymbol;
        textSymbolIndex++;
        maskSymbolIndex++;
      }
    }
  }

  return maskSymbolsArrayForOverflow;
};

/**
 * Replace deleted symbols to placeholder or pattern
 */

var replaceDeletedSymbols = function replaceDeletedSymbols(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder, selectionStart, prevValue) {
  var prevSymbolAfterDeleted = maskSymbolsArray[selectionStart],
      isPrevSymbolPattern = prevSymbolAfterDeleted !== regExpReplaceSymbol && prevSymbolAfterDeleted !== '',
      symbolsLengthDifferent = maskSymbolsArray.length - textForMaskSymbolsArray.length;

  if (symbolsLengthDifferent === 1 && !isPrevSymbolPattern) {
    textForMaskSymbolsArray.splice(selectionStart, 0, placeholder);
  } else {
    var prevValueSymbolsArray = prevValue.split(''),
        deletedSymbols = prevValueSymbolsArray.slice(selectionStart, selectionStart + symbolsLengthDifferent).join(''),
        textForMaskSymbolsArrayForDetectedDuration = _toConsumableArray(textForMaskSymbolsArray);

    textForMaskSymbolsArrayForDetectedDuration.splice(selectionStart, 0, deletedSymbols);

    var duration = textForMaskSymbolsArrayForDetectedDuration.join('') === prevValue ? 'ltr' : 'rtl',
        maskSymbolsArrayForMaskPatternCreate = _toConsumableArray(maskSymbolsArray),
        maskPatternSymbolArray = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayForMaskPatternCreate, placeholder, regExpReplaceSymbol),
        symbolsArrayForReplaceDeleted = duration === 'ltr' ? maskPatternSymbolArray.slice(selectionStart, selectionStart + symbolsLengthDifferent).join('') : maskPatternSymbolArray.slice(selectionStart - symbolsLengthDifferent, selectionStart).join('');

    textForMaskSymbolsArray.splice(selectionStart, 0, symbolsArrayForReplaceDeleted);
  }
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
  var _ref = maskSettings || {},
      _ref$maskPattern = _ref.maskPattern,
      maskPattern = _ref$maskPattern === void 0 ? '' : _ref$maskPattern,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      _ref$selectionStart = _ref.selectionStart,
      selectionStart = _ref$selectionStart === void 0 ? 0 : _ref$selectionStart,
      _ref$prevValue = _ref.prevValue,
      prevValue = _ref$prevValue === void 0 ? '' : _ref$prevValue;
      _ref.handleEventInput;
      var regExpReplaceSymbol = '[',
      hasPlaceholder = placeholder,
      _getMaskSymbolsArray = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      regExpsArray = _getMaskSymbolsArray.regExpsArray,
      maskSymbolsArray = _getMaskSymbolsArray.maskSymbolsArray,
      maskSymbolsCount = maskSymbolsArray.length;

  var textForMaskSymbolsArray = textForMaskInput.split(''),
      textSymbolIndex = 0,
      maskSymbolsArrayToOutPut = _toConsumableArray(maskSymbolsArray),
      lastMaskRegExpSymbolIndex = 0,
      textForMask = '';

  if (placeholder) {
    if (textForMaskSymbolsArray.length > maskSymbolsArray.length) {
      /**
       * Проблема с лишним символом _ перед вводимым символом
       */
      clearRedundantPlaceholder(textForMaskSymbolsArray, maskSymbolsArray, placeholder, selectionStart);
      /**
       * Проблема с переполнением секции маски
       *
       * ___)-___-__-__
       * 12567)-_4_-__-__
       */

      textForMaskSymbolsArray = fixMaskSectionOverflow(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder);
      /**
       * Смещение символов при стерании
       */
    } else if (textForMaskSymbolsArray.length > 1 && textForMaskSymbolsArray.length < maskSymbolsArray.length) {
      replaceDeletedSymbols(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder, selectionStart, prevValue);
    }
  }

  textForMask = textForMaskSymbolsArray.join(''); //Перебор символов маски +7(___)___-__-__

  for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
    //Символ текущего шага из маски +7(___)___-__-__
    var maskSymbol = maskSymbolsArray[maskSymbolIndex],
        //Символ из введенного текста +7(123)___-__-__
    textSymbol = textForMask[textSymbolIndex],
        //Кол-во не заполненных символов в маске
    remainderMaskRegExpCount = regExpsArray.length,
        // countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
    //Проверка на то что перебираемый символ является частью маски(+, 7, ()
    isMaskPatternSymbol = textSymbol === maskSymbol,
        //Проверка на то что перебираемый символ, является символом регялрного выражения
    isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol,
        //Проверка на то что все символы текста для маски перебрали
    wasAllTextSymbolsUsed = !textSymbol,
        //Индекс символа до которого нужно обрезать лишний текст
    endSliceIndex = lastMaskRegExpSymbolIndex > 0 ? lastMaskRegExpSymbolIndex + 1 : 0;

    if (textSymbol) {
      //Пропускаем если это символ из маски(+, 7, и тд)
      if (isMaskPatternSymbol) {
        textSymbolIndex++;
        continue;
      }

      if (isMaskPatternRegExp) {
        var maskRegExp = regExpsArray.pop(),
            regExp = maskRegExp ? new RegExp(maskRegExp) : null;

        if (regExp && regExp.test(textSymbol)) {
          maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol;
        } else {
          if (hasPlaceholder) {
            maskSymbolsArrayToOutPut[maskSymbolIndex] = placeholder;
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
        maskSymbolsArrayToOutPut = hasPlaceholder ? replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) : maskSymbolsArrayToOutPut.slice(0, maskSymbolIndex);
        break;
      }
    }

    lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex;
  }

  return maskSymbolsArrayToOutPut.join('');
};

var unmask = function unmask(textForMask, maskSettings) {
  var _ref2 = maskSettings || {},
      _ref2$maskPattern = _ref2.maskPattern,
      maskPattern = _ref2$maskPattern === void 0 ? '' : _ref2$maskPattern,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? '_' : _ref2$placeholder,
      regExpReplaceSymbol = '[',
      _getMaskSymbolsArray2 = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
      regExpsArray = _getMaskSymbolsArray2.regExpsArray,
      maskSymbolsArray = _getMaskSymbolsArray2.maskSymbolsArray,
      maskSymbolsCount = maskSymbolsArray.length,
      firstRegExpSymbolOnStart = maskSymbolsArray.indexOf(regExpReplaceSymbol),
      patterBeforeRegExpSymbol = firstRegExpSymbolOnStart != -1 ? maskSymbolsArray.slice(0, firstRegExpSymbolOnStart).join('') : '';

  var textSymbolIndex = 0,
      maskSymbolsArrayToOutPut = _toConsumableArray(maskSymbolsArray),
      lastMaskRegExpSymbolIndex = 0,
      clearValueSymbolsArray = [],
      remainderMaskPatternSymbolsArray = [];

  for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
    var maskSymbol = maskSymbolsArray[maskSymbolIndex],
        textSymbol = textForMask[textSymbolIndex],
        isMaskPatternSymbol = textSymbol === maskSymbol,
        isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol,
        wasAllTextSymbolsUsed = !textSymbol,
        startSlideIndex = clearValueSymbolsArray.length === 0 ? 0 : maskSymbolIndex,
        endSliceIndex = maskSymbolsArrayToOutPut.length;

    if (textSymbol) {
      //Пропускаем если это символ из маски(+, 7, и тд)
      if (isMaskPatternSymbol) {
        textSymbolIndex++;
        continue;
      }

      if (isMaskPatternRegExp) {
        var maskRegExp = regExpsArray.pop(),
            regExp = maskRegExp ? new RegExp(maskRegExp) : null;

        if (regExp && regExp.test(textSymbol)) {
          maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol;
          clearValueSymbolsArray.push(textSymbol);
        } else {
          maskSymbolsArrayToOutPut = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol);
          remainderMaskPatternSymbolsArray = maskSymbolsArrayToOutPut.slice(startSlideIndex, endSliceIndex);
          break;
        }

        textSymbolIndex++;
      }
    } else if (wasAllTextSymbolsUsed) {
      maskSymbolsArrayToOutPut = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol);
      remainderMaskPatternSymbolsArray = maskSymbolsArrayToOutPut.slice(startSlideIndex, endSliceIndex);
      break;
    }

    lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex;
  }

  var firstRegExpSymbolIndex = maskSymbolsArrayToOutPut.indexOf(placeholder),
      isRegExpFinished = firstRegExpSymbolIndex === -1;
  return {
    clearValue: clearValueSymbolsArray.join(''),
    remainderMaskPattern: remainderMaskPatternSymbolsArray.join(''),
    patterBeforeRegExpSymbol: patterBeforeRegExpSymbol,
    isRegExpFinished: isRegExpFinished,
    firstRegExpSymbolIndex: firstRegExpSymbolIndex,
    lastMaskRegExpSymbolIndex: lastMaskRegExpSymbolIndex
  };
};

export { mask, unmask };
