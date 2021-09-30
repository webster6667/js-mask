export type GetFirstFilledRegExpIndexAfterCaret = (maskSymbolsArray: string[], prevValueMaskSymbolsArray: string[], commonRegExpsArray: string[], regExpReplaceSymbol: string, inputCaretPositionBeforeChangeText: number) => number

export type FixMaskSectionOverflow = (textForMaskSymbolsArray: string[], maskSymbolsArray: string[], regExpReplaceSymbol: string, placeholder: string) => string[]

export type ClearRedundantPlaceholderAfterInputText = (textSymbolsArrayForMask: string[], prevValueMaskSymbolsArray: string[], newValueMaskSymbolsArray: string[], inputCaretPositionBeforeChangeText: number, firstRegExpSymbolIndexAfterCaret: number, placeholder: string, lengthDifference: number) => void

export type GetMaskSymbolsArray = (maskPattern: string, regExpReplaceSymbol: string) => {regExpsArray: string[], maskSymbolsArray: string[]}

export type ReplaceAllPatternRegExpsToPlaceholder = (maskSymbolsArrayToOutPut: string[], placeholder: string, regExpReplaceSymbol: string) => string[]

export type ReplaceDeletedSymbols = (textForMaskSymbolsArray: string[], maskSymbolsArray: string[], regExpReplaceSymbol: string, placeholder: string, selectionStart: number, prevValue: string) => void