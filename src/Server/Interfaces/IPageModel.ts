/**
 * Defines the interface for a Page Model Class.
 * @property {number} id - The primary key of the page.
 * @property {string} title - The title of the page.
 * @property {string} html - The html of the page.
 * @property {Date} createdAt - The time the page was created.
 * @property {Date} updatedAt - The time the page was updated.
 */
export interface IPageModel {
    id : number;
    title : string;
    html : string;
    readonly createdAt : Date;
    readonly updatedAt : Date;
}