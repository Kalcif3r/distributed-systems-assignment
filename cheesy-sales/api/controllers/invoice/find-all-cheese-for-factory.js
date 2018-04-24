module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View all invoice',


  description: 'Display "invoice" page.',


  exits: {

    success: {
      statusCode: '200',
    }

  },


  fn: async function (inputs, exits) {
    let cheeseInStock = await Inventory.find({
      where: {
        factoryID: this.req.params.factoryID,
        stock: {'>':0}
      }
    }).populate('cheeseID')
    return exits.success(cheeseInStock);

  }


};
