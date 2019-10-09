export class Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: number;

  constructor(address?: any) {
    address = address || {};
    this.addressLine1 = address.addressLine1 || null;
    this.addressLine2 = address.addressLine2 || null;
    this.city = address.city || null;
    // nullify states if they are the whitespace only or the empty string
    this.state =
      address.state == null || address.state.trim() === ''
        ? null
        : address.state.trim();
    this.zip = address.zip || null;
  }

  toStringInline() {
    if ([this.addressLine1, this.city, this.state, this.zip].includes(null)) {
      return null;
    }

    return `${this.addressLine1.trim()}${
      this.addressLine2 ? (', ' + this.addressLine2).trim() : ''
    }, ${this.city.trim()}, ${this.state} ${this.zip}`;
  }
}

// Person model

export class Person {
  public address: Address = new Address();
  public emailAddress: string = null;
  public faxNumber: string = null;
  public firstName: string = null;
  public middleInitial: string = null;
  public lastName: string = null;
  public phoneNumber: string = null;
  public phoneNumberExtension: number = null;
  public prefix: string = null;
  public suffix: string = null;
  public permissions: any;

  static constructFullName(
    firstName: string,
    middleInitial: string,
    lastName: string
  ) {
    // Get this person's names into an array and remove any undefined or null names
    const names = [firstName, middleInitial, lastName].filter(
      n => n !== undefined && n != null && n.trim() !== ''
    );

    // Join all names together with a single space
    return names.join(' ');
  }

  public fullName(): string {
    return Person.constructFullName(
      this.firstName,
      this.middleInitial,
      this.lastName
    );
  }

  init(): Person {
    this.address = this.address ? new Address(this.address) : new Address();
    return this;
  }
}
