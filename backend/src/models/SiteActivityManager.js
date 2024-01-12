const AbstractManager = require("./AbstractManager");

class SiteActivityManager extends AbstractManager {
  constructor() {
    super({ table: "site_has_activity" });
  }

  scope(id) {
    return this.database.query(
      `select * from ${this.table} where site_id = ?`,
      [id]
    );
  }

  seeActivities(id) {
    return this.database.query(
      `select ${this.table}.site_id, activity.activity
      from ${this.table}
      inner join activity on ${this.table}.activity_id = activity.id
      where ${this.table}.site_id = ?
      `,
      [id]
    );
  }

  insert(body) {
    const { site_id, activity_id } = body;
    return this.database.query(
      `insert into ${this.table} (site_id, activity_id) values (?, ?)`,
      [site_id, activity_id]
    );
  }

  remove(siteId, activityId) {
    return this.database.query(
      `delete from ${this.table} where site_id = ? AND activity_id = ?`,
      [siteId, activityId]
    );
  }
}

module.exports = SiteActivityManager;
