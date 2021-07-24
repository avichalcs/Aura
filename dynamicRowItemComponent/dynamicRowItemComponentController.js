({
    AddNewContactRow : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
        component.getEvent("addContactRowEVT").fire();     
    },
    
    removeContactRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("deleteContactRowEVT").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    }, 
  
})