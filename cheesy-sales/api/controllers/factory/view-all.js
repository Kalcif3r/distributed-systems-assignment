module.exports = {

  friendlyName: 'View all factory',


  description: 'Display "factory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    let factories = await Factory
    .find({
      where:{isDeleted:false}
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })



    return exits.success({
      factories: factories,
    });

  }


};
