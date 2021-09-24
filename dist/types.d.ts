declare type unmaskResultProps = {
    patterBeforeRegExpSymbol: string;
    isRegExpFinished: boolean;
    firstRegExpSymbolIndex: number;
    lastMaskRegExpSymbolIndex: number;
    clearValue: string;
    remainderMaskPattern: string;
};
export declare type maskSettingsProps = {
    maskPattern: string;
    placeholder?: string;
};
export declare type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string;
export declare type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps;
export {};
