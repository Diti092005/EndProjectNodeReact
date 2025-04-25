const express=require("express")
const router=express.Router()
const CashRegisterStatusController=require("../controllers/cashRegisterStatusController")
router.get("/",CashRegisterStatusController.getAllCashRegisterSatus)
router.get(":id",CashRegisterStatusController.getCashRegisterStatusById)
router.post("/",CashRegisterStatusController.addCashRegisterStatus)
router.put("/",CashRegisterStatusController.updateCashRegisterStatus)
router.delete("/:id",CashRegisterStatusController.deleteCashRegisterStatusById)
module.exports=router

