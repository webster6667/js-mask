import {unmask} from '../src'
import {expect} from "@playwright/test";

describe('unmask value with out placeholder', () => {

    test('empty value', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              unmaskSettings = unmask('', {
                  maskPattern
              })
        
        console.log(unmaskSettings);

        // expect(unmaskSettings).toBe({
        //     patterBeforeRegExpSymbol: '+9(',
        //     firstRegExpSymbolIndex: 3,
        //     isRegExpFinished: false,
        //     lastMaskRegExpSymbolIndex: 0,
        //     clearValue: '',
        //     remainderMaskPattern: '+9(_)-(_)-(_)'
        // })
    })

    test('not all regExp filled', () => {

        // const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
        //       maskedValue = unmask('+9(1)-(2', {
        //         maskPattern
        //       })
        //
        // console.log(maskedValue);
        
        // expect(maskedValue).toBe('+9(1)-(2')
    })
    //
    // test('all regExp finished', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //           maskedValue = mask('12A', {
    //               maskPattern
    //           })
    //
    //     expect(maskedValue).toBe('+9(1)-(2)-(A)')
    // })
    //
    // test('regExp symbol not valid', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //           maskedValue = mask('123', {
    //               maskPattern
    //           })
    //
    //     console.log(maskedValue);
    //
    //     expect(maskedValue).toBe('+9(1)-(2')
    // })

});

describe('unmask value with placeholder', () => {

    // const placeholder = '_'
    //
    // test('value is only mask patter', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //           maskedValue = mask('+9(_)-(_)-(_)', {
    //               maskPattern,
    //               placeholder
    //           })
    //
    //
    //     expect(maskedValue).toBe('+9(_)-(_)-(_)')
    // })
    //
    // test('not all regExp filled', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //           maskedValue = mask('12', {
    //               maskPattern,
    //               placeholder
    //           })
    //
    //     expect(maskedValue).toBe('+9(1)-(2)-(_)')
    // })
    //
    // test('all regExp finished', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //           maskedValue = mask('12A', {
    //               maskPattern,
    //               placeholder
    //           })
    //
    //     expect(maskedValue).toBe('+9(1)-(2)-(A)')
    // })
    //
    // test('regExp symbol not valid', () => {
    //
    //     const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
    //         maskedValue = mask('123', {
    //             maskPattern,
    //             placeholder
    //         })
    //
    //     expect(maskedValue).toBe('+9(1)-(2)-(_)')
    // })

});