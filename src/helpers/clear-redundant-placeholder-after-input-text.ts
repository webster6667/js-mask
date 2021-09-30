import {ClearRedundantPlaceholderAfterInputText} from "./types"

/**
 * Clear redundant symbol _ after input symbols
 */
export const clearRedundantPlaceholderAfterInputText:ClearRedundantPlaceholderAfterInputText = (textSymbolsArrayForMask, prevValueMaskSymbolsArray, newValueMaskSymbolsArray, inputCaretPositionBeforeChangeText, firstRegExpSymbolIndexAfterCaret, placeholder, lengthDifference) => {

    const sliceFinish = inputCaretPositionBeforeChangeText + lengthDifference,
          inputSymbols = newValueMaskSymbolsArray.slice(inputCaretPositionBeforeChangeText, sliceFinish),
          finishPreValueIndexForSearchPlaceholder = firstRegExpSymbolIndexAfterCaret > 0 ? firstRegExpSymbolIndexAfterCaret : prevValueMaskSymbolsArray.length


    let deletedPlaceholderCount = 0

    for (let preValueIndex = inputCaretPositionBeforeChangeText; preValueIndex < finishPreValueIndexForSearchPlaceholder; preValueIndex++) {
        const preValueSymbol = prevValueMaskSymbolsArray[preValueIndex]

        if (preValueSymbol === placeholder && deletedPlaceholderCount < lengthDifference) {
            deletedPlaceholderCount++
            textSymbolsArrayForMask.splice((preValueIndex + 1) - deletedPlaceholderCount, 1)
        }

    }

    inputSymbols.forEach((inputSymbol, index) => {
        textSymbolsArrayForMask.splice(inputCaretPositionBeforeChangeText + index, 0, inputSymbol)
    })

}