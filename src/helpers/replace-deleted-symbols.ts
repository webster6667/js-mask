import {replaceAllPatternRegExpsToPlaceholder} from "@helpers/replace-all-pattern-reg-exp-to-placeholder";
import {ReplaceDeletedSymbols} from "./types"


/**
 * Replace deleted symbols to placeholder or pattern
 */
export const replaceDeletedSymbols:ReplaceDeletedSymbols = (textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder, selectionStart, prevValue) => {

    const prevSymbolAfterDeleted = maskSymbolsArray[selectionStart],
        isPrevSymbolPattern = prevSymbolAfterDeleted !== regExpReplaceSymbol && prevSymbolAfterDeleted !== '',
        symbolsLengthDifferent = maskSymbolsArray.length - textForMaskSymbolsArray.length

    if (symbolsLengthDifferent === 1 && !isPrevSymbolPattern) {
        textForMaskSymbolsArray.splice(selectionStart, 0, placeholder)
    } else {
        const prevValueSymbolsArray = prevValue.split(''),
            deletedSymbols = prevValueSymbolsArray.slice(selectionStart, selectionStart + symbolsLengthDifferent).join(''),
            textForMaskSymbolsArrayForDetectedDuration =  [...textForMaskSymbolsArray]

        textForMaskSymbolsArrayForDetectedDuration.splice(selectionStart, 0, deletedSymbols)

        const duration = textForMaskSymbolsArrayForDetectedDuration.join('') === prevValue ? 'ltr' : 'rtl',
            maskSymbolsArrayForMaskPatternCreate = [...maskSymbolsArray],
            maskPatternSymbolArray = replaceAllPatternRegExpsToPlaceholder(maskSymbolsArrayForMaskPatternCreate, placeholder, regExpReplaceSymbol),
            symbolsArrayForReplaceDeleted = duration === 'ltr' ? maskPatternSymbolArray.slice(selectionStart, selectionStart + symbolsLengthDifferent).join('') : maskPatternSymbolArray.slice(selectionStart - symbolsLengthDifferent, selectionStart).join('')

        textForMaskSymbolsArray.splice(selectionStart, 0, symbolsArrayForReplaceDeleted)
    }

}