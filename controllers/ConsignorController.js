const Consignor = require("../model/Consignor")
const authMiddleware=require("../middleware/Authmiddleware")

const getConsignor = async (req, res) => {
    
    try {
       
       const { search } = req.query
        const regexQuery = { $regex: search, $options: "i" };
        
        if (search !== "") {
            const result = await Consignor.find({
                $or: [
                    { drivername: regexQuery },
                    { vehicleno: !isNaN(search) ? Number(search) : null },
                    { driverphone: !isNaN(search) ? Number(search) : null },
                    { address: regexQuery },
                ],
            });
        }
        
    } catch (err) {
        return res.status(200).json({ message: "failed" })
    }
}


const createConsignor = async (req, res) => {
    console.log(req.body)
   
    try {
        await authMiddleware(req, res)
        console.log(req)
        const result = await Consignor.create({ ...req.body })
        return res.status(200).send({ message: result})
    } catch (err) {
        return res.status(404).send({ message: "failed" })
    }
}


const deleteConsignor=async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Consignor.findByIdAndDelete(id)
        return res.status(200).send({message:"successfully deleted"})
    } catch (err) {
        return res.status(404).json({error:"failed"})
   }
}

const updateConsignor = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params;
        const {name,address,place,phone,contactPerson,gstno,mail,transport}=req.body
        const result = await Consignor.findByIdAndUpdate(id, { ...req.body })
        return res.status(200).send({ message: result})
    } catch (err) {
        return res.status(404).json({error:"failed"})
        
    }
}




module.exports = {
    getConsignor,createConsignor,deleteConsignor,updateConsignor
}