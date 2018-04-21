module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

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
      viewTemplatePath: 'pages/cheese/view-all',
    }

  },


  fn: async function (inputs, exits) {

    await Cheese
    .update(inputs.id)
    .set(inputs)

sails.log(inputs)

    let cheeses = await Cheese
    .find({
      where: {isDeleted: false}
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    return exits.success({
      message:'cheese has been updated',
      cheeses: cheeses,
    }); exits.success();

  }


};
