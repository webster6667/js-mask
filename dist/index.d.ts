type unmaskResultProps = {
    patterBeforeRegExpSymbol: string;
    isRegExpFinished: boolean;
    firstRegExpSymbolIndex: number;
    lastMaskRegExpSymbolIndex: number;
    clearValue: string;
    remainderMaskPattern: string;
};
type maskSettingsProps = {
    maskPattern: string;
    placeholder?: string;
    selectionStart?: number;
    prevValue?: string;
    handleEventInput?: boolean;
};
type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string;
type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps;
/**
 * @description
 * covering value to mask, relative settings
 *
 * @param {string} textForMask - text for mask
 * @param {maskSettingsProps} maskSettings - setting for covering mask
 *
 * @returns {string}
 *
 * @example
 * function() // => true
 */
declare const mask: Mask;
declare const unmask: Unmask;
export { mask, unmask };
