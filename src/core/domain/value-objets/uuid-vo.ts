import { validate } from 'uuid';

import { ValueObject } from './value-object';

export class UuidVO extends ValueObject<string> {
  private constructor(uuid: string) {
    super();
    this.value = uuid;
  }

  private static validateUuid(uuid: string) {
    return validate(uuid);
  }

  static create(uuid: string): UuidVO {
    if (!this.validateUuid(uuid)) {
      throw new Error('Invalid uuid');
    }
    return new UuidVO(uuid);
  }

  getValue(): string {
    return this.value;
  }
}
