(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{DLVw:function(t,e,r){"use strict";r.d(e,"a",(function(){return p}));var s=r("tk/3"),a=r("AytR"),i=r("fXoL");let p=(()=>{class t{constructor(t){this.http=t,this.baseUrl=a.a.baseUrl}list(t,e,r,a){let i=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),i=i.append("sort",`${r}:${a}`)),this.http.get(this.baseUrl+"/api/buyers",{params:i,observe:"response"})}search(t,e,r,a,i){let p=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),p=p.append("sort",`${r}:${a}`)),this.http.post(this.baseUrl+"/api/buyers",{keyword:i},{params:p,observe:"response"})}create(t){return this.http.post(this.baseUrl+"/api/buyer",t)}edit(t){return this.http.get(`${this.baseUrl}/api/buyer/${t}`)}update(t,e){return this.http.put(`${this.baseUrl}/api/buyer/${t}`,e)}remove(t){return this.http.delete(`${this.baseUrl}/api/buyer/${t}`)}}return t.\u0275fac=function(e){return new(e||t)(i.gc(s.b))},t.\u0275prov=i.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"WF//":function(t,e,r){"use strict";r.d(e,"a",(function(){return p}));var s=r("tk/3"),a=r("AytR"),i=r("fXoL");let p=(()=>{class t{constructor(t){this.http=t,this.baseUrl=a.a.baseUrl}list(t,e,r,a){let i=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),i=i.append("sort",`${r}:${a}`)),this.http.get(this.baseUrl+"/api/materials",{params:i,observe:"response"})}search(t,e,r,a,i){let p=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),p=p.append("sort",`${r}:${a}`)),this.http.post(this.baseUrl+"/api/materials",{keyword:i},{params:p,observe:"response"})}create(t){return this.http.post(this.baseUrl+"/api/material",t)}edit(t){return this.http.get(`${this.baseUrl}/api/material/${t}`)}update(t,e){return this.http.put(`${this.baseUrl}/api/material/${t}`,e)}remove(t){return this.http.delete(`${this.baseUrl}/api/material/${t}`)}}return t.\u0275fac=function(e){return new(e||t)(i.gc(s.b))},t.\u0275prov=i.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"a+IK":function(t,e,r){"use strict";r.d(e,"a",(function(){return p}));var s=r("tk/3"),a=r("AytR"),i=r("fXoL");let p=(()=>{class t{constructor(t){this.http=t,this.baseUrl=a.a.baseUrl}list(t,e,r,a){let i=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),i=i.append("sort",`${r}:${a}`)),this.http.get(this.baseUrl+"/api/mining-companies",{params:i,observe:"response"})}search(t,e,r,a,i){let p=(new s.f).set("_page",t).set("_limit",e);return""!==r&&(""===a&&(a="asc"),p=p.append("sort",`${r}:${a}`)),this.http.post(this.baseUrl+"/api/mining-companies",{keyword:i},{params:p,observe:"response"})}create(t){return this.http.post(this.baseUrl+"/api/mining-company",t)}edit(t){return this.http.get(`${this.baseUrl}/api/mining-company/${t}`)}update(t,e){return this.http.put(`${this.baseUrl}/api/mining-company/${t}`,e)}remove(t){return this.http.delete(`${this.baseUrl}/api/mining-company/${t}`)}}return t.\u0275fac=function(e){return new(e||t)(i.gc(s.b))},t.\u0275prov=i.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},kny6:function(t,e,r){"use strict";r.d(e,"a",(function(){return p}));var s=r("tk/3"),a=r("AytR"),i=r("fXoL");let p=(()=>{class t{constructor(t){this.http=t,this.baseUrl=a.a.baseUrl}list(t,e,r,a,i){let p=(new s.f).set("_page",e).set("_limit",r);return""!==a&&(""===i&&(i="asc"),p=p.append("sort",`${a}:${i}`)),this.http.get(`${this.baseUrl}/api/buyer/${t}/drivers`,{params:p,observe:"response"})}search(t,e,r,a,i,p){let n=(new s.f).set("_page",e).set("_limit",r);return""!==a&&(""===i&&(i="asc"),n=n.append("sort",`${a}:${i}`)),this.http.post(`${this.baseUrl}/api/buyer/${t}/drivers`,{keyword:p},{params:n,observe:"response"})}create(t,e){return this.http.post(`${this.baseUrl}/api/buyer/${t}/driver`,e)}edit(t,e){return this.http.get(`${this.baseUrl}/api/buyer/${t}/driver/${e}`)}update(t,e,r){return this.http.put(`${this.baseUrl}/api/buyer/${t}/driver/${e}`,r)}remove(t,e){return this.http.delete(`${this.baseUrl}/api/buyer/${t}/driver/${e}`)}}return t.\u0275fac=function(e){return new(e||t)(i.gc(s.b))},t.\u0275prov=i.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},lSWO:function(t,e,r){"use strict";r.d(e,"a",(function(){return p}));var s=r("tk/3"),a=r("AytR"),i=r("fXoL");let p=(()=>{class t{constructor(t){this.http=t,this.baseUrl=a.a.baseUrl}list(t,e,r,a,i){let p=(new s.f).set("_page",e).set("_limit",r);return""!==a&&(""===i&&(i="asc"),p=p.append("sort",`${a}:${i}`)),this.http.get(`${this.baseUrl}/api/buyer/${t}/trucks`,{params:p,observe:"response"})}search(t,e,r,a,i,p){let n=(new s.f).set("_page",e).set("_limit",r);return""!==a&&(""===i&&(i="asc"),n=n.append("sort",`${a}:${i}`)),this.http.post(`${this.baseUrl}/api/buyer/${t}/trucks`,{keyword:p},{params:n,observe:"response"})}create(t,e){return this.http.post(`${this.baseUrl}/api/buyer/${t}/truck`,e)}edit(t,e){return this.http.get(`${this.baseUrl}/api/buyer/${t}/truck/${e}`)}update(t,e,r){return this.http.put(`${this.baseUrl}/api/buyer/${t}/truck/${e}`,r)}remove(t,e){return this.http.delete(`${this.baseUrl}/api/buyer/${t}/truck/${e}`)}}return t.\u0275fac=function(e){return new(e||t)(i.gc(s.b))},t.\u0275prov=i.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);