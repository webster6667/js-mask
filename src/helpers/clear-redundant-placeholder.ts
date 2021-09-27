import {ClearRedundantPlaceholder} from "./types"

/**
 * Clear redundant symbol _ after input symbols
 */
export const clearRedundantPlaceholder:ClearRedundantPlaceholder = (textForMaskSymbolsArray, maskSymbolsArray, placeholder, selectionStart) => {

        const different = textForMaskSymbolsArray.length - maskSymbolsArray.length

        for (let startIndex = 0;startIndex < different; startIndex++) {

            const symbolIndexForRemove = selectionStart + startIndex,
                symbolForRemove = textForMaskSymbolsArray[symbolIndexForRemove]

            if (symbolForRemove === placeholder) {
                textForMaskSymbolsArray.splice(symbolIndexForRemove, different)
            }

        }

}