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

export type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string

// export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps

export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => string


