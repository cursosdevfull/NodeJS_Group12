class Animal {
  raza: string;
  color: string;

  constructor(raza: string, color: string) {
    this.raza = raza;
    this.color = color;
  }

  descripcion() {
    return `Raza del animal: ${this.raza}`;
  }
}

class Mamifero extends Animal {
  tipo: string;

  constructor(tipo: string, raza: string, color: string) {
    super("Siberian Husky", "marrón");
    this.tipo = tipo;
    this.color = color;
  }
}

const mamifero = new Mamifero("Terrestre", "Shitzu", "Pink");
console.log(mamifero);
