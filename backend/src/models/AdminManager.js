const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  findName(name) {
    return this.database.query(`select * from ${this.table} where name = ?`, [
      name,
    ]);
  }

  login(name) {
    return this.database.query(`select * from ${this.table} where name = ?`, [
      name,
    ]);
  }

  update(id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }

  insert(body) {
    const { name, hashedPassword } = body;
    return this.database.query(
      `insert into ${this.table} (name, hashedPassword) values (?, ?)`,
      [name, hashedPassword]
    );
  }
}

module.exports = AdminManager;
