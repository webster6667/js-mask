type maskSettingsProps = {
    maskPattern: string,
    placeholder?: string
}

export type Mask = (textForMask: string | number, maskSettings?: maskSettingsProps) => string