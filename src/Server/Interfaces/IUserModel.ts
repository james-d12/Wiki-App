/**
 * Defines the interface for a User Model Class.
 * @property {number} id - The primary key of the user.
 * @property {string} email - The email of the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user (hashed).
 * @property {Date} createdAt - The time the user was created.
 * @property {Date} updatedAt - The time the user was updated.
 */
export interface IUserModel {
    id : number;
    email : string;
    username : string;
    password : string;
    readonly createdAt : Date;
    readonly updatedAt : Date;
};