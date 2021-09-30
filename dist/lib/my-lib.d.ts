type maskSettingsProps = {
    maskPattern: string;
    placeholder?: string;
    inputCaretPositionIndex?: number;
    prevValue?: string;
    handleEventInput?: boolean;
};
type Mask = (textForMask: string, maskSettings?: maskSettingsProps) => string;
// export type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => unmaskResultProps
type Unmask = (textForMask: string, maskSettings?: maskSettingsProps) => string;
declare const unmask: Unmask;
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
export { mask, unmask };
