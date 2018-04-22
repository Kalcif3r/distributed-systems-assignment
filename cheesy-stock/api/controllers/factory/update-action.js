module.exports = {

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
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    await Factory
    .update(inputs.id)
    .set(inputs)
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    return exits.success('/Factory')

  }


};
