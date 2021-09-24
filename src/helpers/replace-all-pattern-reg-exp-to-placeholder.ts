import {ReplaceAllPatternRegExpsToPlaceholder} from "./types";

/**
 * Replace all RegExp symbols in mask array to placeholder
 */
export const replaceAllPatternRegExpsToPlaceholder:ReplaceAllPatternRegExpsToPlaceholder = (maskSymbolsArrayToOutPut, placeholder, regExpReplaceSymbol) => {

    return maskSymbolsArrayToOutPut.map((patternSymbol) => {
        const shouldReplaceRegExpToPlaceholder = patternSymbol === regExpReplaceSymbol
        return shouldReplaceRegExpToPlaceholder  ? placeholder : patternSymbol
    })
}
