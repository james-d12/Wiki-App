import { sequelize } from "../../Server/Models/Config";
import { Page } from "../../Server/Models/PageModel";

test('Should Create A Page', async () => {
    const title : string = "Matrix";
    const html : string = "<h1> Matrix </h1>";

    await sequelize.sync({ force: true });
    const page : Page = await Page.create({ title: title, html: html });
    const pageFound : Page = await Page.findOne({ where: { title: title, html: html }});

    expect(pageFound.title).toStrictEqual(page.title);
    expect(pageFound.html).toStrictEqual(page.html);
})

test('Should Update A Page', async() => {
    const title : string = "Matrix";
    const html : string = "<h1> Matrix </h1>";

    const updatedTitle : string = "Vector";
    const updatedHTML : string = "<h1> Vector </h1>";

    await sequelize.sync({ force: true });
    const page : Page = await Page.create({ title: title, html: html });
    const updatedPage = await page.update({ title: updatedTitle, html: updatedHTML });

    expect(updatedPage.title).toStrictEqual(updatedTitle);
    expect(updatedPage.html).toStrictEqual(updatedHTML);
})

test('Should Delete A Page', async() => {
    const title : string = "Matrix";
    const html : string = "<h1> Matrix </h1>";

    await sequelize.sync({ force: true });
    const page : Page = await Page.create({ title: title, html: html });
    page.destroy();

    expect(await Page.findOne({ where: { title: title, html: html }})).toBeNull();
})