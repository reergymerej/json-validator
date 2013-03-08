define(function(){

	var currentTest = -1;

	var tests = [
		// {
		// 	test: 'POS button response',
		// 	url: 'WPOSNavServlet.do',
		// 	query: '',
		// 	post: {
		// 		data: JSON.stringify({
		// 			guid:"/POS/RightPanel/Types/Layaway"
		// 		})
		// 	}
		// },
		// {
		// 	test: 'cache retrieval',
		// 	url: 'RetrievalCachedDropDownDataServlet.do',
		// 	query: '',
		// 	post: {cachedDropDownData:'DISCOUNT REASON'}
		// },
		// {
		// 	test: 'custom buttons',
		// 	url: 'ListScreenActionDispatcherServlet.do',
		// 	query: '',
		// 	post: {
		// 		PURCHASE_ORDER_ID:315,
		// 		VENDOR_PO:'',
		// 		STORE_ID:1,
		// 		'data-action':'Add Store',
		// 		screenName:'PurchaseOrdersList',
		// 		funcFunctionType:2,
		// 		FunctionName:'PurchaseOrdersListAddStoreBtn'
		// 	}
		// },
		// {
		// 	test: 'lookups - single',
		// 	url: 'LookupDataFieldServlet.do',
		// 	query: '',
		// 	post: {
		// 		data:JSON.stringify([
		// 			{
		// 				dataProperty:"STORE_RECEIPT_NUM",
		// 				dataTable:"",
		// 				value:["925"]
		// 			}
		// 		]),
		// 		screenName:'CUSTPICKUPDTL',
		// 		lookupfunction:'RECEIPTLOOKUP'
		// 	}
		// },
		// {
		// 	test: 'lookups - multiple',
		// 	url: 'LookupDataFieldServlet.do',
		// 	query: '',
		// 	post: {
		// 		data:JSON.stringify([
		// 			{
		// 				dataProperty:"STORE_RECEIPT_NUM",
		// 				dataTable:"",
		// 				value:["15"]
		// 			}
		// 		]),
		// 		screenName:'CUSTPICKUPDTL',
		// 		lookupfunction:'RECEIPTLOOKUP'
		// 	}
		// },
		// {
		// 	test: 'list screen',
		// 	url: 'ListScreenActionDispatcherServlet.do',
		// 	query: 'data-action=Search&screenName=CustomerList&funcFunctionType=@funcFunctionType@&FunctionName=cfSeachCustomer',
		// 	post: {
		// 		'data-action':'Search',
		// 		screenName:'CustomerList',
		// 		funcFunctionType:'@funcFunctionType@',
		// 		FunctionName:'cfSeachCustomer'
		// 	}
		// },
		// {
		// 	test: 'detail screen',
		// 	url: 'DetailScreenJsonServlet.do',
		// 	query: 'screentype=2&data-action=EditDetail&screenName=CUSTOMERDTL&ID=3',
		// }
		{
			test: 'detail screen (new)',
		 	url: 'detail-new.json',
		 	query: '',
		},
		{
			test: 'detail screen (new-test)',
		 	url: 'detail-new-test.json',
		 	query: '',
		},
		// {
		// 	test: 'detail screen (old)',
		//  	url: 'detail-old.json',
		//  	query: '',
		// },
		// {
		// 	test: 'lookup (new)',
		// 	url: 'lookup-new.json',
		// 	query: ''
		// }
	];

	return {
		hasNext: function(){
			return currentTest < tests.length - 1;
		},
		next: function(){
			return tests[++currentTest];
		},
		rewind: function(){
			currentTest = -1;
		}
	};
});