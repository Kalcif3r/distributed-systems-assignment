module.exports = {

  friendlyName: 'Create this inventory',


  description: 'Creates a inventory and returns to /inventory once it Creates',


  inputs: {

    factoryID: {
      type: 'number',
      required: true,
    },

    cheeseID: {
      type: 'number',
      required: true,
    },

    stock: {
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

    // creates a new inventory record
    await Inventory
    .create(inputs)
    .fetch()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    //Return to view-all
    return exits.success('/Inventory')

  }


};
