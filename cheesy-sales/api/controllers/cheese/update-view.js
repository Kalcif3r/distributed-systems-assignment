module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this cheese',


  description: 'Update a cheese and returns tp /cheese once it Updates',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/update-view',
    }

  },


  fn: async function (inputs, exits) {

    let cheeseID = this.req.params.cheeseID

    let cheese = await Cheese.findOne(cheeseID)

    return exits.success({
      cheese: cheese,
    });

  }


};
