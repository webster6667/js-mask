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
    placeholder?: string
}

export type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string

export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps


