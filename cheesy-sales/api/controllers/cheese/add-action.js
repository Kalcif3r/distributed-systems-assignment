var unirest = require('unirest');

module.exports = {

  friendlyName: 'Create this cheese',


  description: 'Creates a cheese and returns to /cheese once it Creates',


  inputs: {

    cheeseName: {
      type: 'string',
      required: true,
    },

    cheeseDescription: {
      type: 'string',
      required: true,
    },

    cheesePrice: {
      type: 'number',
      required : true,
    },


  },

  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let newRecord = await Cheese
    .create(inputs)
    .fetch()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    let message = "new record created~!"


    return exits.success('/Cheese');

  }


};
