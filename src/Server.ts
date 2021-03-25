import 'module-alias/register';
import express from "express";
import session from "express-session";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { router } from "@routes/Router";
import Handlebars from "handlebars";
import expressHandlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

declare module "express-session" {
  interface Session {
    username: string;
    loggedIn: boolean,

  }
}

const PORT: number = 8000;
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars)
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars')
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(router)

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});