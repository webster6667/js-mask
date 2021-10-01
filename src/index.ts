import {Mask, Unmask, maskSettingsProps} from './types'

import {replaceAllPatternRegExpsToPlaceholder} from '@helpers/replace-all-pattern-reg-exp-to-placeholder'
import {getMaskSymbolsArray} from '@helpers/get-mask-symbols-array'

import {getFirstFilledRegExpIndexAfterCaret} from '@helpers/get-first-filled-reg-exp-index-after-caret'
import {clearRedundantPlaceholderAfterInputText} from '@helpers/clear-redundant-placeholder-after-input-text'


// import {clearRedundantPlaceholder} from '@helpers/clear-redundant-placeholder'
// import {fixMaskSectionOverflow} from '@helpers/fix-mask-section-overflow'
// import {replaceDeletedSymbols} from '@helpers/replace-deleted-symbols'


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
            inputCaretPositionIndex = 0,
            prevValue = '',
            handleEventInput = false
          } = maskSettings || {},
          hasPlaceholder = placeholder,
          regExpReplaceSymbol = '[',
          regExpRemoveSymbol = ']',
          {regExpsArray, maskSymbolsArray} = getMaskSymbolsArray(maskPattern, regExpReplaceSymbol),
          maskPatternString = [...maskSymbolsArray].join(''),
          maskSymbolsCount = maskSymbolsArray.length



    const prevValueLength = prevValue.length,
          newValueLength = textForMaskInput.length,
          isInputAction = newValueLength > prevValueLength,
          isDeleteAction = newValueLength < prevValueLength,
          isReplaceAction = prevValueLength === newValueLength,


          // unmaskedPrevValue = unmask(prevValue, maskSettings),
          // textForMaskSymbolsArrayTest = [...textForMaskSymbolsArray],  
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


                /**
                 * Если что, искать изьян тут(не четкие числа...)
                 */
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
        
        
        return prevValueMaskSymbolsArrayWithDeleteRegExp.join('')
    } else if(isReplaceAction) {

        textSymbolsArrayForMask = newValueMaskSymbolsArray
    } 

    let textSymbolIndex = 0,
        regExpsArrayForMask = [...regExpsArray]


    console.log(textSymbolsArrayForMask.join(''));
    
    for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; ) {
        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
              textSymbol = textSymbolsArrayForMask[textSymbolIndex],
              isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
              isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol

        if (isMaskSymbolPattern) {
            maskSymbolIndex++

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
            } else {
                console.log(textSymbol);
                textSymbolIndex++
            }

            if (textSymbolIndex > newValueLength) {
                break
            }

        }


    }

    const maskedResultString = replaceAllPatternRegExpsToPlaceholder(maskResultSymbolsArray, placeholder, regExpReplaceSymbol).join('')
    
    return maskedResultString
}



export {mask, unmask}

