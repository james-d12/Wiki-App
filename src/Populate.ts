import 'module-alias/register';
import * as Models from "@models/Models";

export async function populate() : Promise<void> {
    await Models.sequelize.sync({ force: true });
    await Models.User.create({ email: "james@gmail.com", username: "james-d12", password: "123456789" });
    await Models.Wiki.create({ title: "Mathematics", ownerId: 1 })
}

populate();