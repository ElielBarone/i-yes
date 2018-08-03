import {create} from 'apisauce'

const transactionBody = {"query": { "match": { "operation": "TX" } }}
const totalInvoiced = { 
	"size": 0,
	"query": { "match": { "operation": "TX" } },
    "aggs" : {"total" : {"sum": {"field":"payload.amount", "script" : { "source": "_value / 100"}}}}
}


//const mockIndicators = [{type: 'Donut', title:"Transações Efetuadas",    value: 120, options:{valueField: "count"} ,goal:4000, url: "http://35.168.102.55:9200/event_log/doc/_count", apiMethod: 'POST', apiBody: transactionBody},
  //                      {type: 'Donut', title:"Faturamento das Transações",      value: 80, options:{valueField: "aggregations.total.value", format: 'K'},  goal:500000, url: "http://35.168.102.55:9200/event_log/doc/_search" , apiMethod: 'POST', apiBody: totalInvoiced}];

const mockIndicators = [{type: 'Donut', title:"Transações Efetuadas",    value: 120, options:{valueField: "count"} ,goal:10000, url: " http://demo1566946.mockable.io/quantity", apiMethod: 'POST', apiBody: transactionBody},
                        {type: 'Donut', title:"Faturamento das Transações",      value: 80, options:{valueField: "aggregations.total.value", format: 'K'},  goal:500000, url: "http://demo1566946.mockable.io/income" , apiMethod: 'POST', apiBody: totalInvoiced}];
                        

const getIndicators = (userToken) => {
    return mockIndicators;
}

const getIndicatorData = (url, method, body, userToken) => {
    const indicatorApi = create({baseURL:url});
    
    switch (method) {
        case 'POST':
            return indicatorApi.post('', body);           
        default:
            return indicatorApi.get('');            
    }
    
      
}

export default {getIndicators, getIndicatorData};