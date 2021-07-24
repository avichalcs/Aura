({
      
    doInit: function(component, event, helper) {
        helper.createObjectDataContact(component, event);
        helper.createObjectDataAccount(component, event);
    },
    
    
    
 
  
    Save: function(component, event, helper) {
       
        if (helper.validateRequiredContact(component, event) ) {
            
            var action = component.get("c.saveAccConOppRecord");
            action.setParams({
                "acc":component.get("v.Acc"),
                "conList": component.get("v.contactList"),
                
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                //alert(response.getReturnValue);
                if (state === "SUCCESS") {
                   
                    
                    //component.set("v.Acc");
                    //helper.createObjectDataAccount(component, event);
                    
                    component.set("v.contactList", []);
                    helper.createObjectDataContact(component, event);
                    
                   
                    alert('Records created successfully !! ');
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },
 
    
    
    
    
    
    // function for create new object Row in Contact List 
    addNewContactRow: function(component, event, helper) {
        // call the comman "createObjectData" helper method for add new Object Row to List  
         helper.createObjectDataContact(component, event);
    },
    
    
    
   
    removeDeletedContactRow: function(component, event, helper) {
         
        var index = event.getParam("indexVar");
          
        var AllRowsList = component.get("v.contactList");
        AllRowsList.splice(index, 1);
         
        component.set("v.contactList", AllRowsList);
    },
 
 
})