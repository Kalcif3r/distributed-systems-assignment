module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Archive this inventory',


  description: 'Archive a inventory and returns tp /inventory once it Archives',

  inputs: {

    id: {
      type: 'number',
      required: true,
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    // archive the object
    await Inventory
    .update(inputs.id)
    .set({
      isDeleted: true,
    })

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

    return exits.success({
      message: 'record deleted~!',
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
