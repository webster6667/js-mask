import {GetFirstFilledRegExpIndexAfterCaret} from "./types"

/**
 * return first regExp symbol index after caret, or 0
 */
export const getFirstFilledRegExpIndexAfterCaret:GetFirstFilledRegExpIndexAfterCaret = (maskSymbolsArray, prevValueMaskSymbolsArray, commonRegExpsArray, regExpReplaceSymbol, inputCaretPositionBeforeChangeText) => {

    const regExpsArray = [...commonRegExpsArray]

    let firstRegExpSymbolIndexAfterCaret = 0

    maskSymbolsArray.forEach((maskSymbol, maskSymbolIndex) => {
        const textSymbol = prevValueMaskSymbolsArray[maskSymbolIndex],
              isMaskPatternRegExp = maskSymbol === regExpReplaceSymbol

        if (isMaskPatternRegExp) {
            const maskRegExp = regExpsArray.pop(),
                regExp = maskRegExp ? new RegExp(maskRegExp) : null

            if (regExp && regExp.test(textSymbol) && maskSymbolIndex >= inputCaretPositionBeforeChangeText && firstRegExpSymbolIndexAfterCaret === 0) {
                firstRegExpSymbolIndexAfterCaret = maskSymbolIndex
            }

        }

    })

    return firstRegExpSymbolIndexAfterCaret

}