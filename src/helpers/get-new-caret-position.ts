import {GetNewCaretPosition} from "./types"

/**
 * get caret position after input
 */
export const getNewCaretPosition:GetNewCaretPosition = (isDeleteAction, maskSymbolsArray, textSymbolsArrayForMask, regExpReplaceSymbol, inputCaretPositionIndex, placeholder, maskedValue, maskPatternString, newValueLength) => {

    let newCaretPosition:number = inputCaretPositionIndex

    if (textSymbolsArrayForMask.includes(placeholder)) {

        let isPlaceholderBeforeCaretExist = false

        for (let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsArray.length; maskSymbolIndex++) {
            const maskSymbol = maskSymbolsArray[maskSymbolIndex],
                isRegExpSymbol = maskSymbol === regExpReplaceSymbol

            if (isRegExpSymbol) {

                if (isDeleteAction) {

                    if (maskSymbolIndex === inputCaretPositionIndex) {
                        newCaretPosition = maskSymbolIndex
                        isPlaceholderBeforeCaretExist = true
                    } else if(maskSymbolIndex < inputCaretPositionIndex) {
                        newCaretPosition = maskSymbolIndex + 1
                        isPlaceholderBeforeCaretExist = true
                    }

                } else if(maskSymbolIndex >= inputCaretPositionIndex) {
                    newCaretPosition = maskSymbolIndex
                    break
                }

            }

        }

    }

    const isUnmaskedValueEmpty = maskedValue === maskPatternString,
          wasInputSymbolWithOutMask = newValueLength === 1


    if (isUnmaskedValueEmpty) newCaretPosition = maskPatternString.indexOf(placeholder)
    if (wasInputSymbolWithOutMask) newCaretPosition = maskPatternString.indexOf(placeholder) + 1

    return newCaretPosition
}