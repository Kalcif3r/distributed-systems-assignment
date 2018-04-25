module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View all invoice',


  description: 'Display "invoice" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
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

    // only returns factories the user is allowed to see
    let factories = await Factory
    .find({
      where:{
        isDeleted:false,
        id: factoryIDArray
      }
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    //select all invoices
    let invoices = await Invoice.find({
      where:{ isDeleted : false }
    })
    .populate('invoiceItemID')
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    let cheeses = await Cheese.find({
      where:{ isDeleted : false }
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    console.log('plog -- invoices',JSON.stringify(invoices))


    return exits.success({
      factories:factories,
      invoices: invoices,
      cheeses: cheeses,
    });

  }


};
