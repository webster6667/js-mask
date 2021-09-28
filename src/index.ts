import {Mask, Unmask, maskSettingsProps} from './types'

import {replaceAllPatternRegExpsToPlaceholder} from '@helpers/replace-all-pattern-reg-exp-to-placeholder'
import {getMaskSymbolsArray} from '@helpers/get-mask-symbols-array'
import {clearRedundantPlaceholder} from '@helpers/clear-redundant-placeholder'
import {fixMaskSectionOverflow} from '@helpers/fix-mask-section-overflow'
import {replaceDeletedSymbols} from '@helpers/replace-deleted-symbols'


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
const mask:Mask = (textForMaskInput, maskSettings) => {
    const {
            maskPattern = '',
            placeholder = '',
            selectionStart = 0,
            prevValue = '',
            handleEventInput = false
          } = maskSettings || {},
          regExpReplaceSymbol = '[',
          hasPlaceholder = placeholder,
          {regExpsArray, maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          maskSymbolsCount = maskSymbolsArray.length

    let textForMaskSymbolsArray = textForMaskInput.split(''),
        textSymbolIndex = 0,
        maskSymbolsArrayToOutPut = [...maskSymbolsArray],
        lastMaskRegExpSymbolIndex = 0,
        textForMask = ''

    if (placeholder) {

        if (textForMaskSymbolsArray.length > maskSymbolsArray.length) {

            /**
             * Проблема с лишним символом _ перед вводимым символом
             */
            clearRedundantPlaceholder(textForMaskSymbolsArray, maskSymbolsArray, placeholder, selectionStart)

            /**
             * Проблема с переполнением секции маски
             *
             * ___)-___-__-__
             * 12567)-_4_-__-__
             */

            textForMaskSymbolsArray = fixMaskSectionOverflow(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder)


        /**
         * Смещение символов при стерании
         */
        } else if(textForMaskSymbolsArray.length > 1 && textForMaskSymbolsArray.length < maskSymbolsArray.length) {

            replaceDeletedSymbols(textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder, selectionStart, prevValue)
        } 
        
        
    }

    textForMask = textForMaskSymbolsArray.join('')
    
    //Перебор символов маски +7(___)___-__-__
    for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {


        //Символ текущего шага из маски +7(___)___-__-__
        const maskSymbol = maskSymbolsArray[maskSymbolIndex],

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
              endSliceIndex = lastMaskRegExpSymbolIndex > 0 ? lastMaskRegExpSymbolIndex + 1 : 0

        if (textSymbol) {

            //Пропускаем если это символ из маски(+, 7, и тд)
            if (isMaskPatternSymbol) {
                textSymbolIndex++
                continue
            }

            if (isMaskPatternRegExp) {
                const maskRegExp = regExpsArray.pop(),
                      regExp = maskRegExp ? new RegExp(maskRegExp) : null

                if (regExp && regExp.test(textSymbol)) {
                    maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol
                } else {


                    if (hasPlaceholder) {
                        maskSymbolsArrayToOutPut[maskSymbolIndex] = placeholder
                    } else {
                        maskSymbolsArrayToOutPut.slice(0, endSliceIndex)
                        break
                    }

                }


                textSymbolIndex++
            }

        } else if (wasAllTextSymbolsUsed) {

            /**
             * Если был заполнен последний RegExp патерна, не обрезать остаток шаблона
             */
            if (remainderMaskRegExpCount > 0) {
                maskSymbolsArrayToOutPut = hasPlaceholder ? replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) : maskSymbolsArrayToOutPut.slice(0, maskSymbolIndex)
                break
            }

        }


        lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex

    }

    return maskSymbolsArrayToOutPut.join('')

}

const unmask:Unmask = (textForMask, maskSettings) => {
    const {maskPattern = '', placeholder = '_'} = maskSettings || {},
          regExpReplaceSymbol = '[',
          {regExpsArray, maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          maskSymbolsCount = maskSymbolsArray.length,
          firstRegExpSymbolOnStart = maskSymbolsArray.indexOf(regExpReplaceSymbol),
          patterBeforeRegExpSymbol = firstRegExpSymbolOnStart != -1 ? maskSymbolsArray.slice(0,firstRegExpSymbolOnStart).join('') : ''


        let textSymbolIndex = 0,
            maskSymbolsArrayToOutPut = [...maskSymbolsArray],
            lastMaskRegExpSymbolIndex = 0,
            clearValueSymbolsArray:string[] = [],
            remainderMaskPatternSymbolsArray:string[] = []



    for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
              textSymbol = textForMask[textSymbolIndex],
              isMaskPatternSymbol = textSymbol === maskSymbol,
              isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol,
              wasAllTextSymbolsUsed = !textSymbol,
              startSlideIndex = clearValueSymbolsArray.length === 0 ? 0 : maskSymbolIndex,
              endSliceIndex = maskSymbolsArrayToOutPut.length



        if (textSymbol) {

            //Пропускаем если это символ из маски(+, 7, и тд)
            if (isMaskPatternSymbol) {
                textSymbolIndex++
                continue
            }

            if (isMaskPatternRegExp) {
                const maskRegExp = regExpsArray.pop(),
                      regExp = maskRegExp ? new RegExp(maskRegExp) : null

                if (regExp && regExp.test(textSymbol)) {
                    maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol
                    clearValueSymbolsArray.push(textSymbol)
                } else {
                    maskSymbolsArrayToOutPut = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol)
                    remainderMaskPatternSymbolsArray = maskSymbolsArrayToOutPut.slice(startSlideIndex, endSliceIndex)
                    break
                }


                textSymbolIndex++
            }

        } else if (wasAllTextSymbolsUsed) {

            maskSymbolsArrayToOutPut = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol)
            remainderMaskPatternSymbolsArray = maskSymbolsArrayToOutPut.slice(startSlideIndex, endSliceIndex)
            break

        }


        lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex

    }

    let firstRegExpSymbolIndex = maskSymbolsArrayToOutPut.indexOf(placeholder),
        isRegExpFinished = firstRegExpSymbolIndex === -1
    
    return {
        clearValue: clearValueSymbolsArray.join(''),
        remainderMaskPattern: remainderMaskPatternSymbolsArray.join(''),
        patterBeforeRegExpSymbol,
        isRegExpFinished,
        firstRegExpSymbolIndex,
        lastMaskRegExpSymbolIndex,
    }

}


export {mask, unmask}

