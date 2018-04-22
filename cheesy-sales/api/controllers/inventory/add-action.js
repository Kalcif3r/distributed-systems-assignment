module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER
  // this is a POST request and therefore it expects to see INPUTS


  friendlyName: 'Create this inventory',


  description: 'Creates a inventory and returns to /inventory once it Creates',


  inputs: {

    factoryID: {
      type: 'number',
      required: true,
    },

    cheeseID: {
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

    // creates a new inventory record
    await Inventory
    .create(inputs)
    .fetch()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    // return all records including the new & non-deleted inventory items
    let inventory = await Inventory
    .find({
      where: {isDeleted: false}
    })
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

    // return to view
    return exits.success({
      message: 'new record created~!',
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
