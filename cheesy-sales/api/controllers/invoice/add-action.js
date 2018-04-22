module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Create this invoice',


  description: 'Creates a invoice and returns to /invoice once it Creates',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
    }

  },


  fn: async function (inputs, exits) {

//
// -- User attempts to add an item to the list


//                !!!!!!!!!!!!!!!! AJAX??? !!!!!!!!!!!!!!!
// -----> cheese ID + quantity + factory is checked against the inventory to see if it has enough
// -----> if yes, then continue, else, send a notification saying oops. no k sorry bye.
// -----> at the end of adding all the inventory items send it to the sails server


// -----> the sails server then rechecks all the items
// --------> if still has enough items, then it locks the resource and deducts the item.
// -----> once all items are deducted,
// -----> add all the records to the InvoiceItemTable
// -----> return an OK.
//


    let fakeObject = {
      total : 300,
      invoiceItems : [
        {
          factoryID : 60,
          cheeseID: 70,
          quantity: 1,
          price: 100,
        },
        {
          factoryID : 60,
          cheeseID: 60,
          quantity: 2,
          price: 200,
        },
      ]
    }



    var flaverr = require('flaverr');

    await sails.getDatastore()
    .transaction(async (db, proceed)=> {

      fakeObject.invoiceItems.forEach(async (invoiceItem) => {

        var inventoryItem = await Inventory.findOne({
          where: {
            cheeseID: invoiceItem.cheeseID,
            factoryID: invoiceItem.factoryID
          }
        })
        .usingConnection(db);

        await sails.log('Selected inventory record: ', inventoryItem)

        if (inventoryItem.stock <= invoiceItem.quantity) {
          let err = flaverr('E_INSUFFICIENT_STOCKS', new Error('Oops, No. K sorry bye'))
          sails.log('E_INSUFFICIENT_STOCKS')
          return proceed(err)
        }

        else if(inventoryItem.isBeingUpdated == false){

          await Inventory.update(inventoryItem.id)
           .set({isBeingUpdated: true})
           .usingConnection(db)
          await sails.log('isBeingUpdated switched to TRUE')

          await Inventory.update(inventoryItem.id)
          .set({stock: inventoryItem.stock-invoiceItem.quantity})
          .usingConnection(db)
          await sails.log('The stock was reduced!')


          await Inventory.update(inventoryItem.id)
          .set({isBeingUpdated: false})
          .usingConnection(db)
          await sails.log('isBeingUpdated switched to FALSE')
        }

        else {
          let err = flaverr('E_RECORD_BEING_UPDATED', new Error('Welp someone is accessing it. Sorry'))
          return proceed(err)
        }

      })

      return proceed()

    })
    .intercept('E_INSUFFICIENT_STOCKS', ()=>'badRequest')
    .intercept('E_RECORD_BEING_UPDATED', ()=>'notFound');

    // respond with a 200:
    return exits.success();

  }


};

function hoisted (inventoryItem){

}
