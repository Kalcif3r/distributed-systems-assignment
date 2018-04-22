module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View all inventory',


  description: 'Display "inventory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    // return all records including the new & non-deleted inventory items
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

    sails.log('cheeses : ',cheeses)

    // return to view
    return exits.success({
      message: '',
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
