module.exports = {

  friendlyName: 'View all inventory',


  description: 'Display "inventory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    // gets the user id populated with factories theyre assigned to
    let user = await User
    .findOne({
      id: this.req.session.userId
    })
    .populate('factoryID')

    // extracts only the factory id's for a user
    let factoryIDArray = user.factoryID.map( factory => { return factory.id })
    console.log('plog -- factoryIDArray',factoryIDArray)

    // return all records including the new & non-deleted inventory items
    let inventory = await Inventory
    .find({
      where: {
        isDeleted: false,
        factoryID: factoryIDArray,
      }
    })
    .populate('factoryID')
    .populate('cheeseID')
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })
    console.log('Inventory records retrived: ', inventory);

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
      inventory: inventory,
      factories: factories,
      cheeses: cheeses,
    });

  }


};
