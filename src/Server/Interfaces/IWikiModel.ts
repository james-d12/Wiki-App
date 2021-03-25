/**
 * Defines the interface for a Wiki Model Class.
 * @property {number} id - The primary key of the wiki.
 * @property {string} title - The title of the wiki.
 * @property {Date} createdAt - The time the wiki was created.
 * @property {Date} updatedAt - The time the wiki was updated.
 */
export interface IWikiModel {
    id : number;
    title : string;
    readonly createdAt : Date;
    readonly updatedAt : Date;
}