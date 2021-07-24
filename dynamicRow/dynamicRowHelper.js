({
    createObjectDataContact: function(component, event) {  
        var RowItemList = component.get("v.contactList");
        RowItemList.push({
            'sobjectType': 'Contact',
            'FirstName': '',
            'LastName': '',
            'Phone': ''
        });
        // set the updated list to attribute (contactList) again    
        component.set("v.contactList", RowItemList);
    },
    
    
    createObjectDataAccount: function(component, event) {
     
        var RowItem = component.get("v.Acc");
        RowItem.push({
            'sobjectType': 'Account',
            'Name': '',
            'Phone': '',
            'Email': ''
        });
        
        component.set("v.Acc", RowItem);
    },
    
   






   
    validateRequiredAccount: function(component, event) {
        var isValid = true;
        var allContactRows = component.get("v.Acc");
        for (var indexVar = 0; indexVar < allContactRows.length; indexVar++) {
            if (allContactRows[indexVar].Name == '') {
                isValid = false;
                alert('First Name Can\'t be Blank on Row Number ' + (indexVar + 1));
            }
        }
        return isValid;
    },



    
   
    validateRequiredContact: function(component, event) {
        var isValid = true;
        var allContactRows = component.get("v.contactList");
        for (var indexVar = 0; indexVar < allContactRows.length; indexVar++) {
            if (allContactRows[indexVar].FirstName == '') {
                isValid = false;
                alert('First Name Can\'t be Blank on Row Number ' + (indexVar + 1));
            }
        }
        return isValid;
    },
    
})