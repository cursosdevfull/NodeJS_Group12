class Animal {
  private raza: string;
  private color: string;

  constructor(pRaza: String, pColor: string) {
    this.raza = "perro";
    this.color = "marrón";
  }

  obtenerDescripcion() {
    return `Raza: ${this.raza}, Color: ${this.color}`;
  }
}

const animal = new Animal("Gato Siames", "pardo");

console.log(animal);
console.log("raza", animal.raza);
console.log("color", animal.color);
console.log("description", animal.obtenerDescripcion());
