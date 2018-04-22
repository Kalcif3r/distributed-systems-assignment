module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

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
      viewTemplatePath: 'pages/cheese/view-all',
    }

  },


  fn: async function (inputs, exits) {

    sails.log(inputs)
    await Cheese
    .update(inputs.id)
    .set({
      isDeleted: true,
    })

    let cheeses = await Cheese
    .find({
      where: {isDeleted: false}
    })
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })

    return exits.success({
      message: "record archived~!",
      cheeses: cheeses,
    });

  }


};
