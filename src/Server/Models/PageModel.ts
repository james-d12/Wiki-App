import { IPageModel } from "@interfaces/IPageModel";
import { sequelize } from "./Config";
import { Model, DataTypes } from 'sequelize';

/**
 * The class that represents the Page Model present in the database.
 */
export class Page extends Model implements IPageModel {
    public id!: number;
    public title!: string;
    public html!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Page.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    html: {
        type: new DataTypes.TEXT(),
        allowNull: false,
    }
}, {
    tableName: 'Pages',
    sequelize,
});
