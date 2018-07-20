public class OppProductsController 
{
    
    /*@AuraEnabled
    public static Opportunity getOpp(Id theId){
        system.debug('in get');
        Opportunity opp = [SELECT Id, Name FROM Opportunity WHERE Id = :theId];
        oId = opp.Id;
        return opp;
    }*/
    @AuraEnabled
    public static List<ProductsWrapper> getProducts(String left,String right,String oppid)
    {
        List<ProductsWrapper> pwList = new List<ProductsWrapper>();
        List<PriceBookEntry> pbeList = new List<PriceBookEntry>();
        system.debug('inside');
        system.debug('l1:'+left+'r::'+right);
        double d1 = double.valueOf(left);
        double d2 = double.valueOf(right);
        system.debug('oid in:'+oppid);
        
        Opportunity o = [select Name,PriceBook2Id from Opportunity where Id=:oppid];
        system.debug('prid:'+o.Pricebook2Id);
        pbeList = [select Name,ProductCode,UnitPrice,PriceBook2.Name,Product2.Family from PriceBookEntry where UnitPrice>=:d1 and UnitPrice<=:d2 and PriceBook2Id=:o.Pricebook2Id order by Name];
        system.debug('pbe:'+pbeList);
        
        for(PriceBookEntry pbe:pbeList)
        {
            ProductsWrapper pw = new ProductsWrapper(pbe,false,null,1);
            pwList.add(pw);
        }
        return pwList;
    }
    @AuraEnabled
    public static void saveProductsAction(String idListJSONStr,String oppid)
    {
        List<OpportunityLineItem> oliList = new List<OpportunityLineItem>();
        //system.debug('in save:'+arr);
        system.debug('in save :'+idListJSONStr);
        //idListJSONStr = idListJSONStr.substring(1,idListJSONStr.length()-1);
        //system.debug('in save1 :'+idListJSONStr);
        //Type idArrType=Type.forName('OppProductsController.ProductsWrapper');
    	List<OppProductsController.ProductsWrapper> ids=(List<OppProductsController.ProductsWrapper>) JSON.deserialize(idListJSONStr, List<OppProductsController.ProductsWrapper>.class);
        system.debug('new list:'+ids);
        for(ProductsWrapper pw:ids)
        {
            system.debug('in for');
            OpportunityLineItem oli = new OpportunityLineItem();
            system.debug('after new');
            oli.PricebookEntryId = pw.pbe.Id;
            oli.Quantity = pw.quantity;
            oli.UnitPrice = Double.valueOf(pw.salesPrice);
            oli.OpportunityId = oppid;
      		oliList.add(oli);       
        }
        insert oliList;
        system.debug('oli:'+oliList);
    }
    
    public class ProductsWrapper
    {
        @AuraEnabled
        public PriceBookEntry pbe{get;set;}
        @AuraEnabled
        public boolean flag{get;set;}
        @AuraEnabled
        public String salesPrice{get;set;}
        @AuraEnabled
        public double quantity{get;set;}
        
        public ProductsWrapper(PriceBookEntry pbe,boolean flag,String salesPrice,double quantity)
        {
            this.pbe=pbe;
            this.flag=flag;
            this.salesPrice=String.valueOf(pbe.UnitPrice);
            this.quantity=1;
        }
    }
}