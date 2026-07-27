import Express from "express";
import { addAlbum } from "./controller.js";
import uploadFile, { isAuth } from "./middleware.js";

const router = Express.Router()

router.post("/album/new", isAuth, uploadFile, addAlbum)

export default router
