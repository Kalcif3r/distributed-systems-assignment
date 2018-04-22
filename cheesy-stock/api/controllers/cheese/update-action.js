module.exports = {

  friendlyName: 'Update this cheese',


  description: 'Update a cheese and returns tp /cheese once it Updates',

  inputs: {

    id: {
      type: 'number',
      required: true,
    },

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

    isDeleted: {
      type: 'boolean',
      defaultsTo: false,

    },
  },

  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    sails.log(inputs)

    await Cheese
    .update(inputs.id)
    .set(inputs)
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    return exits.success('/Cheese')

  }


};
