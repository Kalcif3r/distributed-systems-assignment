module.exports = {

  friendlyName: 'Create this factory',


  description: 'Creates a factory and returns to /factory once it Creates',

  inputs:{

    userID: {
      type: 'string',
      required: true,
    },

    factoryID: {
      type: 'string',
      required: true,
    },

  },

  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    await User.addToCollection(inputs.userID,'factoryID')
    .members(inputs.factoryID)
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    // let user = await User.findOne(inputs.userID).populate('factoryID')
    // console.log('plog -- user',user)

    return exits.success('/Factory')



  }


};
