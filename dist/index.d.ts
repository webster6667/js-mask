type maskSettingsProps = {
    maskPattern: string;
    placeholder?: string;
    inputCaretPositionIndex?: number;
    prevValue?: string;
};
type maskResult = {
    maskedValue: string;
    unmaskedValue: string;
    unmaskedPrevValue?: string;
    newCaretPosition?: number;
};
type Mask = (textForMask: string, maskSettings: maskSettingsProps) => maskResult;
type Unmask = (maskedText: string, maskSettings: maskSettingsProps) => string;
/**
 * @description
 * will clean text from mask, and return clear value
 *
 * @param {string} maskedText - text for mask
 * @param {maskSettingsProps} maskSettings - setting for covering mask
 *
 * @returns {string}
 *
 */
declare const unmask: Unmask;
/**
 * @description
 * covering value to mask, relative settings
 *
 * @param {string} textForMaskInput - text for mask
 * @param {maskSettingsProps} maskSettings - setting for covering mask
 *
 * @returns {string}
 *
 */
declare const mask: Mask;
export { mask, unmask };
