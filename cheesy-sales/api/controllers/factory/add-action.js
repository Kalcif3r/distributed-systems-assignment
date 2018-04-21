module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Create this factory',


  description: 'Creates a factory and returns to /factory once it Creates',

  inputs:{

    factoryLocation: {
      type: 'string',
      required: true,
    },

    factoryCountry: {
      type: 'string',
      required: true,
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    let newFactory = await Factory
    .create(inputs)
    .fetch()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    let message = "Factory successfully added"

    let factories = await Factory
    .find()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })



    return exits.success({
      message: "Factory successfully added",
      factories: factories,
    });



  }


};
