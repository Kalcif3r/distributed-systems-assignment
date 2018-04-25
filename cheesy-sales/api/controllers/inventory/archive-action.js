module.exports = {

  friendlyName: 'Archive this inventory',


  description: 'Archive a inventory and returns tp /inventory once it Archives',

  inputs: {

    id: {
      type: 'number',
      required: true,
    },

  },

  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    // archive the object
    let blah = await Inventory
    .update(inputs.id)
    .set({
      isDeleted: true,
    })
    .fetch()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

  

    //Return to view-all
    return exits.success('/Inventory')

  }


};
