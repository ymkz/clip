import { Hono } from "hono"
import { serveStatic } from "hono/serve-static"
import { deleteClip } from "~/api/routes/delete"
import { handleError } from "~/api/routes/error"
import { getClip } from "~/api/routes/get"
import { postClip } from "~/api/routes/post"

const app = new Hono()

app.use("*", handleError)
app.use("*", serveStatic())
app.get("/api/get", getClip)
app.post("/api/add", postClip)
app.delete("/api/del", deleteClip)

app.fire()
