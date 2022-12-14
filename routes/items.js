const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const Pallet = require("../models/pallet");


// get items from pallet
router.get("/:id", async (req, res) => {
    const items = await Item.find({palletId: req.params.id});
    res.json(items);
})



router.post("/new", async (req, res) => {
  console.log(req.body)
    const newItem = new Item(
            req.body
    );
    const savedItem = await newItem.save();
    res.json(savedItem);
});

// getter by id ._.
router.get("/get/:id", async (req, res) => {
    const i = await Item.findById({ _id : req.params.id });
    res.json(i);
});

// delete by id O.o
router.delete("/delete/:id", async (req, res) => {
    const itemToDelete = await Item.findById({ _id : req.params.id });
    const pallet = await Pallet.findById({ _id : itemToDelete.palletId });

    if(itemToDelete.state=="SOLD"){
        const filter = { _id: itemToDelete.palletId }; // filter for finding what to update
        const update =  {value: pallet.value - itemToDelete.price};  // everything to change in json
        
        let pUpdated = await Pallet.findOneAndUpdate(filter, update, {  //updating
          returnOriginal: false
        });
    }
    const iDelete = await Item.findByIdAndDelete({ _id : req.params.id });
    res.json(iDelete);

});


// update Item
router.put('/update/:id', async (req, res) => {
    const itemToEdit = await Item.findById({ _id : req.params.id });
    const pallet = await Pallet.findById({ _id : itemToEdit.palletId });

    if(itemToEdit.state!="SOLD"){       // Checking if item is changing to SOLD
        if(req.body.state=="SOLD"){
            const filter = { _id: itemToEdit.palletId };
            const update =  {value: pallet.value + req.body.price};
            
            let pUpdated = await Pallet.findOneAndUpdate(filter, update, {  //updating
              returnOriginal: false
            });
        }
    }
    else{
        if(req.body.state!="SOLD"){
            const filter = { _id: itemToEdit.palletId };
            const update =  {value: pallet.value - itemToEdit.price};
            
            let pUpdated = await Pallet.findOneAndUpdate(filter, update, {  //updating
              returnOriginal: false
            });
        }
    }

    const filter = { _id: req.params.id }; // filter for finding what to update
    const update =  req.body;  // everything to change in json
    
    let iUpdated = await Item.findOneAndUpdate(filter, update, {  //updating
      returnOriginal: false
    });

    res.json(iUpdated);
  })




module.exports = router;