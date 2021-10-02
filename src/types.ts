type unmaskResultProps = {
    patterBeforeRegExpSymbol: string,
    isRegExpFinished: boolean,
    firstRegExpSymbolIndex: number,
    lastMaskRegExpSymbolIndex: number,
    clearValue: string,
    remainderMaskPattern: string
}

export type maskSettingsProps = {
    maskPattern: string,
    placeholder?: string,
    inputCaretPositionIndex?: number,
    prevValue?: string,
    handleEventInput?: boolean
}

type maskResult = {
    maskedValue: string,
    unmaskedValue: string,
    unmaskedPrevValue: string,
    newCaretPosition: number
}

export type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => maskResult

export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => string


