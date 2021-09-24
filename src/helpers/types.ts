export type GetMaskSymbolsArray = (maskPattern: string, regExpReplaceSymbol: string) => {regExpsArray: string[], maskSymbolsArray: string[]}

export type ReplaceAllPatternRegExpsToPlaceholder = (maskSymbolsArrayToOutPut: string[], placeholder: string, regExpReplaceSymbol: string) => string[]