module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this inventory',


  description: 'Update a inventory and returns tp /inventory once it Updates',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/update-view',
    }

  },


  fn: async function (inputs, exits) {

    let inventoryID = this.req.params.inventoryID

    let inventory = await Cheese.findOne(inventoryID)
    .populate('factoryID')
    .populate('cheeseID')

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
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
