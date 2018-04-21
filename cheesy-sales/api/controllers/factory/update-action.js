module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this factory',


  description: 'Update a factory and returns to /factory once it Updates',

  inputs:{

    id: {
      type: 'number',
      required: true,
    },

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

    await Factory
    .update(inputs.id)
    .set(inputs)


    let factories = await Factory
    .find()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })



    return exits.success({
      message:'Factory has been updated',
      factories: factories,
    });exits.success();

  }


};
