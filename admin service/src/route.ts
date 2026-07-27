import Express from "express";
import { addAlbum, addSong, addThumbnail } from "./controller.js";
import uploadFile, { isAuth } from "./middleware.js";

const router = Express.Router()

router.post("/album/new", isAuth, uploadFile, addAlbum)
router.post("/song/new", isAuth, uploadFile, addSong)
router.post("/song/:id", isAuth, uploadFile, addThumbnail)

export default router
