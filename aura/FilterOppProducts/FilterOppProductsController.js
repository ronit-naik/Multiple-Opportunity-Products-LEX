({
    doInit : function(component) {
        console.log('init called');
        /*var theOppId = component.get('v.recordId');
        console.log('id:'+theOppId);
        var IdEvent = $A.get("e.c:SelectedRange");
        IdEvent.setParams({oppId:theOppId});
        
        
        IdEvent.fire();
       */ 
      /*  var action1 = component.get('c.getOpp');
        action1.setParams({
            theId : theOppId 
        });
        
        action1.setCallback(this, function(actionResult){
            console.log("Action1 : Callback");
            console.log(actionResult.getReturnValue());
            component.set("v.theOpp", actionResult.getReturnValue());
        });
        $A.enqueueAction(action1);
     */
    },
    loadFunc : function(component, event, helper) {
        console.log('inside');
        
        //Modal Open
        $('#toggleBtn').click(function(){
            $('#backdrop').addClass('slds-backdrop--open');
            $('#modal').addClass('slds-fade-in-open');
        });
        
    },
    closeModal : function(component,event,helper)
    {
        console.log('in');
        $('#modal').removeClass('slds-fade-in-open');
        $('#backdrop').removeClass('slds-backdrop--open');
    },
    onSelectChange : function(component, event, helper) {
        var selected = component.find("InputSelectDynamic").get("v.value");
        console.log('selected: '+selected);
        component.set("v.pickval",selected);
    },
    
    jsLoaded : function(component, event, helper) {
        console.log('inside');
        
        $('#toggleBtn').click(function(){
            $('#backdrop').addClass('slds-backdrop--open');
            $('#modal').addClass('slds-fade-in-open');
        });
        
        var arr;
        console.log('in');
        
        $("#prices").slider().on('slide', function (ev) {
            
            arr=$('#prices').val();
            console.log('array'+arr);
            //$("p.text").hide();
            $("span.amount", $(".panel-body").parent()).html("range - "+$('#prices').val() );
            console.log('here123 '+$('#prices').val());
        });
        $("#prices").slider().on('slideStop', function (ev) {
            var str=arr.split(',');
            console.log('split:'+str[0]);
            var left = str[0];
            var right = str[1];
            console.log('left: '+left);
            console.log('right: '+right);
            component.set("v.lval1", left);
            component.set("v.rval1", right);
        });
        
        
    },
    sendValues : function(component, event, helper)
    {
        var lval1 = component.get("v.lval1");
        var rval1 = component.get("v.rval1");
        
       
        console.log('button val: '+lval1);
        console.log('button val: '+rval1);
        
        var theOppId = component.get('v.recordId');
        console.log('id:'+theOppId);
        
        var SearchEvent = $A.get("e.c:SelectedRange");
        SearchEvent.setParams({selected_left1:lval1});
        SearchEvent.setParams({selected_right1:rval1});
        SearchEvent.setParams({oppId:theOppId});
        
        SearchEvent.fire();
        
    }
})