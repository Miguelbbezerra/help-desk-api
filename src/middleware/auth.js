import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).json({ message: "Usuário não possui token" })
        }
        const token = req.headers['authorization']
        const rawToken = token.replace("Bearer ", "")
        const result = jwt.verify(rawToken, 'secret')
        console.log(result)
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
export default auth