import {maskOld, mask} from '../src'

test('test function', () => {

    // const masked = maskOld('+7123', {
    //     pattern: '+7(999)999-99-99'
    // })

    const masked = mask('1234571', {
        maskPattern: '+7(999)999-99-99',
        // placeholder: '_'
    })

    console.log(masked);


});