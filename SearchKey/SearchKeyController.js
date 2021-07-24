({
     getAccountList: function(component) {
        var action = component.get('c.getAccounts');
        var self = this;
        action.setCallback(this, function(actionResult) {
            component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    searchKeyChange: function(component, event) {
        var searchKey = component.find("searchKey").get("v.value");
        console.log('searchKey:::::'+searchKey);
        var action = component.get("c.findByName");
        action.setParams({
            "searchKey": searchKey
        });
        action.setCallback(this, function(a) {
            component.set("v.accounts", a.getReturnValue());
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