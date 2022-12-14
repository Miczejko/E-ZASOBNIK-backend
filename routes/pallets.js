const express = require("express");
const router = express.Router();
const Pallet = require("../models/pallet");

// get Pallet
router.get("/:id", async (req, res) => {
    const pallets = await Pallet.find({userId: req.params.id});
    res.json(pallets);
})


// new Pallet
router.post("/new", async (req, res) => {
    const newPallet = new Pallet(
            req.body
    );
    const savedPallet = await newPallet.save();
    res.json(savedPallet);
});

// getter by id ._.
router.get("/get/:id", async (req, res) => {
    const p = await Pallet.findById({ _id : req.params.id });
    res.json(p);
});

// delete by id O.o
router.delete("/delete/:id", async (req, res) => {
    const pDelete = await Pallet.findByIdAndDelete({ _id : req.params.id });
    res.json(pDelete);
});


// update pallet
router.put('/update/:id', async (req, res) => {
    const filter = { _id: req.params.id }; // filter for finding what to update
    const update =  req.body;  // everything to change in json
    
    let pUpdated = await Pallet.findOneAndUpdate(filter, update, {  //updating
      returnOriginal: false
    });

    res.json(pUpdated);
  })


// subject: "Art. Sportowe",
//             status: "IN SOLD",
//             buy_date: "05.09.2022",
//             sold_date: "...",
//             value: -200

module.exports = router;