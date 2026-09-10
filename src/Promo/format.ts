const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toPersianDigits = (input: string): string =>
  input.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);

export const formatPersianInt = (value: number): string => {
  const rounded = Math.round(value);
  const withThousands = rounded.toLocaleString("en-US").replace(/,/g, "٬");
  return toPersianDigits(withThousands);
};

export const formatPersianDecimal = (value: number, fractionDigits = 1): string =>
  toPersianDigits(value.toFixed(fractionDigits));
