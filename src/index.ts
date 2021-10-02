import {Mask, Unmask, maskSettingsProps} from './types'

import {replaceAllPatternRegExpsToPlaceholder} from '@helpers/replace-all-pattern-reg-exp-to-placeholder'
import {getMaskSymbolsArray} from '@helpers/get-mask-symbols-array'

import {getFirstFilledRegExpIndexAfterCaret} from '@helpers/get-first-filled-reg-exp-index-after-caret'
import {clearRedundantPlaceholderAfterInputText} from '@helpers/clear-redundant-placeholder-after-input-text'

import {getNewCaretPosition} from '@helpers/get-new-caret-position'

const unmask:Unmask = (textForMask, maskSettings) => {
    const {maskPattern = '', placeholder = '_'} = maskSettings || {},
          regExpReplaceSymbol = '[',
          {maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          maskSymbolsCount = maskSymbolsArray.length,
          clearValueSymbolsArray:string[] = []


    for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
              textSymbol = textForMask[maskSymbolIndex],
              isMaskPatternSymbol = textSymbol === maskSymbol,
              isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol



        if (textSymbol) {

            //Пропускаем если это символ из маски(+, 7, и тд)
            if (isMaskPatternSymbol) {
                continue
            }

            if (isMaskPatternRegExp && textSymbol !== placeholder) {
                clearValueSymbolsArray.push(textSymbol)
            }

        }

    }

    let clearValueText = clearValueSymbolsArray.join('')

    return clearValueText
}

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
const mask:Mask = (textForMaskInput, maskSettings) => {
    const {
            maskPattern = '',
            placeholder = '',
            inputCaretPositionIndex = 0,
            prevValue = '',
          } = maskSettings || {},
          hasPlaceholder = placeholder,
          regExpReplaceSymbol = '[',
          regExpRemoveSymbol = ']',
          {regExpsArray, maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          maskPatternString = replaceAllPatternRegExpsToPlaceholder([...maskSymbolsArray], placeholder, regExpReplaceSymbol).join(''),
          maskSymbolsCount = maskSymbolsArray.length

    if (hasPlaceholder) {

        const prevValueLength = prevValue.length,
            newValueLength = textForMaskInput.length,
            isInputAction = newValueLength > prevValueLength,
            isDeleteAction = newValueLength < prevValueLength,
            isReplaceAction = prevValueLength === newValueLength,


            unmaskedPrevValue = unmask(prevValue, maskSettings),
            prevValueMaskSymbolsArray = [...prevValue.split('')],
            newValueMaskSymbolsArray = textForMaskInput.split(''),
            maskResultSymbolsArray = [...maskSymbolsArray]

        let textSymbolsArrayForMask = [...prevValueMaskSymbolsArray]

        if (isInputAction) {

            const lengthDifference = newValueLength - prevValueLength,
                wasInputSingleSymbol = lengthDifference === 1,
                wasInputManySymbols = lengthDifference > 1


            if (wasInputSingleSymbol) {
                const inputCaretPositionBeforeChangeText =  inputCaretPositionIndex > 0 ? inputCaretPositionIndex-1 : 0,
                    inputSymbol = newValueMaskSymbolsArray[inputCaretPositionBeforeChangeText],
                    firstRegExpSymbolIndexAfterCaret = getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, regExpsArray, regExpReplaceSymbol, inputCaretPositionBeforeChangeText),
                    quantitySymbolForDeleteAfterCaret = firstRegExpSymbolIndexAfterCaret === inputCaretPositionBeforeChangeText ? 0 : 1

                textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText, quantitySymbolForDeleteAfterCaret, inputSymbol)

            } else if(wasInputManySymbols) {

                const inputCaretPositionBeforeChangeText = inputCaretPositionIndex - lengthDifference,
                    firstRegExpSymbolIndexAfterCaret = getFirstFilledRegExpIndexAfterCaret(maskSymbolsArray, prevValueMaskSymbolsArray, regExpsArray, regExpReplaceSymbol, inputCaretPositionBeforeChangeText)

                clearRedundantPlaceholderAfterInputText(textSymbolsArrayForMask, prevValueMaskSymbolsArray, newValueMaskSymbolsArray, inputCaretPositionBeforeChangeText, firstRegExpSymbolIndexAfterCaret, placeholder, lengthDifference)
            }

        } else if(isDeleteAction) {

            const lengthDifference = prevValueLength - newValueLength,
                deletedSymbols = [...prevValueMaskSymbolsArray].slice(inputCaretPositionIndex, inputCaretPositionIndex + lengthDifference).join(''),
                prevValueMaskSymbolsArrayWithDeleteRegExp = [...newValueMaskSymbolsArray]

            /**
             * replace deleted symbols to regExpRemoveSymbol
             */
            deletedSymbols.split('').forEach((_, index) => {
                prevValueMaskSymbolsArrayWithDeleteRegExp.splice(inputCaretPositionIndex + index, 0, regExpRemoveSymbol)
            })


            /**
             * replace regExpRemoveSymbols, to maskPattern symbols
             */
            prevValueMaskSymbolsArrayWithDeleteRegExp.forEach((prevValueSymbol, index) => {
                const maskSymbol = maskSymbolsArray[index],
                    isRegExpForRemoveSymbol = prevValueSymbol === regExpRemoveSymbol

                if (isRegExpForRemoveSymbol) {
                    prevValueMaskSymbolsArrayWithDeleteRegExp[index] = maskSymbol === regExpReplaceSymbol ? placeholder : maskSymbol
                }

            })


            textSymbolsArrayForMask = prevValueMaskSymbolsArrayWithDeleteRegExp
        } else if(isReplaceAction) {
            textSymbolsArrayForMask = newValueMaskSymbolsArray
        }

        if (!isDeleteAction) {

            let textSymbolIndex = 0,
                regExpsArrayForMask = [...regExpsArray],
                patternSymbols:string[] = []

            for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; ) {
                const maskSymbol = maskSymbolsArray[maskSymbolIndex],
                    textSymbol = textSymbolsArrayForMask[textSymbolIndex],
                    isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
                    isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol

                if (isMaskSymbolPattern) {
                    maskSymbolIndex++
                    patternSymbols.push(maskSymbol)

                    if (textSymbol === maskSymbol) {
                        textSymbolIndex++
                    }

                } else if (isMaskSymbolRegExp) {

                    const maskRegExp = regExpsArrayForMask[0],
                        regExp = maskRegExp ? new RegExp(maskRegExp) : null

                    if (regExp && regExp.test(textSymbol)) {
                        regExpsArrayForMask.pop()
                        maskResultSymbolsArray[maskSymbolIndex] = textSymbol
                        maskSymbolIndex++
                        textSymbolIndex++
                    } else if (textSymbol === placeholder) {
                        maskResultSymbolsArray[maskSymbolIndex] = placeholder
                        maskSymbolIndex++
                        textSymbolIndex++
                    } else if(prevValueMaskSymbolsArray[textSymbolIndex] === placeholder) {
                        maskResultSymbolsArray[maskSymbolIndex] = placeholder
                        maskSymbolIndex++
                        textSymbolIndex++
                    } else if(isReplaceAction && !patternSymbols.includes(textSymbol)) {
                        maskResultSymbolsArray[maskSymbolIndex] = prevValueMaskSymbolsArray[textSymbolIndex]
                        maskSymbolIndex++
                        textSymbolIndex++
                    } else {
                        maskResultSymbolsArray[maskSymbolIndex] = placeholder
                        textSymbolIndex++
                    }

                    if (textSymbolIndex > newValueLength) {
                        break
                    }

                }


            }

            textSymbolsArrayForMask = replaceAllPatternRegExpsToPlaceholder(maskResultSymbolsArray, placeholder, regExpReplaceSymbol)

        }

        const maskedValue = textSymbolsArrayForMask.join(''),
            unmaskedValue = unmask(maskedValue, maskSettings),
            newCaretPosition:number = getNewCaretPosition(isDeleteAction, maskSymbolsArray, textSymbolsArrayForMask, regExpReplaceSymbol, inputCaretPositionIndex, placeholder, maskedValue, maskPatternString, newValueLength)


        return {maskedValue, unmaskedValue, unmaskedPrevValue, newCaretPosition}

    } else {

        let textSymbolIndex = 0,
            maskSymbolsArrayToOutPut = [...maskSymbolsArray],
            lastMaskRegExpSymbolIndex = 0

        for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; maskSymbolIndex++) {
            const maskSymbol = maskSymbolsArray[maskSymbolIndex],
                  textSymbol = textForMaskInput[textSymbolIndex],
                  remainderMaskRegExpCount = regExpsArray.length,
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
                    const maskRegExp = regExpsArray[0],
                          regExp = maskRegExp ? new RegExp(maskRegExp) : null

                    if (regExp && regExp.test(textSymbol)) {
                        maskSymbolsArrayToOutPut[maskSymbolIndex] = textSymbol
                        regExpsArray.pop()
                    } else {
                        maskSymbolsArrayToOutPut = maskSymbolsArrayToOutPut.slice(0, endSliceIndex)
                        break
                    }

                    textSymbolIndex++
                }

            } else if (wasAllTextSymbolsUsed) {

                /**
                 * Если был заполнен последний RegExp патерна, не обрезать остаток шаблона
                 */
                if (remainderMaskRegExpCount > 0) {
                    maskSymbolsArrayToOutPut = maskSymbolsArrayToOutPut.slice(0, maskSymbolIndex)
                    break
                }

            }


            lastMaskRegExpSymbolIndex = isMaskPatternRegExp ? maskSymbolIndex : lastMaskRegExpSymbolIndex
        }

        const maskedValue = maskSymbolsArrayToOutPut.join(''),
              unmaskedValue = unmask(maskedValue, maskSettings)

        return {maskedValue, unmaskedValue}
    }

}


export {mask, unmask}

