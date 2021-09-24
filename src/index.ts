import countValueInArray from 'count-value-in-array';
import {Mask, Unmask, maskSettingsProps} from './types'

import {replaceAllPatternRegExpsToPlaceholder} from '@helpers/replace-all-pattern-reg-exp-to-placeholder'
import {getMaskSymbolsArray} from '@helpers/get-mask-symbols-array'

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
const mask:Mask = (textForMask, maskSettings) => {
    const {maskPattern = '', placeholder = ''} = maskSettings || {},
        regExpReplaceSymbol = '[',
        hasPlaceholder = placeholder,
        {regExpsArray, maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
        maskSymbolsCount = maskSymbolsArray.length

    let textSymbolIndex = 0,
        maskSymbolsArrayToOutPut = [...maskSymbolsArray],
        lastMaskRegExpSymbolIndex = 0

    for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
            textSymbol = textForMask[textSymbolIndex],
            remainderMaskRegExpCount = countValueInArray(maskSymbolsArrayToOutPut, regExpReplaceSymbol),
            isMaskPatternSymbol = textSymbol === maskSymbol,
            isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol,
            wasAllTextSymbolsUsed = !textSymbol,
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
                    maskSymbolsArrayToOutPut = hasPlaceholder ? replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) : maskSymbolsArrayToOutPut.slice(0, endSliceIndex)
                    break
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

