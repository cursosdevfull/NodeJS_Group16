export class TextLongVO {
  private readonly _value: string;

  private constructor(text: string) {
    this._value = text;
  }

  static create(text: string, minLength: number, messageError: string) {
    if (text.length < minLength) throw new Error(messageError);
    return new TextLongVO(text);
  }

  get value() {
    return this._value;
  }
}
