import express from "express"
import cors from "cors"
import helmet from "helmet";
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/",
    credentials: true
}))
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

// app.use(helmet({
//   contentSecurityPolicy: false
// }));

import userRouter from "./routes/user.route.js"
import productsRouter from "./routes/products.route.js"
import trendingRouter from "./routes/trending.route.js"
import availableCollectionRouter from "./routes/availableCollection.route.js"
import galleryRouter from "./routes/gallary.route.js"
import fixImageRouter from "./routes/fiximg.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/trending", trendingRouter)
app.use("/api/v1/availablecollections", availableCollectionRouter)
app.use("/api/v1/gallery", galleryRouter)
app.use("/api/v1/fiximage", fixImageRouter)

app.get("/", (req, res) => {
    res.send("working")
})


export { app }