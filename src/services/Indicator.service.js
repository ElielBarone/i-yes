import {create} from 'apisauce'

const transactionBody = {"query": { "match": { "operation": "TX" } }}
const totalInvoiced = { 
	"size": 0,
	"query": { "match": { "operation": "TX" } },
    "aggs" : {"total" : {"sum": {"field":"payload.amount", "script" : { "source": "_value / 100"}}}}
}

const activeTerminals = {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          { "match": {  "operation": "TX" }},
          { "range": { "@timestamp": { "gte": "now-30d" }}}
        ]
      }
    },
    "aggs" : {
          "distinct_terminals" : {
              "cardinality" : {
                "field" : "payload.serial_number.keyword"
              }
          }
      }
  }


const mockIndicators = [{type: 'Donut', title:"Transações Efetuadas",            value: 0, options:{valueField: "count"} ,goal:10000, apiUrl: " http://35.168.102.55:9200/event_log/doc/_count", apiMethod: 'POST', apiBody: transactionBody},
                        {type: 'Donut', title:"Faturamento das Transações",      value: 0, options:{valueField: "aggregations.total.value", format: 'K'},  goal:500000, apiUrl: "http://35.168.102.55:9200/event_log/doc/_search" , apiMethod: 'POST', apiBody: totalInvoiced},
                        {type: 'Number', title:"POS ativas",   info: "São consideradas ativas as POS que transacionaram nos últimos 30 dias",                   value: 0, options:{valueField: "aggregations.distinct_terminals.value"},  apiUrl: "http://35.168.102.55:9200/event_log/doc/_search" , apiMethod: 'POST', apiBody: activeTerminals}];

/*
const mockIndicators = [{type: 'Donut', title:"Transações Efetuadas",            value: 0, options:{valueField: "count"} ,goal:10000, apiUrl: " http://demo1566946.mockable.io/quantity", apiMethod: 'POST', apiBody: transactionBody},
                        {type: 'Donut', title:"Faturamento das Transações",      value: 0, options:{valueField: "aggregations.total.value", format: 'K'},  goal:500000, apiUrl: "http://demo1566946.mockable.io/income" , apiMethod: 'POST', apiBody: totalInvoiced},
                        {type: 'Number', title:"POS ativas",   info: "São consideradas ativas as POS que transacionaram nos últimos 30 dias",                   value: 0, options:{valueField: "aggregations.distinct_terminals.value"},  apiUrl: "http://demo1566946.mockable.io/active-pos" , apiMethod: 'POST', apiBody: activeTerminals}];
      */                  

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