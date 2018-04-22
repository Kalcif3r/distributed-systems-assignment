module.exports = {

  friendlyName: 'Archive this cheese',


  description: 'Archive a cheese and returns tp /cheese once it Archives',

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
    await Cheese
    .update(inputs.id)
    .set({
      isDeleted: true,
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    return exits.success('/Cheese');

  }


};
