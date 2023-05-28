import { ValueObject } from './value-object';

export class EmailCorporateVO extends ValueObject<string> {
  private constructor(email: string) {
    super();
    this.value = email;
  }

  private static validateEmailCorporate(email: string) {
    const domainAllowed = ['company.org', 'company.com', 'company.net'];
    const domain = email.split('@')[1];
    return domainAllowed.includes(domain);
  }

  static create(email: string): EmailCorporateVO {
    if (!this.validateEmailCorporate(email)) {
      throw new Error('Invalid email corporate');
    }
    return new EmailCorporateVO(email);
  }
}
