import {GetMaskSymbolsArray} from "./types";

/**
 * delimit maskPattern by symbols, and replace regExp to special symbol
 */
export const getMaskSymbolsArray:GetMaskSymbolsArray = (maskPattern, regExpReplaceSymbol) => {


    let regExp = /\[[\\d\w-]+\]/g,
        regExpResult = maskPattern.match(regExp),
        regExpsArray = regExpResult ? Array.from(regExpResult).reverse() : [],
        maskWithOutRegExps = maskPattern.replace(regExp, regExpReplaceSymbol),
        maskSymbolsArray = maskWithOutRegExps.split('')

    return {regExpsArray, maskSymbolsArray}

}