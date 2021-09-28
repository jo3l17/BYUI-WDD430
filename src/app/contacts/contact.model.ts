export class Contact {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public imageUrl: string;
  public group: any = null
  constructor(id: number = 0, name: string = "", email: string = "", phone: string = "", imageUrl: string = "", group: any = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = group;
  }
}