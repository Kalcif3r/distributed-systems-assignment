module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER
  // this is a POST request and therefore it expects to see INPUTS


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

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/view-all',
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

    return exits.success({
      message: "new record created~!",
    });

  }


};
