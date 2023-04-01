export abstract class ValueObject<TypeValue> {
  protected value: TypeValue;

  getValue(): TypeValue {
    return this.value;
  }
}
