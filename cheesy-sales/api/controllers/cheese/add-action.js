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

    cheesePrice: {
      type: 'number',
      required : true,
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

    let message = "new record succesfully created~!"

    let cheeses = await Cheese
    .find({
      where: {isDeleted: false}
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

sails.log('cheeses are kkkk',cheeses)


    return exits.success({
      message: "new record created~!",
      cheeses: cheeses,
    });

  }


};
