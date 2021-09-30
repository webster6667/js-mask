import {FixMaskSectionOverflow} from "./types"

/**
 * Fix textInput When mask section is overflow
 *
 * (___)-___-__-__
 * (12567)-_4_-__-__
 *
 */
export const fixMaskSectionOverflow:FixMaskSectionOverflow = (textForMaskSymbolsArray, maskSymbolsArray, regExpReplaceSymbol, placeholder) => {

    const maskSymbolsCount = maskSymbolsArray.length,
          redundantMaskSectionsSymbolArray: string[] = [],
          maskSymbolsArrayForOverflow: string[] = [...maskSymbolsArray]

    let textSymbolIndex = 0


        for(let maskSymbolIndex = 0; maskSymbolIndex < maskSymbolsCount; ) {

        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
              textSymbol = textForMaskSymbolsArray[textSymbolIndex],
              isMaskSymbolPattern = maskSymbol !== regExpReplaceSymbol,
              isMaskSymbolRegExp = maskSymbol === regExpReplaceSymbol

        if (isMaskSymbolPattern) {

            const isTextSymbolPattern = textSymbol === maskSymbol

            if (isTextSymbolPattern) {
                textSymbolIndex++
                maskSymbolIndex++
            } else {
                redundantMaskSectionsSymbolArray.push(textSymbol)
                textSymbolIndex++
            }

        } else if (isMaskSymbolRegExp) {

            const redundantMaskSectionsSymbolsExist = redundantMaskSectionsSymbolArray.length

            if (redundantMaskSectionsSymbolsExist) {
                const textRedundantSymbol:string = redundantMaskSectionsSymbolArray.shift() as string

                maskSymbolsArrayForOverflow[maskSymbolIndex] = textRedundantSymbol
                maskSymbolIndex++

                if (textSymbol === placeholder) {
                    textSymbolIndex++
                }

            } else {
                maskSymbolsArrayForOverflow[maskSymbolIndex] = textSymbol
                textSymbolIndex++
                maskSymbolIndex++
            }

        }

    }

    return maskSymbolsArrayForOverflow
}