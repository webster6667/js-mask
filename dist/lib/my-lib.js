(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/esm/toConsumableArray'), require('@babel/runtime/helpers/typeof')) :
    typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/esm/toConsumableArray', '@babel/runtime/helpers/typeof'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myLib = {}, global._toConsumableArray, global.r));
}(this, (function (exports, _toConsumableArray, r) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
    var r__default = /*#__PURE__*/_interopDefaultLegacy(r);

    function e(r,e){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!n){if(Array.isArray(r)||(n=function(r,e){if(!r)return;if("string"==typeof r)return t(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(r);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(r,e)}(r))||e&&r&&"number"==typeof r.length){n&&(r=n);var o=0,a=function(){};return {s:a,n:function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function(r){throw r},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,f=!0,c=!1;return {s:function(){n=n.call(r);},n:function(){var r=n.next();return f=r.done,r},e:function(r){c=!0,i=r;},f:function(){try{f||null==n.return||n.return();}finally{if(c)throw i}}}}function t(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var n=function t(n,o){var a=!0;if(n&&o){if(!("object"===r__default['default'](n)&&"object"===r__default['default'](o)))return !1;var i=Object.keys(n),f=Object.keys(o);if(i.length===f.length){var c,u=e(i);try{for(u.s();!(c=u.n()).done;){var l=c.value,b=n[l];if(!Object.hasOwnProperty.call(o,l)){a=!1;break}var s=o[l];if("object"===r__default['default'](b)&&"object"===r__default['default'](s)){if(!t(b,s)){a=!1;break}}else if(s!=b){a=!1;break}}}catch(r){u.e(r);}finally{u.f();}}else a=!1;}else a=!1;return a},o=function(e){var t=!0;if(!Array.isArray(e))throw new Error("compared object must be in array");for(var o=0;;o++){var a=e[o],i=e[o+1];if(!a||!i){if("object"!==r__default['default'](a))throw new Error("type of compared items must be object");break}if(!("object"===r__default['default'](a)&&"object"===r__default['default'](i)))throw new Error("type of compared items must be object");if(!1===(t=n(a,i)))break}return t};

    function countValueInArray(e,o$1){if(Array.isArray(e))return "object"===r__default['default'](o$1)?e.filter((function(e){return "object"===r__default['default'](e)&&o([e,o$1])})).length:e.filter((function(r){return r==o$1})).length;throw new Error("first parameter is not Array")}

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
          regExpReplaceSymbol = '[',
          hasPlaceholder = placeholder,
          _getMaskSymbolsArray = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          regExpsArray = _getMaskSymbolsArray.regExpsArray,
          maskSymbolsArray = _getMaskSymbolsArray.maskSymbolsArray,
          maskSymbolsCount = maskSymbolsArray.length;

      var textForMask = textForMaskInput.split(''),
          textSymbolIndex = 0,
          maskSymbolsArrayToOutPut = _toConsumableArray__default['default'](maskSymbolsArray),
          lastMaskRegExpSymbolIndex = 0;
      /**
       * Проблема с лишним символом _ перед вводимым символом +
       */


      if (textForMask.length > maskSymbolsArray.length) {
        var different = textForMask.length - maskSymbolsArray.length;

        for (var startIndex = 0; startIndex < different; startIndex++) {
          var symbolIndexForRemove = selectionStart + startIndex,
              symbolForRemove = textForMask[symbolIndexForRemove];

          if (symbolForRemove === placeholder) {
            textForMask.splice(symbolIndexForRemove, different);
          }
        }
      }
      /**
       * Теперь проблема с переполнением
       */
      //Перебор символов маски +7(___)___-__-__


      for (var maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
        //Символ текущего шага из маски +7(___)___-__-__
        var maskSymbol = maskSymbolsArray[maskSymbolIndex],
            //Символ из введенного текста +7(123)___-__-__
        textSymbol = textForMask[textSymbolIndex],
            //Кол-во не заполненных символов в маске
        remainderMaskRegExpCount = countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
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
          maskSymbolsArrayToOutPut = _toConsumableArray__default['default'](maskSymbolsArray),
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

    exports.mask = mask;
    exports.unmask = unmask;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
