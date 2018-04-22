module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this inventory',


  description: 'Update a inventory and returns tp /inventory once it Updates',

  inputs: {

    id: {
      type: 'number',
      required: true,
    },

    factoryID: {
      type: 'number',
      required: true,
    },

    inventoryID: {
      type: 'number',
      required: true,
    },

    stock: {
      type: 'number',
      required : true,
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    // update inventory
    await Inventory
    .update(inputs.id)
    .set(inputs)

    // return all non-deleted inventory items
    let inventory = await Inventory
    .find({
      where: {isDeleted: false}
    })
    .populate('factoryID')
    .populate('cheeseID')
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    // return all factories and cheeses for the dropdowns to process
    let factories = await Factory
    .find({
      where: {isDeleted: false}
    })

    let cheeses = await Cheese
    .find({
      where: {isDeleted: false}
    })

    // return view
    return exits.success({
      message:'inventory has been updated',
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
