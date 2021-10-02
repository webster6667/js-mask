export type GetFirstFilledRegExpIndexAfterCaret = (maskSymbolsArray: string[], prevValueMaskSymbolsArray: string[], commonRegExpsArray: string[], regExpReplaceSymbol: string, inputCaretPositionBeforeChangeText: number) => number

export type ClearRedundantPlaceholderAfterInputText = (textSymbolsArrayForMask: string[], prevValueMaskSymbolsArray: string[], newValueMaskSymbolsArray: string[], inputCaretPositionBeforeChangeText: number, firstRegExpSymbolIndexAfterCaret: number, placeholder: string, lengthDifference: number) => void

export type GetMaskSymbolsArray = (maskPattern: string, regExpReplaceSymbol: string) => {regExpsArray: string[], maskSymbolsArray: string[]}

export type ReplaceAllPatternRegExpsToPlaceholder = (maskSymbolsArrayToOutPut: string[], placeholder: string, regExpReplaceSymbol: string) => string[]

export type GetNewCaretPosition = (isDeleteAction: boolean, maskSymbolsArray: string[], textSymbolsArrayForMask: string[], regExpReplaceSymbol: string, inputCaretPositionIndex: number, placeholder: string, maskedValue: string, maskPatternString: string, newValueLength: number) => number