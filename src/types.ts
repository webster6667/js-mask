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
    selectionStart?: number,
    prevValue?: string,
    handleEventInput?: boolean
}

export type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string

export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps


