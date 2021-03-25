import { IUserModel } from "@interfaces/IUserModel";
import { sequelize } from "./Config";
import { Wiki } from "./WikiModel";
import { Model, DataTypes } from 'sequelize';
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';

export class User extends Model implements IUserModel {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getWikis!: HasManyGetAssociationsMixin<Wiki>;
    public addWiki!: HasManyAddAssociationMixin<Wiki, number>;
    public hasWiki!: HasManyHasAssociationMixin<Wiki, number>;
    public countWikis!: HasManyCountAssociationsMixin;
    public createWiki!: HasManyCreateAssociationMixin<Wiki>;

    public static associations: {
        wikis: Association<User, Wiki>;
    }

    public async isSamePassword(password : string) : Promise<boolean> {
      return (await bcrypt.compare(password, this.password)) ? true : false;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true 
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    uid: {
      type: DataTypes.UUID,
      defaultValue: () => {
        return uuidv4().replace(/-/g, '');
      },
    }
}, {
    hooks: {
      beforeCreate: async (user : User) => {
        //const salt = await bcrypt.genSaltSync();
        //user.password = await bcrypt.hashSync(user.password, salt);
        try {
          user.password = await bcrypt.hash(user.password, 10);
        } catch(err){
          console.error(`Error hashing password for user ${user.username}`);
        }
      }
    },  
    tableName: 'Users',
    sequelize,
});

User.hasMany(Wiki, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'wikis'
});