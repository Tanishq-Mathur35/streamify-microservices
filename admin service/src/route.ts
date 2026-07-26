import Express from "express";
import { addAlbum } from "./controller.js";
import { isAuth } from "./middleware.js";

const router = Express.Router()

router.post("/album/new", isAuth, addAlbum)

export default router
