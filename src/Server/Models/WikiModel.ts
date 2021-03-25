import { IWikiModel } from "@interfaces/IWikiModel";
import { sequelize } from "./Config";
import { Page } from "./PageModel";
import { Model, DataTypes } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';

export class Wiki extends Model implements IWikiModel {
    public id!: number;
    public title!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPages!: HasManyGetAssociationsMixin<Page>;
    public addPage!: HasManyAddAssociationMixin<Page, number>;
    public hasPage!: HasManyHasAssociationMixin<Page, number>;
    public countPages!: HasManyCountAssociationsMixin;
    public createPage!: HasManyCreateAssociationMixin<Page>;

    public static associations: {
        pages: Association<Wiki, Page>;
    }
}

Wiki.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true 
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'Wikis',
    sequelize,
});

Wiki.hasMany(Page, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'pages'
});