export type FixMaskSectionOverflow = (textForMaskSymbolsArray: string[], maskSymbolsArray: string[], regExpReplaceSymbol: string, placeholder: string) => string[]

export type ClearRedundantPlaceholder = (textForMaskSymbolsArray: string[], maskSymbolsArray: string[], placeholder: string, selectionStart: number) => void

export type GetMaskSymbolsArray = (maskPattern: string, regExpReplaceSymbol: string) => {regExpsArray: string[], maskSymbolsArray: string[]}

export type ReplaceAllPatternRegExpsToPlaceholder = (maskSymbolsArrayToOutPut: string[], placeholder: string, regExpReplaceSymbol: string) => string[]

export type ReplaceDeletedSymbols = (textForMaskSymbolsArray: string[], maskSymbolsArray: string[], regExpReplaceSymbol: string, placeholder: string, selectionStart: number, prevValue: string) => void