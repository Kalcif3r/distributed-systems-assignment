module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Archive this factory',


  description: 'Archive a factory and returns to /factory once it Archives',


  inputs: {

   id: {
     type: 'number',
     required: true,
   },

 },


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {


    await Factory
   .update(inputs.id)
   .set({
     isDeleted: true,
   })

   let factories = await Factory
   .find({
     where: {isDeleted: false}
   })
   .intercept((err)=>{
     err.message = 'Uh oh: '+ err.message
     return err;
   })

    return exits.success({
      message: "Record deleted successfully",
      factories: factories,
    });

  }


};
