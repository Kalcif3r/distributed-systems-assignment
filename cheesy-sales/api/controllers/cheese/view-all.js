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

    return exits.success({
      message:'',
    });

  }


};
