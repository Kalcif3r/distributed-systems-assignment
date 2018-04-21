module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View all cheese',


  description: 'Display "cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/view-all',
    }

  },


  fn: async function (inputs, exits) {

    let cheeses = await Cheese
    .find()
    .intercept((err)=>{
      err.message = 'Uh oh: '+ err.message
      return err;
    })


    return exits.success({
      message:'',
      cheeses: cheeses,
    });

  }


};
