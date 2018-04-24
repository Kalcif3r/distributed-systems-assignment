module.exports = {

  friendlyName: 'View all factory',


  description: 'Display "factory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
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

    let users = await User
    .find({
      where:{isDeleted:false}
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })



    return exits.success({
      users: users,
      factories: factories,
    });

  }


};
