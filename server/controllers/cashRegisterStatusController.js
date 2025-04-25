const CashRegisterStatus = require("../models/CashRegisterStatus")

const getAllCashRegisterSatus = async (req, res) => {
    const cashregistersatuses = await CashRegisterStatus.find().lean()
    if (!cashregistersatuses?.length) {
        return res.status(400).json({ message: 'No cashregistersatus found' })
    }
    res.json(cashregistersatuses)
}

const getCashRegisterStatusById = async (req, res) => {
    const { id } = req.params
    const cashregistersatuses = await CashRegisterStatus.find().lean()
    if (!cashregistersatuses?.length)
        return res.status(400).send("No cashregistersatuses exists")
    if (!id)
        return res.status(400).send("Id is required")
    const cashregistersatus = await CashRegisterStatus.findById(id).lean()
    if (!cashregistersatus)
        return res.status(400).send("This cashregistersatus isn't exists")
    res.json(cashregistersatus)
}

const addCashRegisterStatus = async (req, res) => {
    const { action, sumPerAction ,currentSum} = req.body
    if (!action||!sumPerAction||!currentSum)//currentSum האם נכון לדרוש שליחה של
        return res.status(400).send("All fields are required!!")
    const cashregistersatus = await CashRegisterStatus.create({ currentSum, sumPerAction, action })
    res.json(cashregistersatus)
}
const updateCashRegisterStatus = async (req, res) => {
    const { currentSum, sumPerAction, action, id } = req.body
    if (!id)
        return res.status(400).send("Id is required")
    const cashregistersatuses = await CashRegisterStatus.find().lean()
    if (!cashregistersatuses?.length)
        return res.status(400).send("No cashregistersatuses exists")
    const cashregistersatus = await CashRegisterStatus.findById(id).exec()
    if (!cashregistersatus)
        return res.status(400).send("cashregistersatus is not exists")
    if (currentSum)
        cashregistersatus.currentSum = currentSum
    if (sumPerAction)
        cashregistersatus.sumPerAction = sumPerAction
    if (action)
        cashregistersatus.action = action
    const upcashregistersatus = await cashregistersatus.save()
    res.json(upcashregistersatus)
}

const deleteCashRegisterStatusById = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("Id is required")
    const cashregistersatuses = await CashRegisterStatus.find().lean()
    if (!cashregistersatuses?.length)
        return res.status(400).send("No cashregistersatuses exists")
    const cashregistersatus = await CashRegisterStatus.findById(id).exec()
    if (!cashregistersatus)
        return res.status(400).send("cashregistersatus is not exists")
    const result = await cashregistersatus.deleteOne()
    res.send(result)
}
module.exports = { getAllCashRegisterSatus, getCashRegisterStatusById, addCashRegisterStatus, updateCashRegisterStatus, deleteCashRegisterStatusById }