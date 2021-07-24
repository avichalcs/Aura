({
    fetchAccHelper : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text' , 
                 cellAttributes: {class: {fieldName: 'colorClass'}}},
                {label: 'Industry', fieldName: 'Industry', type: 'text' , 
                 cellAttributes: {class: {fieldName: 'colorClass'}}},
                {label: 'Phone', fieldName: 'Phone', type: 'Phone' , 
                 cellAttributes: {class: {fieldName: 'colorClass'}}},
                {label: 'Website', fieldName: 'Website', type: 'url ' , 
                 cellAttributes: {class: {fieldName: 'colorClass'}}},
                {label: 'Rating', fieldName: 'Rating', type: 'Picklist ', 
                 cellAttributes: {class: {fieldName: 'colorClass'}}}
            
            ]);
        var action = component.get("c.fetchAccounts");
        action.setParams({
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var records = response.getReturnValue(); 
                for ( var i = 0; i < records.length; i++ ) { 
                if ( records[ i ].Rating === "Hot" )
                    records[ i ].colorClass="hot";
                else if ( records[ i ].Rating === "Warm" )
                    records[ i ].colorClass="warm";
                else if ( records[ i ].Rating === "Cold" )
                    records[ i ].colorClass="cold";
                }
                component.set("v.acctList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})