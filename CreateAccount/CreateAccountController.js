({
  
      fetchAcc : function(component, event, helper) {
       component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text' },
                {label: 'Industry', fieldName: 'Industry', type: 'text' },
                {label: 'Phone', fieldName: 'Phone', type: 'Phone' },
                {label: 'Website', fieldName: 'Website', type: 'url' },
                {label: 'Rating', fieldName: 'Rating', type: 'Picklist'}
            
            ]);
        var action = component.get("c.fetchAllAccounts");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
            
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    newPopup : function(component, event, helper){
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
    },
    
    saveModal : function(component, event, helper){
        var regForm = component.get("v.accForm");
        var action = component.get("c.saveDetails");
        action.setParams({regForm1  : regForm});
        action.setCallback(this, function(response) {
            var state = response.getState();          
            if (state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
                var cmpTarget = component.find('Modalbox1');
                var cmpBack = component.find('Modalbackdrop');
                $A.util.removeClass(cmpBack,'slds-backdrop--open');
                $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log(response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    closeNewModal : function(component, event, helper){
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    },
    doInit: function(component, event, helper) {
        //Call apex class method
        var action = component.get('c.countAccount');
        action.setCallback(this, function(response) {
            //Get state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
                component.set('v.accCount', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },      
})