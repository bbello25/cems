export class Role {
  constructor(name: string) {
    this.name = name;
  }

  id: number;
  name: string;
  checked?: boolean;
}
