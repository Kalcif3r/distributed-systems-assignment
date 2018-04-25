module.exports = {

  friendlyName: 'Update this inventory',


  description: 'Update a inventory and returns tp /inventory once it Updates',

  inputs: {

    id: {
      type: 'number',
      required: true,
    },

    // factoryID: {
    //   type: 'number',
    //   required: false,
    // },
    //
    // inventoryID: {
    //   type: 'number',
    //   required: false,
    // },

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

    // update inventory
    await Inventory
    .update(inputs.id)
    .set({
      stock: inputs.stock
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    //Return to view-all
    return exits.success('/Inventory')

  }


};
