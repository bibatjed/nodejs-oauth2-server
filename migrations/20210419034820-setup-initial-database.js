"use strict";

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */

exports.up = async function (db, callback) {
  //CREATE oauth_clients
  await db.runSql(
    `CREATE TABLE oauth_clients (client_id VARCHAR(80) NOT NULL, client_secret VARCHAR(80), redirect_uri VARCHAR(2000), grant_types VARCHAR(80), scope VARCHAR(4000), user_id VARCHAR(80), PRIMARY KEY (client_id) );`
  );

  //CREATE oauth_access_tokens
  await db.runSql(
    `CREATE TABLE oauth_access_tokens ( access_token VARCHAR(40) NOT NULL, client_id VARCHAR(80) NOT NULL, user_id VARCHAR(80), expires TIMESTAMP NOT NULL, scope VARCHAR(4000), PRIMARY KEY (access_token) );`
  );

  //CREATE oauth_authorization_codes

  await db.runSql(
    `CREATE TABLE oauth_authorization_codes ( authorization_code VARCHAR(40) NOT NULL, client_id VARCHAR(80) NOT NULL, user_id VARCHAR(80), redirect_uri VARCHAR(2000), expires TIMESTAMP NOT NULL, scope VARCHAR(4000), id_token VARCHAR(1000), PRIMARY KEY (authorization_code) );`
  );

  //CREATE oauth_refresh_token
  await db.runSql(
    `CREATE TABLE oauth_refresh_tokens ( refresh_token VARCHAR(40) NOT NULL, client_id VARCHAR(80) NOT NULL, user_id VARCHAR(80), expires TIMESTAMP NOT NULL, scope VARCHAR(4000), PRIMARY KEY (refresh_token) );`
  );

  //CREATE users table
  await db.runSql(
    `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username VARCHAR(100) NULL, password VARCHAR(100) NULL, PRIMARY KEY (id));`
  );

  return callback();
};

exports.down = async function (db) {
  await db.dropTable("oauth_clients");
  await db.dropTable("oauth_access_tokens");
  await db.dropTable("oauth_authorization_codes");
  await db.dropTable("oauth_refresh_tokens");
  await db.dropTable("users");
};

exports._meta = {
  version: 1,
};
