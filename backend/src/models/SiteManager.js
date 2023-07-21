const AbstractManager = require("./AbstractManager");

class SiteManager extends AbstractManager {
  constructor() {
    super({ table: "site" });
  }

  insert(body) {
    const { name, year, address, maplink } = body;
    return this.database.query(
      `insert into ${this.table} (name, year, address, maplink) values (?, ?, ?, ?)`,
      [name, year, address, maplink]
    );
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
}

module.exports = SiteManager;
