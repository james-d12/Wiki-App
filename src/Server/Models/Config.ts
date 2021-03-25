import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './dist/Server/Database/WikiApp.sqlite'
});
