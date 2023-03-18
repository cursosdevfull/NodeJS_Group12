class Database {
  private host: string;
  private username: string;
  private password: string;

  private static instance: Database;

  private constructor(host: string, username: string, password: string) {
    this.host = host;
    this.username = username;
    this.password = password;
  }

  static create(host: string, username: string, password: string) {
    if (!this.instance) {
      this.instance = new Database(host, username, password);
    }

    return this.instance;
  }
}

const database = Database.create("localhost", "user01", "abc");
console.log(database);
const database01 = Database.create("rds.amazon.com", "admin", "abcd");
console.log(database01);
const database03 = Database.create("mongodb.gcloud.com", "super", "123abcd");
console.log(database03);
