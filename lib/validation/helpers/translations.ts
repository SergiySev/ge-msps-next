export const requiredText = 'სავალდებულო ველი' as const;
export const onlyNumbers = 'მხოლოდ ციფრები' as const;
export const requiredSymbols = (n: number) => `სავალდებულოა ${n} სიმბოლო` as const;
export const wrongFormat = 'არასწორი ფორმატი' as const;

export const minDateWarning = 'თარიღი უნდა იყოს 01/01/1920-დან ან მის შემდეგ' as const;
export const maxDateWarning = 'დაბადების თარიღი არ შეიძლება იყოს მომავალში' as const;
export const wrongDateBeforeBirth = 'არასწორი თარიღი (არ უნდა იყოს დაბადების თარიღამდე)' as const;
export const wrongDateAfterDeath = 'არასწორი თარიღი (არ უნდა იყოს სიკვდილს თარიღის შემდეგ)' as const;

export const possibleBMI = 'BMI უნდა იყოს 8 - 220 ფარგლებში' as const;
