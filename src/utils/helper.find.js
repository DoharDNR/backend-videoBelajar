const connection = require("../db/connection");

const searchFilterSorting = async (query, sorting) =>
  new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM product ${query} ORDER BY ${sorting}`,
      (_err, rows) => {
        if (_err) reject(_err);
        resolve(rows);
      },
    );
  });

const resultFind = async (title, category, sorting) => {
  try {
    const query = [];

    if (title) {
      query.push(`title LIKE '${title}'`);
    }

    if (category) {
      query.push(`category = '${category}'`);
    }

    const where = query.length ? `WHERE ${query.join(" AND ")}` : "";

    const result = searchFilterSorting(where, sorting);
    return result;
  } catch (_err) {
    return _err;
  }
};

module.exports = { resultFind };
