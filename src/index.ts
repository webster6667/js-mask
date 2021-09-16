import {Mask} from './types'

/**
 * @description
 * Func description
 *
 * @param {number} firstParam
 * @param {string[]} secondParam
 * @returns {boolean}
 *
 * @example
 * myFunc(1,'example')
 * // => true
 */

//maskPattern - +7(999)999-99-99
//maskPatternsSymbolForReplace - символ в маске который ожидает замены по описанной регулярке

const mask:Mask = (textForMask, maskSettings) => {

    const {maskPattern = '', placeholder} = maskSettings || {},
          maskPatternsSymbolForReplace = '9',

          //Перепилить
          addPlaceholdersToOutput = function(output: any, index: any, placeholder: any) { //Заменяет спец символы маски, на плейсхолдер
              for (; index < output.length; index++) {
                  if(output[index] === maskPatternsSymbolForReplace) {
                      output[index] = placeholder;
                  }
              }
              return output;
          },
          hasPlaceholder = placeholder

    let maskSymbolsArray = maskPattern.split(""), // раделяет маску на массив символов ['+', '7', '(', ...]
        values = textForMask.toString().replace(/\W/g, ""), //Берез значение на которое нужно наложить маску, и чистит от всего кроме букв и символов(наверное не нужно)
        maskSymbolsCount = maskSymbolsArray.length, //Кол-во символов маски
        indexOfSymbolFromTextForMask = 0

    for(let maskSymbolIndex = 0; maskSymbolIndex <= maskSymbolsCount; maskSymbolIndex++) {

        const maskSymbol = maskSymbolsArray[maskSymbolIndex],
              symbolFromTextForMask = values[indexOfSymbolFromTextForMask],
              isMaskSymbolForReplace = maskSymbol === maskPatternsSymbolForReplace,
              isSymbolForMaskValidForReg = symbolFromTextForMask && symbolFromTextForMask.match(/[0-9]/),
              shouldReplaceMaskRegSymbolToTextSymbol = isMaskSymbolForReplace && isSymbolForMaskValidForReg

        // Reached the end of input
        if (indexOfSymbolFromTextForMask >= values.length) { //дошли до последнего символа
            maskSymbolsArray = maskSymbolsArray.slice(0, maskSymbolIndex)
            break;
        }

        //Заменить символ 9, на символ из введенной строки, если символ из введенной строки под паттерн
        if (shouldReplaceMaskRegSymbolToTextSymbol) {
            ++indexOfSymbolFromTextForMask

            maskSymbolsArray[maskSymbolIndex] = symbolFromTextForMask
            //Если в маске попался символ 9(что означает ожидает число), а в значение пришло не число
        } else if(isMaskSymbolForReplace) {

            //Если есть плейсхолдер, вместо не подходящего значения для 9, подставить туда плейсхолдер(например _), и заменить все следующие значения на _
            if (hasPlaceholder) {
                //Заменить значения, и вернуть обьедененный массив замененных символов
                addPlaceholdersToOutput(maskSymbolsArray, maskSymbolIndex, placeholder).join("")
            } else {
                //Если нет плейсхолдера, стереть стереть все дальнейшие символы из массива, включая тот что не подошел по патерну
                maskSymbolsArray = maskSymbolsArray.slice(0, maskSymbolIndex)
                break;
            }

        }


    }

    // maskSymbolsArray.forEach((maskSymbol, maskSymbolIndex) => {
    //     const symbolFromTextForMask = values[indexOfSymbolFromTextForMask],
    //           isMaskSymbolForReplace = maskSymbol === maskPatternsSymbolForReplace,
    //           isSymbolForMaskValidForReg = symbolFromTextForMask && symbolFromTextForMask.match(/[0-9]/),
    //           shouldReplaceMaskRegSymbolToTextSymbol = isMaskSymbolForReplace && isSymbolForMaskValidForReg
    //
    //
    //         //Заменить символ 9, на символ из введенной строки, если символ из введенной строки под паттерн
    //         if (shouldReplaceMaskRegSymbolToTextSymbol) {
    //             ++indexOfSymbolFromTextForMask
    //
    //             maskSymbolsArray[maskSymbolIndex] = symbolFromTextForMask
    //         //Если в маске попался символ 9(что означает ожидает число), а в значение пришло не число
    //         } else if(isMaskSymbolForReplace) {
    //
    //             //Если есть плейсхолдер, вместо не подходящего значения для 9, подставить туда плейсхолдер(например _), и заменить все следующие значения на _
    //             if (hasPlaceholder) {
    //                 //Заменить значения, и вернуть обьедененный массив замененных символов
    //                 addPlaceholdersToOutput(maskSymbolsArray, maskSymbolIndex, placeholder).join("")
    //             } else {
    //                 //Если нет плейсхолдера, стереть стереть все дальнейшие символы из массива, включая тот что не подошел по патерну
    //                 maskSymbolsArray = maskSymbolsArray.slice(0, maskSymbolIndex)
    //             }
    //
    //         }
    //
    // })

    //Перевести массив в строку, и вернуть не больше символов чем в маске
    return maskSymbolsArray.join("").substring(0, maskSymbolsCount);
}

export const maskOld = (value: any, opts: any) => {
    var DIGIT = "9",
        ALPHA = "A",
        ALPHANUM = "S",

        addPlaceholdersToOutput = function(output: any, index: any, placeholder: any) {
            for (; index < output.length; index++) {
                if(output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
                    output[index] = placeholder;
                }
            }
            return output;
        }



    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length,
        placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
    ;


    for (i = 0; i < outputLength; i++) {


        // Reached the end of input
        if (index >= values.length) { //дошли до последнего символа

            if (patternChars.length == charsValues.length) {
                

                
                return output.join("");
            }

            //Если есть плейсхолдер и кол-во введенных символов меньше чем кол-во символов в паттерне
            else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
                
                return addPlaceholdersToOutput(output, i, placeholder).join("");
            }
            else {
                break;
            }

        }
        // Remaining chars in input
        else{
            
            if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
                (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
                (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
                output[i] = values[index++];

            } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {

                if(placeholder !== undefined){
                    return addPlaceholdersToOutput(output, i, placeholder).join("");
                }
                else{
                    return output.slice(0, i).join("");
                }

            }
        }
    }


    return output.join("").substr(0, i);
};

export {mask}

