module.exports = {

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
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {


    await Factory
   .update(inputs.id)
   .set({
     isDeleted: true,
   })
   .intercept((err)=>{
     err.message = 'Uh oh: '+ err.message
     return err;
   })

    return exits.success('/Factory')

  }


};
