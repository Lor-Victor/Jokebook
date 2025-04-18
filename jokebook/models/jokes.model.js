"use strict";
const db = require("./db-conn");

function getByCategory(id){
    let sql = `SELECT * FROM jokes WHERE category_id = ?`;
    return db.all(sql, id);
}

function getCategories(){
    let sql = `SELECT category_id,name  FROM Categories`;
    return db.all(sql);
}

function createNew(params){
    let sql = `INSERT INTO Jokes (setup, delivery,category_id) VALUES (?, ?,?)`;
    return db.run(sql, params);

}
function getRandom(){
    let sql = `SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`;
    return db.get(sql);
}
function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
      let sql = `SELECT * FROM categories WHERE ${attribute} =? ;`;
      const data = db.all(sql, value);
      return data;
    }
  }
function getColumnNames() {
    let sql = "select name from pragma_table_info('products');";
    const columns = db.all(sql);
    let result = columns.map(a => a.name);
    return result;
  }

module.exports = {
    getByCategory,
    getCategories,
    createNew,
    getRandom,
    getAllByOneAttribute
};