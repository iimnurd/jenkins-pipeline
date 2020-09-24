// created by IIM NUR DIANSYAH
// Deoxys K6 Test Script

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate } from "k6/metrics";
import { randomSeed } from "k6";
import { Counter } from "k6/metrics";


let CounterErrors = new Counter("Total_Error");
let CounterSuccess= new Counter("Total_Success");
let errorRate = new Rate("Error_Rate");
let successRate = new Rate("Success_Rate");

const BASE_URL = 'https://test-api.k6.io';
const USERNAME = 'TestUser';
const PASSWORD = 'SuperCroc2020';
var access_token='';


//load test options
export let options_load = {
  stages: [
    { duration: '1s', target: 5 }, // simulate ramp-up of traffic from 1 to 5 users over 1 s.
    { duration: '2s', target: 5 }, // stay at 5 users for 2 s
    { duration: '1s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: { 
     http_req_duration: ['avg<100', 'p(95)<200'], //response time rata rata 100 ms dan p95 <200
     "Error Rate": ['rate<0.1'], //error nya mesti dibawah 60%
     },
};

//jmeter load test options
export let options_jmeter = {
    vus: 1,
    iterations: 1
  };


//stress test options
export let options_stress_test = {
    stages: [
        { duration: '1s', target: 2 }, // below normal load
        { duration: '3s', target: 2 },
        { duration: '1s', target: 5 }, // normal load
        { duration: '3s', target: 5 },
        { duration: '1s', target: 7 }, // around the breaking point
        { duration: '3s', target: 7 },
        { duration: '1s', target: 8 }, // beyond the breaking point
        { duration: '3s', target: 8 },
        { duration: '1s', target: 0 }, // scale down. Recovery stage.
    ],
    thresholds: { 
       http_req_duration: ['avg<100', 'p(95)<200'], //response time rata rata 100 ms dan p95 <200
       "Error Rate": ['rate<0.1'], //error nya mesti dibawah 60%
       },
  };


  //soak test options
export let options_soak_test = {
    stages: [
    { duration: '2m', target: 5 }, // ramp up to 400 users
    { duration: '3h56m', target: 5 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
    ],
    thresholds: { 
       http_req_duration: ['avg<100', 'p(95)<200'], //response time rata rata 100 ms dan p95 <200
       "Error Rate": ['rate<0.1'], //error nya mesti dibawah 60%
       },
  };


  //spike test options
  export let options_spike_test = {
    stages: [
        { duration: '10s', target: 5 }, // below normal load
        { duration: '1m', target: 5 },
        { duration: '10s', target: 140 }, // spike to 1400 users
        { duration: '3m', target: 140 }, // stay at 1400 for 3 minutes
        { duration: '10s', target: 5 }, // scale down. Recovery stage.
        { duration: '3m', target: 5 },
        { duration: '10s', target: 0 },
    ],
    thresholds: { 
       http_req_duration: ['avg<100', 'p(95)<200'], //response time rata rata 100 ms dan p95 <200
       "Error Rate": ['rate<0.1'], //error nya mesti dibawah 60%
       },
  };



export default () => {
    group('REQUEST 1 (LOGIN)', function () {
        let login_payload = {
            username: USERNAME,
            password: PASSWORD,
        };
    
      
        let authHeaders = {
            headers: {
              
            },
          };
       

         let res = http.request('POST', `${BASE_URL}/auth/token/login/`, login_payload, authHeaders);
         console.log(res.status);
         if(res.status===200){
            access_token = res.json('access');
         }
        console.log(access_token);
    
    
        check(res, {
          'LOGIN SUCCESS': (r) => r.status === 200
        });
    
    
        let contentOK = res.status === 200;
        CounterSuccess.add(contentOK);
        CounterErrors.add(!contentOK);
        errorRate.add(!contentOK);
        successRate.add(contentOK);
       
      });


      sleep(1)
      group('My Crocodile', function () {
          
            access_token = 'Bearer '+ access_token;
            console.log('accse token'+ access_token);
      
          let authHeaders = {
            headers: {
              Authorization: access_token,
            },
          };
         
        // or 
        //  Authorization: `Bearer ${res.json('access')}`

         let res_croco = http.request('GET', `${BASE_URL}/my/crocodiles/`, authHeaders);
         console.log(res_croco.body);
    
    
        check(res_croco, {
          'CROCO PAGE': (r) => r.status === 200
        });
    
    
        let contentOK = res_croco.status === 200;
        CounterSuccess.add(contentOK);
        CounterErrors.add(!contentOK);
        errorRate.add(!contentOK);
        successRate.add(contentOK);
       
     });


};