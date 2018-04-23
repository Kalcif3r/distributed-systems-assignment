module.exports = {

  friendlyName: 'Create this inventory',


  description: 'Creates a inventory and returns to /inventory once it Creates',


  inputs: {

    //takes an object as an input?

  },

  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    var flaverr = require('flaverr');
    sails.log('right outside of transaction')
    await sails.getDatastore()
    .transaction(async (db, proceed)=> {

      let {invoiceItems} = fakeObject

      console.log('plog -- invoiceItem.length',invoiceItems.length)

      // this FOR loop is like a forEach loop except it knows when it fucks up by checking for err
      for( let i = 0, err= false; i < invoiceItems.length && err === false; i++ ) {
        await Inventory.findOne({
          where: {
            cheeseID: invoiceItems[i].cheeseID,
            factoryID: invoiceItems[i].factoryID,
          }
        }).usingConnection(db)
        .then( async result => {
          console.log('plog -- result.id exists: ',result.id)
          if( result.isBeingUpdated ){
            // this is where the try again a few times would go if we did the one that tries again like three times.
            await function (){err = true}()
            return proceed ( flaverr('E_BEING_UPDATED', new Error('ERR: this record is being touched gently')) )
          }

          // if not being updated. then LOCK THAT SHIT DOWN.
          let updatedResult = await Inventory.update(result.id)
          .set({
            isBeingUpdated: true
          })
          .usingConnection(db)
          .fetch()
          await function () {
            console.log('plog -- result in update for switching to true: ',updatedResult)
            if (_.isEmpty(updatedResult)) {
              return proceed ('E_UPDATE_ERROR', new Error('An error for Update occured'))
            }
          }()

          // check if the stock can actually be updated
          if (  result.stock < invoiceItems[i].quantity ) {
            await function (){err = true}()
            return proceed ('E_NOT_ENOUGH_STOCK_ERROR', new Error('Not enough stock for this transaction in factory:'
               + result.factoryID + ' for cheeseID' + result.cheeseID))
          }


          // update the stock
          updatedResult = await Inventory.update(result.id)
          .set({
            stock: result.stock - invoiceItems[i].quantity
          })
          .usingConnection(db)
          .fetch()
          await function () {
            console.log('plog -- result in update of stock: ',updatedResult)
            if (_.isEmpty(updatedResult)) {
              return proceed ('E_UPDATE_ERROR', new Error('ERR: An error for Update occured'))
            }
          }()


          // once done being updated set it to false
          updatedResult = await Inventory.update(result.id)
          .set({
            isBeingUpdated: false
          })
          .usingConnection(db)
          .fetch()
          await function () {
            console.log('plog -- result in update for switching back to false: ',updatedResult)
            if (_.isEmpty(updatedResult)) {
              return proceed ('E_UPDATE_ERROR', new Error('ERR: An error for Update occured'))
            }
          }()

        }) // end of finding an inventory ID

      } // end of for loop


      return proceed()
    })
    .intercept('E_UPDATE_ERROR', ()=>{sails.log('ERR: A record has failed to update'); return'badRequest'} )
    .intercept('E_NOT_ENOUGH_STOCK_ERROR', ()=>{sails.log('ERR: Not enough stock for this transaction in factory'); return'badRequest'} )
    .intercept('E_BEING_UPDATED', ()=>{sails.log('ERR: A record is being touched gently'); return'badRequest'} )
    // .intercept('E_BEING_UPDATED', ()=>'badRequest')
    .intercept('E_RECORD_BEING_UPDATED', ()=>'notFound');

    sails.log('at the end')
    // respond with a 200:
    return exits.success();

  } // end of the entire FN function


};
