module.exports = {

  friendlyName: 'View all inventory',


  description: 'Display "inventory" page.',


  exits: {

    success: {
      statusCode: '200',
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

    sails.log('inventory : ',inventory)

    // return to view
    return exits.success({
      inventory: inventory,
    });

  }


};
