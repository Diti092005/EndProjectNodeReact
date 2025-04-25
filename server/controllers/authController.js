const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const login = async (req, res) => {
    const { userid, password } = req.body
    if (!userid || !password)
        return res.status(400).json({ message: "password and userid are required!!" })
    const foundUser = await User.findOne({ userid }).lean()
    if (!foundUser || !foundUser.active)
        return res.status(401).json({ message: 'Unauthorized' })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "Unauthorized" })
    const userInfo = {
        _id: foundUser._id,
        fullname: foundUser.fullname,
        roles: foundUser.roles,
        userid: foundUser.userid,
        email: foundUser.email,
        phone: foundUser.phone,
        dateOfBirth: foundUser.dateOfBirth,
        address: { street: foundUser.address.street, numOfBulding: foundUser.address.numOfBulding, city: foundUser.address.city }
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accesstoken: accessToken })
}
const register = async (req, res) => {
    const { userid, password, fullname, email, phone, street, numOfBulding, city, dateOfBirth, roles } = req.body
    if (!fullname || !userid || !password) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ userid }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate userid" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { fullname, email, userid, phone, email, address: { city, street, numOfBulding }, dateOfBirth, roles, password: hashedPwd }
    const user = await User.create(userObject)
    if (user) { // Created
        return res.status(201).json({
            message: `New user ${user.userid} created`
        })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
module.exports = { login, register }