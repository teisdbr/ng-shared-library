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