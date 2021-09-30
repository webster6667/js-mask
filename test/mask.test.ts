import {mask} from '../src'
import {expect} from "@playwright/test";


const clearingFn = () => {

    // let maskSymbolsArray = '___)-___-__-__'.split(''),
    //     textForMask = '___)-1__3-__-__'.split(''),
    //     placeholder = '_',
    //     selectionStart = 0,
    //     newText = textForMask
    //
    // if (textForMask.length > maskSymbolsArray.length) {
    //     const different = textForMask.length - maskSymbolsArray.length
    //    
    //    
    //     textForMask.splice(selectionStart, different)
    //    
    //     console.log(textForMask.join(''));
    //    
    //    
    // }

    // console.log(newText);
    
    // const ar = ['1', '2', '3'],
    //       inputSymbols:any[] = ['4', '5', '6']
    //
    // ar.splice(1, 0, inputSymbols)
    //
    // console.log(ar);


    let text = '+7(1275__)-___-__-__',
        maskPattern = `+7([\\d][\\d][\\d])-[\\d][\\d][\\d]-[\\d][\\d]-[\\d][\\d]`

    mask(text, {
        maskPattern,
        placeholder: '_',
        inputCaretPositionIndex: 7,
        prevValue: '+7(1__)-___-__-__'
    })

}

describe('covering mask with out placeholder', () => {



    test('dev', () => {

        clearingFn()

        // const maskPattern = '[\\d][\\d][\\d])-[\\d][\\d][\\d]-[\\d][\\d]-[\\d][\\d]',
        //       maskedValue = mask('', {
        //           maskPattern,
        //           placeholder: '_'
        //       })

        // expect(maskedValue).toBe('')
    })

    test('empty value', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('', {
                  maskPattern
              })

        expect(maskedValue).toBe('')
    })

    test('not all regExp filled', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('+912', {
                maskPattern
              })

        expect(maskedValue).toBe('+9(1)-(2')
    })

    test('all regExp finished', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('12A', {
                  maskPattern
              })

        expect(maskedValue).toBe('+9(1)-(2)-(A)')
    })

    test('regExp symbol not valid', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('123', {
                  maskPattern
              })

        console.log(maskedValue);

        expect(maskedValue).toBe('+9(1)-(2')
    })

});

describe('covered mask value with out placeholder', () => {

    test('value is only mask patter', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('+9(', {
                  maskPattern
              })
        
        expect(maskedValue).toBe('+9(')
    })

    test('not all regExp filled', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('+9(1)-(2)', {
                  maskPattern
              })

        expect(maskedValue).toBe('+9(1)-(2)')
    })

    test('all regExp finished', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(1)-(2)-(A)', {
                maskPattern
            })

        expect(maskedValue).toBe('+9(1)-(2)-(A)')
    })

    test('regExp symbol not valid', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(1)-(2)-(3)', {
                maskPattern
            })

        console.log(maskedValue);

        expect(maskedValue).toBe('+9(1)-(2')
    })

});

describe('covering mask with placeholder', () => {

    const placeholder = '_'
    
    test('value is only mask patter', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('+9(_)-(_)-(_)', {
                  maskPattern,
                  placeholder
              })


        expect(maskedValue).toBe('+9(_)-(_)-(_)')
    })

    test('not all regExp filled', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('12', {
                  maskPattern,
                  placeholder
              })

        expect(maskedValue).toBe('+9(1)-(2)-(_)')
    })

    test('all regExp finished', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
              maskedValue = mask('12A', {
                  maskPattern,
                  placeholder
              })

        expect(maskedValue).toBe('+9(1)-(2)-(A)')
    })

    test('regExp symbol not valid', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('123', {
                maskPattern,
                placeholder
            })

        expect(maskedValue).toBe('+9(1)-(2)-(_)')
    })

});

describe('covered mask value with placeholder', () => {

    const placeholder = '_'

    test('value is only mask patter', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(_)-(_)-(_)', {
                maskPattern,
                placeholder
            })


        expect(maskedValue).toBe('+9(_)-(_)-(_)')
    })

    test('not all regExp filled', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(1)-(2)-(_)', {
                maskPattern,
                placeholder
            })

        expect(maskedValue).toBe('+9(1)-(2)-(_)')
    })

    test('all regExp finished', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(1)-(2)-(A)', {
                maskPattern,
                placeholder
            })

        expect(maskedValue).toBe('+9(1)-(2)-(A)')
    })

    test('regExp symbol not valid', () => {

        const maskPattern = '+9([\\d])-([0-9])-([A-Z])',
            maskedValue = mask('+9(1)-(2)-(3)', {
                maskPattern,
                placeholder
            })

        expect(maskedValue).toBe('+9(1)-(2)-(_)')
    })

});