module.exports = {

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
      responseType: 'redirect',
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

    return exits.success('/Factory')



  }


};
