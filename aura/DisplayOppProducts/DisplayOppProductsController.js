({
    handleSelect : function(component, event, helper) {
        
        var left1 = event.getParam("selected_left1");
        var right1 = event.getParam("selected_right1");
        console.log('selected left value is: '+left1);       
        console.log('selected left value is: '+right1);
        
        var oid = event.getParam("oppId");
        console.log('new id: '+oid);  
        component.set("v.oppId",oid);
        var str = component.get("v.oppId");
        console.log("id in handleselect "+str);
        
        document.getElementById('tab1').style.display = 'block';
        
        var action = component.get("c.getProducts");
        action.setParams({"left": left1 , "right": right1 , "oppid": oid});
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            var rec = response.getReturnValue();
            component.set("v.result", response.getReturnValue());
        });
        $A.enqueueAction(action);
        
    },
    checkedValue : function(component,event)
    {
        var sel = component.get("v.result");
        var select = [];
        console.log('in checked: '+sel[0].flag);
        for(var i=0;i<sel.length;i++)
        {
            console.log(sel[i].flag);
            if(sel[i].flag==true)
            {
                console.log('true2');
                console.log('val:'+sel[i].salesPrice);
                console.log('val:'+sel[i].quantity);
                select.push(sel[i]);
            }
        }
        document.getElementById('tab2').style.display = 'block';
        console.log('new list:'+select[0].flag);
        component.set("v.selected",select);
    },
    clearProducts : function(component,event)
    {
        component.set("v.selected",null);
    },
    deleteProducts : function(component,event)
    {
        var id = event.target.id;
        console.log('id in del: '+id);
        var del = component.get("v.selected");
        var list = [];
        for(var i=0;i<del.length;i++)
        {
            if(id != del[i].pbe.Id)
            {
                console.log('in if');
                list.push(del[i]);
            }
            else
            {
                console.log('in else');
            }
        }
        component.set("v.selected",list);
    },
    saveProducts : function(component,event,helper)
    {
        var save = component.get("v.selected");
        var ids = [];
        console.log(save);
        var oid = component.get("v.oppId");
        console.log("id in SAVE "+oid);
        for(var i=0;i<save.length;i++)
        {
            ids.push(save[i].pbe.Id);
            console.log('save: '+save[i].pbe.Id);
        }
        console.log('ids:'+ids[0]);
        var idListJSON=JSON.stringify(save);
        console.log('json:'+idListJSON);
        var action = component.get("c.saveProductsAction");
        action.setParams({"idListJSONStr" : idListJSON, "oppid": oid});
        action.setCallback(this, function(response) {
            console.log(response.getReturnValue());
            var rec = response.getReturnValue();
            location.reload();
            /*var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": oid
            });*/
            //navEvt.fire();
            //helper.navigate();
            //window.reload(true);
        });
        $A.enqueueAction(action);
    }
})