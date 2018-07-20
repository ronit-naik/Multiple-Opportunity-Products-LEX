@isTest
class OppProductsTestClass 
{
    static testMethod void testGetProducts()
    {
        // First, set up test price book entries.
        // Insert a test product.
        Product2 prod = new Product2(Name = 'Laptop X200', 
            Family = 'Hardware');
        insert prod;
        
        // Get standard price book ID.
        // This is available irrespective of the state of SeeAllData.
        Id pricebookId = Test.getStandardPricebookId();
        
        // 1. Insert a price book entry for the standard price book.
        // Standard price book entries require the standard price book ID we got earlier.
        PricebookEntry standardPrice = new PricebookEntry(
            Pricebook2Id = pricebookId, Product2Id = prod.Id,
            UnitPrice = 10000, IsActive = true);
        insert standardPrice;
        
         // Create a custom price book
        Pricebook2 customPB = new Pricebook2(Name='Custom Pricebook', isActive=true);
        insert customPB;
        
        // 2. Insert a price book entry with a custom price.
        PricebookEntry customPrice = new PricebookEntry(
            Pricebook2Id = customPB.Id, Product2Id = prod.Id,
            UnitPrice = 12, IsActive = true);
        insert customPrice;
        customPrice = [SELECT Name,Pricebook2Id,Product2Id,UnitPrice FROM PricebookEntry WHERE ID=:customPrice.Id LIMIT 1];
        
        Account a = new Account(Name = 'Test Account');
        insert a;
        
        Opportunity testOpp = new Opportunity();
        testOpp.Name = 'Test Opp'; 
        testOpp.AccountId = a.Id;
        testOpp.PriceBook2Id = customPB.Id;
        testOpp.StageName = 'Qualified';
        testOpp.CloseDate = date.today()+1;
        insert testOpp;
        OppProductsController.getProducts('10', '15', testOpp.Id);
        String strJSON = '[{"flag":true,"pbe":{"Name":"'+customPrice.Name+'","ProductCode":"H-36378","UnitPrice":12,"Pricebook2Id":"'+customPB.Id+'","Product2Id":"'+prod.Id+'","Id":"'+customPrice.Id+'","Pricebook2":{"Name":"Custom Pricebook","Id":"'+customPb.Id+'"},"Product2":{"Family":"Product","Id":"'+prod.Id+'"}},"quantity":1,"salesPrice":"299"}]';
        SYstem.debug('strJSON::'+strJSON);
        OppProductsController.saveProductsAction(strJSON,testOpp.Id);
        
    }
   
}