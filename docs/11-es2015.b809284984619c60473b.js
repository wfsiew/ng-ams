(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"4gke":function(c,t,e){"use strict";e.r(t),e.d(t,"MiningCompanyModule",(function(){return uc}));var i=e("ofXK"),r=e("3Pt+"),n=e("ZOsW"),s=e("LqlI"),a=e("ienR"),o=e("6No5"),d=e("tyNb"),l=e("LvDl"),b=e.n(l),u=e("g/JT"),m=e("fwOm"),h=e("fXoL"),_=e("wgH9"),p=e("IYfF"),g=e("a+IK"),f=e("5eHb");function v(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Name is required "),h.bc())}function y(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Business Registration No. is required "),h.bc())}function L(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Mining License No. is required "),h.bc())}function C(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Contact No. is required "),h.bc())}function K(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Address 1 is required "),h.bc())}function k(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Postcode is required "),h.bc())}function S(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," City is required "),h.bc())}function D(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," State is required "),h.bc())}function N(c,t){1&c&&(h.cc(0,"small",42),h.Lc(1," Country is required "),h.bc())}const I=function(c){return{"is-invalid":c}},M=function(){return{containerClass:"theme-blue",dateInputFormat:"YYYY-MM-DD"}};function E(c,t){if(1&c){const c=h.dc();h.cc(0,"div",1),h.cc(1,"form",7),h.kc("ngSubmit",(function(){return h.Dc(c),h.mc().onSubmit()})),h.cc(2,"div",8),h.cc(3,"div",9),h.cc(4,"div",10),h.cc(5,"label",11),h.Lc(6,"Name\xa0"),h.cc(7,"span",12),h.Lc(8,"*"),h.bc(),h.bc(),h.cc(9,"div",13),h.Xb(10,"input",14),h.Jc(11,v,2,0,"small",15),h.bc(),h.bc(),h.cc(12,"div",10),h.cc(13,"label",11),h.Lc(14,"Business Registration No.\xa0"),h.cc(15,"span",12),h.Lc(16,"*"),h.bc(),h.bc(),h.cc(17,"div",13),h.Xb(18,"input",16),h.Jc(19,y,2,0,"small",15),h.bc(),h.bc(),h.cc(20,"div",10),h.cc(21,"label",11),h.Lc(22,"Mining License No.\xa0"),h.cc(23,"span",12),h.Lc(24,"*"),h.bc(),h.bc(),h.cc(25,"div",13),h.Xb(26,"input",17),h.Jc(27,L,2,0,"small",15),h.bc(),h.bc(),h.cc(28,"div",10),h.cc(29,"label",11),h.Lc(30,"License Expiry\xa0"),h.cc(31,"span",12),h.Lc(32,"*"),h.bc(),h.bc(),h.cc(33,"div",18),h.cc(34,"div",19),h.Xb(35,"input",20,21),h.cc(37,"div",22),h.cc(38,"button",23),h.kc("click",(function(){return h.Dc(c),h.Bc(36).show()})),h.Xb(39,"i",24),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(40,"div",10),h.cc(41,"label",11),h.Lc(42,"Contact No.\xa0"),h.cc(43,"span",12),h.Lc(44,"*"),h.bc(),h.bc(),h.cc(45,"div",13),h.Xb(46,"input",25),h.Jc(47,C,2,0,"small",15),h.bc(),h.bc(),h.cc(48,"div",10),h.cc(49,"label",11),h.Lc(50,"Email"),h.bc(),h.cc(51,"div",13),h.Xb(52,"input",26),h.bc(),h.bc(),h.cc(53,"div",10),h.cc(54,"label",11),h.Lc(55,"Fax No."),h.bc(),h.cc(56,"div",13),h.Xb(57,"input",27),h.bc(),h.bc(),h.cc(58,"div",10),h.cc(59,"label",11),h.Lc(60,"Address\xa0"),h.cc(61,"span",12),h.Lc(62,"*"),h.bc(),h.bc(),h.cc(63,"div",13),h.Xb(64,"input",28),h.Jc(65,K,2,0,"small",15),h.bc(),h.bc(),h.cc(66,"div",10),h.cc(67,"div",29),h.Xb(68,"input",30),h.bc(),h.bc(),h.cc(69,"div",10),h.cc(70,"div",29),h.Xb(71,"input",31),h.bc(),h.bc(),h.cc(72,"div",10),h.cc(73,"label",11),h.Lc(74,"Postcode\xa0"),h.cc(75,"span",12),h.Lc(76,"*"),h.bc(),h.bc(),h.cc(77,"div",32),h.Xb(78,"input",33),h.Jc(79,k,2,0,"small",15),h.bc(),h.cc(80,"label",34),h.Lc(81,"City\xa0"),h.cc(82,"span",12),h.Lc(83,"*"),h.bc(),h.bc(),h.cc(84,"div",35),h.Xb(85,"input",36),h.Jc(86,S,2,0,"small",15),h.bc(),h.bc(),h.cc(87,"div",10),h.cc(88,"label",11),h.Lc(89,"State\xa0"),h.cc(90,"span",12),h.Lc(91,"*"),h.bc(),h.bc(),h.cc(92,"div",32),h.Xb(93,"ng-select",37),h.Jc(94,D,2,0,"small",15),h.bc(),h.cc(95,"label",34),h.Lc(96,"Country\xa0"),h.cc(97,"span",12),h.Lc(98,"*"),h.bc(),h.bc(),h.cc(99,"div",35),h.cc(100,"ng-select",38),h.kc("change",(function(t){return h.Dc(c),h.mc().onChangeCountry(t)})),h.bc(),h.Jc(101,N,2,0,"small",15),h.bc(),h.bc(),h.bc(),h.cc(102,"div",39),h.cc(103,"button",40),h.Xb(104,"i",41),h.Lc(105," Save"),h.bc(),h.bc(),h.bc(),h.bc(),h.bc()}if(2&c){const c=h.Bc(36),t=h.mc();h.Kb(1),h.sc("formGroup",t.mform),h.Kb(9),h.sc("ngClass",h.vc(23,I,t.invalid("name"))),h.Kb(1),h.sc("ngIf",t.invalid("name")&&t.f.name.hasError("required")),h.Kb(7),h.sc("ngClass",h.vc(25,I,t.invalid("registration_num"))),h.Kb(1),h.sc("ngIf",t.invalid("registration_num")&&t.f.registration_num.hasError("required")),h.Kb(7),h.sc("ngClass",h.vc(27,I,t.invalid("registration_num"))),h.Kb(1),h.sc("ngIf",t.invalid("mining_license_num")&&t.f.mining_license_num.hasError("required")),h.Kb(8),h.sc("bsConfig",h.uc(29,M)),h.Kb(3),h.Lb("aria-expanded",c.isOpen),h.Kb(8),h.sc("ngClass",h.vc(30,I,t.invalid("contact_no"))),h.Kb(1),h.sc("ngIf",t.invalid("contact_no")&&t.f.contact_no.hasError("required")),h.Kb(17),h.sc("ngClass",h.vc(32,I,t.invalid("addr_line_1"))),h.Kb(1),h.sc("ngIf",t.invalid("addr_line_1")&&t.f.addr_line_1.hasError("required")),h.Kb(3),h.sc("ngClass",h.vc(34,I,t.invalid("addr_line_2"))),h.Kb(3),h.sc("ngClass",h.vc(36,I,t.invalid("addr_line_3"))),h.Kb(7),h.sc("ngClass",h.vc(38,I,t.invalid("postcode"))),h.Kb(1),h.sc("ngIf",t.invalid("postcode")&&t.f.postcode.hasError("required")),h.Kb(6),h.sc("ngClass",h.vc(40,I,t.invalid("city"))),h.Kb(1),h.sc("ngIf",t.invalid("city")&&t.f.city.hasError("required")),h.Kb(7),h.sc("items",t.stateList),h.Kb(1),h.sc("ngIf",t.invalid("state_id")&&t.f.state_id.hasError("required")),h.Kb(6),h.sc("items",t.countryList),h.Kb(1),h.sc("ngIf",t.invalid("country_id")&&t.f.country_id.hasError("required"))}}let w=(()=>{class c extends m.a{constructor(c,t,e,i,r){super(),this.fb=c,this.lookupService=t,this.authService=e,this.miningCompanyService=i,this.toastr=r,this.isLoading=!1,this.data={id:""},this.countryList=[],this.stateList=[],this.createForm()}ngOnInit(){const c=this.authService.loadUser();this.id=c.mining_company_id,this.load()}createForm(){this.mform=this.fb.group({name:["",[r.r.required]],registration_num:["",[r.r.required]],mining_license_num:["",[r.r.required]],mining_license_expiry_date:[null,[r.r.required]],contact_no:["",[r.r.required]],email:[""],fax_no:[""],addr_line_1:["",[r.r.required]],addr_line_2:[""],addr_line_3:[""],postcode:["",[r.r.required]],city:["",[r.r.required]],state_id:[null,[r.r.required]],country_id:[null,[r.r.required]]})}setForm(){const c=this.data;this.mform.patchValue({name:c.name,registration_num:c.registration_num,mining_license_num:c.mining_license_num,mining_license_expiry_date:c.mining_license_expiry_date,contact_no:c.contact_no,email:c.email,fax_no:c.fax_no,addr_line_1:c.addr_line_1,addr_line_2:c.addr_line_2,addr_line_3:c.addr_line_3,postcode:c.postcode,city:c.city,country_id:c.country.id}),this.lookupService.listStates(c.country.id).subscribe(t=>{this.stateList=t,this.mform.patchValue({state_id:c.state.id})})}load(){this.isLoading=!0,this.lookupService.listCountry().subscribe(c=>{this.countryList=c,this.loadDetails()},c=>{this.isLoading=!1})}loadDetails(){b.a.isNull(this.id)||b.a.isUndefined(this.id)?this.isLoading=!1:this.miningCompanyService.edit(this.id).subscribe(c=>{this.data=c,this.setForm()},c=>{},()=>{this.isLoading=!1})}onSubmit(){if(this.mform.invalid)return void this.mform.markAllAsTouched();const c=this.mform.value,t={name:c.name,registration_num:c.registration_num,mining_license_num:c.mining_license_num,mining_license_expiry_date:u.a.toDateStr(c.mining_license_expiry_date),contact_no:c.contact_no,email:c.email,fax_no:c.fax_no,addr_line_1:c.addr_line_1,addr_line_2:c.addr_line_2,addr_line_3:c.addr_line_3,postcode:c.postcode,city:c.city,state_id:c.state_id,country_id:c.country_id};this.miningCompanyService.update(this.data.id,t).subscribe(c=>{this.toastr.success("Mining Company successfully updated")})}onChangeCountry(c){this.lookupService.listStates(c.id).subscribe(c=>{this.stateList=c,this.mform.patchValue({state_id:null})})}}return c.\u0275fac=function(t){return new(t||c)(h.Wb(r.c),h.Wb(_.a),h.Wb(p.a),h.Wb(g.a),h.Wb(f.b))},c.\u0275cmp=h.Qb({type:c,selectors:[["app-company-details"]],features:[h.Hb],decls:8,vars:1,consts:[[1,"content-header"],[1,"container-fluid"],[1,"row","mb-2"],[1,"col-12"],[1,"m-0","text-dark"],[1,"content"],["class","container-fluid",4,"ngIf"],[1,"form-horizontal",3,"formGroup","ngSubmit"],[1,"card"],[1,"card-body"],[1,"form-group","row"],[1,"col-sm-2","col-form-label"],[1,"text-danger"],[1,"col-sm-10"],["type","text","placeholder","Name","name","name","formControlName","name",1,"form-control",3,"ngClass"],["class","badge badge-danger",4,"ngIf"],["type","text","placeholder","Business Registration No.","name","registration_num","formControlName","registration_num",1,"form-control",3,"ngClass"],["type","text","placeholder","Mining License No.","name","mining_license_num","formControlName","mining_license_num",1,"form-control",3,"ngClass"],[1,"col-sm-2","col-12"],[1,"input-group","date"],["type","text","placeholder","License Expiry","name","mining_license_expiry_date","formControlName","mining_license_expiry_date","bsDatepicker","",1,"form-control",3,"bsConfig"],["dp1","bsDatepicker"],[1,"input-group-append"],["type","button",1,"btn","btn-default",3,"click"],[1,"fas","fa-calendar-alt"],["type","text","placeholder","Contact No.","name","contact_no","formControlName","contact_no",1,"form-control",3,"ngClass"],["type","text","placeholder","Email","name","email","formControlName","email",1,"form-control"],["type","text","placeholder","Fax No.","name","fax_no","formControlName","fax_no",1,"form-control"],["type","text","placeholder","Adress 1","name","addr_line_1","formControlName","addr_line_1",1,"form-control",3,"ngClass"],[1,"col-sm-10","offset-sm-2"],["type","text","placeholder","Adress 2","name","addr_line_2","formControlName","addr_line_2",1,"form-control",3,"ngClass"],["type","text","placeholder","Adress 3","name","addr_line_3","formControlName","addr_line_3",1,"form-control",3,"ngClass"],[1,"col-sm-3"],["type","text","placeholder","Postcode","name","postcode","formControlName","postcode",1,"form-control",3,"ngClass"],[1,"col-sm-1","col-form-label"],[1,"col-sm-6"],["type","text","placeholder","City","name","city","formControlName","city",1,"form-control",3,"ngClass"],["bindLabel","name","bindValue","id","placeholder","Please select","formControlName","state_id","name","state_id",3,"items"],["bindLabel","name","bindValue","id","placeholder","Please select","formControlName","country_id","name","country_id",3,"items","change"],[1,"card-footer"],["type","submit",1,"btn","btn-primary"],[1,"fas","fa-save"],[1,"badge","badge-danger"]],template:function(c,t){1&c&&(h.cc(0,"section",0),h.cc(1,"div",1),h.cc(2,"div",2),h.cc(3,"div",3),h.cc(4,"h1",4),h.Lc(5,"Company Details"),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(6,"section",5),h.Jc(7,E,106,42,"div",6),h.bc()),2&c&&(h.Kb(7),h.sc("ngIf",!t.isLoading))},directives:[i.m,r.t,r.k,r.e,r.a,r.j,r.d,i.k,a.b,a.a,n.a],styles:[""]}),c})();var x=e("C7yL"),O=e("XNiG");function X(c,t){1&c&&(h.cc(0,"small",17),h.Lc(1," Actual Weight is required "),h.bc())}function q(c,t){1&c&&(h.cc(0,"small",17),h.Lc(1," Actual Weight is invalid "),h.bc())}const P=function(c){return{"is-invalid":c}};let R=(()=>{class c extends m.a{constructor(c,t){super(),this.fb=c,this.bsModalRef=t,this.createForm()}ngOnInit(){this.onClose=new O.a,this.mform.patchValue({actual_weight:this.actual_weight})}createForm(){this.mform=this.fb.group({actual_weight:["",[r.r.required]]})}onYes(){this.mform.invalid?this.mform.markAllAsTouched():(this.onClose.next({result:!0,actual_weight:this.mform.value.actual_weight}),this.bsModalRef.hide())}onHide(){this.onClose.next({result:!1}),this.bsModalRef.hide()}}return c.\u0275fac=function(t){return new(t||c)(h.Wb(r.c),h.Wb(s.a))},c.\u0275cmp=h.Qb({type:c,selectors:[["app-checkout-modal"]],features:[h.Hb],decls:25,vars:7,consts:[[1,"modal-content"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"close","pull-right",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"form-horizontal",3,"formGroup"],[1,"form-group","row"],[1,"col-sm-4","col-form-label"],[1,"text-danger"],[1,"col-sm-7"],["type","text","placeholder","Actual Weight (kg)","name","actual_weight","formControlName","actual_weight",1,"form-control",3,"ngClass"],["class","badge badge-danger",4,"ngIf"],[1,"col-sm-1","col-form-label"],[1,"modal-footer"],["type","button",1,"btn","btn-success","mr-2","pl-4","pr-4",3,"click"],["type","button",1,"btn","btn-default","pl-4","pr-4",3,"click"],[1,"badge","badge-danger"]],template:function(c,t){1&c&&(h.cc(0,"div",0),h.cc(1,"div",1),h.cc(2,"h4",2),h.Lc(3),h.bc(),h.cc(4,"button",3),h.kc("click",(function(){return t.bsModalRef.hide()})),h.cc(5,"span",4),h.Lc(6,"\xd7"),h.bc(),h.bc(),h.bc(),h.cc(7,"div",5),h.cc(8,"form",6),h.cc(9,"div",7),h.cc(10,"label",8),h.Lc(11,"Actual Weight\xa0"),h.cc(12,"span",9),h.Lc(13,"*"),h.bc(),h.bc(),h.cc(14,"div",10),h.Xb(15,"input",11),h.Jc(16,X,2,0,"small",12),h.Jc(17,q,2,0,"small",12),h.bc(),h.cc(18,"label",13),h.Lc(19,"kg"),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(20,"div",14),h.cc(21,"button",15),h.kc("click",(function(){return t.onYes()})),h.Lc(22,"Check Out"),h.bc(),h.cc(23,"button",16),h.kc("click",(function(){return t.onHide()})),h.Lc(24,"Cancel"),h.bc(),h.bc(),h.bc()),2&c&&(h.Kb(3),h.Mc(t.title),h.Kb(5),h.sc("formGroup",t.mform),h.Kb(7),h.sc("ngClass",h.vc(5,P,t.invalid("actual_weight"))),h.Kb(1),h.sc("ngIf",t.invalid("actual_weight")&&t.f.actual_weight.hasError("required")),h.Kb(1),h.sc("ngIf",t.invalid("actual_weight")&&t.f.actual_weight.hasError("pattern")))},directives:[r.t,r.k,r.e,r.a,r.j,r.d,i.k,i.m],styles:[""]}),c})();var A=e("tk/3"),J=e("AytR");let B=(()=>{class c{constructor(c){this.http=c,this.baseUrl=J.a.baseUrl}list(c,t,e,i,r){let n=(new A.f).set("_page",t).set("_limit",e).set("status",c);return""!==i&&(""===r&&(r="asc"),n=n.append("sort",`${i}:${r}`)),this.http.get(this.baseUrl+"/api/delivery-orders",{params:n,observe:"response"})}search(c,t,e,i,r,n){let s=(new A.f).set("_page",t).set("_limit",e).set("status",c);return""!==i&&(""===r&&(r="asc"),s=s.append("sort",`${i}:${r}`)),this.http.post(this.baseUrl+"/api/delivery-orders",{keyword:n},{params:s,observe:"response"})}updateTime(c){return this.http.post(`${this.baseUrl}/api/delivery-order/${c.id}/timestamp`,c)}}return c.\u0275fac=function(t){return new(t||c)(h.gc(A.b))},c.\u0275prov=h.Sb({token:c,factory:c.\u0275fac,providedIn:"root"}),c})();var T=e("QLLi"),W=e("OpGx"),G=e("C4D8");function U(c,t){1&c&&(h.cc(0,"div",21),h.cc(1,"h4"),h.Lc(2,"No records found"),h.bc(),h.bc())}function F(c,t){if(1&c&&(h.ac(0),h.Lc(1),h.Zb()),2&c){const c=h.mc().$implicit;h.Kb(1),h.Nc(" ",c.purchase_order_detail.weight," ")}}function $(c,t){if(1&c&&(h.ac(0),h.Lc(1),h.Zb()),2&c){const c=h.mc().$implicit;h.Kb(1),h.Nc(" ",c.actual_weight," ")}}function H(c,t){if(1&c){const c=h.dc();h.cc(0,"button",30),h.kc("click",(function(){h.Dc(c);const t=h.mc().$implicit;return h.mc(2).onCheckIn(t)})),h.Lc(1,"Check In"),h.bc()}}function Z(c,t){if(1&c){const c=h.dc();h.cc(0,"button",30),h.kc("click",(function(){h.Dc(c);const t=h.mc().$implicit;return h.mc(2).onCheckOut(t)})),h.Lc(1,"Check Out"),h.bc()}}function V(c,t){if(1&c){const c=h.dc();h.cc(0,"button",31),h.kc("click",(function(){h.Dc(c);const t=h.mc().$implicit;return h.mc(2).onPermit(t)})),h.Lc(1,"Permit"),h.bc()}}function Y(c,t){if(1&c&&(h.cc(0,"tr"),h.cc(1,"td"),h.Lc(2),h.bc(),h.cc(3,"td"),h.Lc(4),h.nc(5,"date"),h.bc(),h.cc(6,"td"),h.Lc(7),h.bc(),h.cc(8,"td"),h.Lc(9),h.bc(),h.cc(10,"td"),h.Lc(11),h.bc(),h.cc(12,"td"),h.Lc(13),h.bc(),h.cc(14,"td"),h.Jc(15,F,2,1,"ng-container",26),h.Jc(16,$,2,1,"ng-container",26),h.bc(),h.cc(17,"td"),h.Lc(18),h.bc(),h.cc(19,"td"),h.Lc(20),h.nc(21,"date"),h.bc(),h.cc(22,"td"),h.Lc(23),h.nc(24,"date"),h.bc(),h.cc(25,"td",27),h.Jc(26,H,2,0,"button",28),h.Jc(27,Z,2,0,"button",28),h.Jc(28,V,2,0,"button",29),h.bc(),h.bc()),2&c){const c=t.$implicit,e=h.mc(2);h.Kb(2),h.Mc(c.do_num),h.Kb(2),h.Mc(h.pc(5,14,c.created_date,"d MMM yyyy h:mm:ss aaa")),h.Kb(3),h.Mc(c.purchase_order_detail.material.name),h.Kb(2),h.Mc(c.purchase_order_detail.truck.registration_num),h.Kb(2),h.Mc(c.purchase_order_detail.driver.name),h.Kb(2),h.Mc(c.purchase_order_detail.driver.id_num),h.Kb(2),h.sc("ngIf",!c.checkout_date),h.Kb(1),h.sc("ngIf",c.checkout_date),h.Kb(2),h.Mc(e.getDOStatus(c)),h.Kb(2),h.Mc(h.pc(21,17,c.checkin_date,"d MMM yyyy h:mm:ss aaa")),h.Kb(3),h.Mc(h.pc(24,20,c.checkout_date,"d MMM yyyy h:mm:ss aaa")),h.Kb(3),h.sc("ngIf",!c.checkin_date),h.Kb(1),h.sc("ngIf",!c.checkout_date&&c.checkin_date),h.Kb(1),h.sc("ngIf",null!==c.permit)}}function j(c,t){if(1&c){const c=h.dc();h.cc(0,"div",22),h.cc(1,"table",23),h.cc(2,"thead"),h.cc(3,"tr"),h.cc(4,"th"),h.cc(5,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(6,"th"),h.cc(7,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(8,"th"),h.cc(9,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(10,"th"),h.cc(11,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(12,"th"),h.cc(13,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(14,"th"),h.cc(15,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(16,"th"),h.cc(17,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(18,"th"),h.Lc(19,"Status"),h.bc(),h.cc(20,"th"),h.cc(21,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.cc(22,"th"),h.cc(23,"app-sort-column",24),h.kc("onSortBy",(function(t){return h.Dc(c),h.mc().onSortBy(t)})),h.bc(),h.bc(),h.Xb(24,"th"),h.bc(),h.bc(),h.cc(25,"tbody"),h.Jc(26,Y,29,23,"tr",25),h.bc(),h.bc(),h.bc()}if(2&c){const c=h.mc();h.Kb(5),h.sc("name","DO No.")("sort","do_num")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Date")("sort","created_date")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Material")("sort","purchase_order_detail__material__name")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Truck")("sort","purchase_order_detail__truck__registration_num")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Driver")("sort","purchase_order_detail__driver__name")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","I/C No.")("sort","purchase_order_detail__driver__id_num")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Weight")("sort","purchase_order_detail__weight")("dir",c.sortDir)("current",c.sort),h.Kb(4),h.sc("name","Check In Time")("sort","checkin_date")("dir",c.sortDir)("current",c.sort),h.Kb(2),h.sc("name","Check Out Time")("sort","checkout_date")("dir",c.sortDir)("current",c.sort),h.Kb(3),h.sc("ngForOf",c.list)}}function z(c,t){if(1&c){const c=h.dc();h.cc(0,"div",32),h.cc(1,"div",33),h.cc(2,"pagination",34),h.kc("ngModelChange",(function(t){return h.Dc(c),h.mc().page=t}))("pageChanged",(function(t){return h.Dc(c),h.mc().pageChanged(t)})),h.bc(),h.bc(),h.bc()}if(2&c){const c=h.mc();h.Kb(2),h.sc("totalItems",c.totalCount)("itemsPerPage",c.pageSize)("maxSize",c.MAX_PAGE_NUMBERS)("ngModel",c.page)}}let Q=(()=>{class c{constructor(c,t,e,i,r,n,s){this.route=c,this.router=t,this.authService=e,this.deliveryOrderService=i,this.msService=r,this.toastr=n,this.modalService=s,this.isLoading=!1,this.list=[],this.totalCount=0,this.pageSize=x.a.PAGE_SIZE,this.page=1,this.search="",this.do_status="0",this.sort="created_date",this.sortDir="desc",this.sx=0,this.sy=0,this.uiState="mining-company.delivery-order-listing",this.isEmpty=u.a.isEmpty,this.PAGE_SIZE=x.a.PAGE_SIZE,this.MAX_PAGE_NUMBERS=x.a.MAX_PAGE_NUMBERS}ngOnInit(){const c=this.authService.loadUser();this.mining_company_id=c.mining_company_id,this.isLoading=!0,this.subs=this.msService.get().subscribe(c=>{if(c.name===this.uiState){const t=c.data;this.page=t.page,this.sort=t.sort,this.sortDir=t.dir,this.search=t.search,this.do_status=t.do_status,this.sx=t.sx,this.sy=t.sy}}),this.load()}ngOnDestroy(){this.subs.unsubscribe()}load(){""===this.search?(this.isLoading=!0,this.deliveryOrderService.list(this.do_status,this.page,x.a.PAGE_SIZE,this.sort,this.sortDir).subscribe(c=>{this.list=c.body,this.totalCount=Number(c.headers.get(x.a.HTTP_HEADER.X_TOTAL_COUNT)),this.isLoading=!1,setTimeout(()=>{window.scrollTo(this.sx,this.sy)},200)},c=>{},()=>{this.isLoading=!1})):this.onSearch(this.search)}onSearch(c){this.search=c,this.isLoading=!0,this.deliveryOrderService.search(this.do_status,this.page,x.a.PAGE_SIZE,this.sort,this.sortDir,c).subscribe(c=>{this.list=c.body,this.totalCount=Number(c.headers.get(x.a.HTTP_HEADER.X_TOTAL_COUNT)),this.isLoading=!1,setTimeout(()=>{window.scrollTo(this.sx,this.sy)},200)},c=>{},()=>{this.isLoading=!1})}pageChanged(c){this.page=c.page,this.load()}onSortBy(c){""===c.sort&&"asc"===c.dir?(this.sort="created_date",this.sortDir="desc"):(this.sort=c.sort,this.sortDir=c.dir),this.load()}onDOStatusChange(){this.load()}goto(c){this.msService.send(this.uiState,{page:this.page,sort:this.sort,dir:this.sortDir,search:this.search,do_status:this.do_status,sx:window.scrollX,sy:window.scrollY}),this.router.navigate(["/ams/mining-company/delivery-order/"+c])}onCheckIn(c){this.isLoading=!0,this.deliveryOrderService.updateTime({id:c.id,checkin:1}).subscribe(t=>{this.toastr.success(`DO #${c.do_num} successfully checked in`),this.load()},c=>{},()=>{this.isLoading=!1})}onCheckOut(c){this.bsModalRef=this.modalService.show(R,{initialState:{title:"Check Out DO",actual_weight:c.actual_weight}}),this.bsModalRef.content.onClose.subscribe(t=>{!0===t.result&&(this.isLoading=!0,this.deliveryOrderService.updateTime({id:c.id,checkin:0,actual_weight:t.actual_weight}).subscribe(t=>{this.toastr.success(`DO #${c.do_num} successfully checked out`),this.load()},c=>{},()=>{this.isLoading=!1}))})}onPermit(c){this.router.navigate(["/ams/mining-company/permit/"+c.permit.id])}getDOStatus(c){return c.status===x.a.DOStatus.NEW?"NEW":c.status===x.a.DOStatus.IN_PROGRESS?"IN PROGRESS":c.status===x.a.DOStatus.DELIVERING?"DELIVERING":c.status===x.a.DOStatus.DELIVERED?"DELIVERED":"NEW"}}return c.\u0275fac=function(t){return new(t||c)(h.Wb(d.a),h.Wb(d.g),h.Wb(p.a),h.Wb(B),h.Wb(T.a),h.Wb(f.b),h.Wb(s.b))},c.\u0275cmp=h.Qb({type:c,selectors:[["app-delivery-order-listing"]],decls:27,vars:5,consts:[[1,"content-header"],[1,"container-fluid"],[1,"row","mb-2"],[1,"col-12"],[1,"m-0","text-dark"],[1,"content"],[1,"card"],[1,"card-header"],[1,"row"],[1,"col-sm-6","col-12","p-1"],[3,"search","onSearch"],[1,"col-sm-2","col-12","p-1"],["name","do_status",1,"form-control",3,"ngModel","ngModelChange","change"],["value","all"],["value","0"],["value","1"],["value","2"],[1,"card-body"],["class","text-center",4,"ngIf"],["class","table-responsive",4,"ngIf"],["class","card-footer",4,"ngIf"],[1,"text-center"],[1,"table-responsive"],[1,"table","table-bordered","table-striped","table-hover"],[3,"name","sort","dir","current","onSortBy"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"text-nowrap"],["class","btn btn-sm btn-primary mr-2",3,"click",4,"ngIf"],["class","btn btn-sm btn-primary",3,"click",4,"ngIf"],[1,"btn","btn-sm","btn-primary","mr-2",3,"click"],[1,"btn","btn-sm","btn-primary",3,"click"],[1,"card-footer"],[1,"float-right"],[3,"totalItems","itemsPerPage","maxSize","ngModel","ngModelChange","pageChanged"]],template:function(c,t){1&c&&(h.cc(0,"section",0),h.cc(1,"div",1),h.cc(2,"div",2),h.cc(3,"div",3),h.cc(4,"h1",4),h.Lc(5,"Delivery Order Listing"),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(6,"section",5),h.cc(7,"div",1),h.cc(8,"div",6),h.cc(9,"div",7),h.cc(10,"div",8),h.cc(11,"div",9),h.cc(12,"app-search-input",10),h.kc("onSearch",(function(c){return t.onSearch(c)})),h.bc(),h.bc(),h.cc(13,"div",11),h.cc(14,"select",12),h.kc("ngModelChange",(function(c){return t.do_status=c}))("change",(function(){return t.onDOStatusChange()})),h.cc(15,"option",13),h.Lc(16,"ALL"),h.bc(),h.cc(17,"option",14),h.Lc(18,"NEW"),h.bc(),h.cc(19,"option",15),h.Lc(20,"IN PROGRESS"),h.bc(),h.cc(21,"option",16),h.Lc(22,"DELIVERING"),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(23,"div",17),h.Jc(24,U,3,0,"div",18),h.Jc(25,j,27,37,"div",19),h.bc(),h.Jc(26,z,3,4,"div",20),h.bc(),h.bc(),h.bc()),2&c&&(h.Kb(12),h.sc("search",t.search),h.Kb(2),h.sc("ngModel",t.do_status),h.Kb(10),h.sc("ngIf",t.isEmpty(t.list)&&!t.isLoading),h.Kb(1),h.sc("ngIf",!t.isEmpty(t.list)&&!t.isLoading),h.Kb(1),h.sc("ngIf",t.totalCount))},directives:[W.a,r.q,r.j,r.l,r.m,r.s,i.m,G.a,i.l,o.a],pipes:[i.e],styles:[""]}),c})();var cc=e("cpHE");function tc(c,t){if(1&c&&(h.ac(0),h.Lc(1),h.Zb()),2&c){const c=h.mc(2);h.Kb(1),h.Nc(", ",c.data.purchase_order.issue_to.addr_line_2,"")}}function ec(c,t){if(1&c&&(h.ac(0),h.Lc(1,","),h.Xb(2,"br"),h.Lc(3),h.Zb()),2&c){const c=h.mc(2);h.Kb(3),h.Mc(c.data.purchase_order.issue_to.addr_line_3)}}function ic(c,t){if(1&c&&(h.ac(0),h.Lc(1),h.Zb()),2&c){const c=h.mc(2);h.Kb(1),h.Nc(", ",c.data.purchase_order_detail.recv_addr_line_2,"")}}function rc(c,t){if(1&c&&(h.ac(0),h.Lc(1,","),h.Xb(2,"br"),h.Lc(3),h.Zb()),2&c){const c=h.mc(2);h.Kb(3),h.Mc(c.data.purchase_order_detail.recv_addr_line_3)}}const nc=function(c){return["/permit",c,"print"]};function sc(c,t){if(1&c&&(h.cc(0,"div",1),h.cc(1,"div",7),h.cc(2,"div",8),h.cc(3,"div",9),h.cc(4,"div",7),h.cc(5,"div",8),h.cc(6,"h4"),h.cc(7,"small",10),h.Lc(8),h.nc(9,"date"),h.bc(),h.bc(),h.bc(),h.bc(),h.cc(10,"div",11),h.cc(11,"div",12),h.Lc(12," Mining License Holder "),h.cc(13,"address"),h.cc(14,"strong"),h.Lc(15),h.bc(),h.Xb(16,"br"),h.Lc(17),h.Xb(18,"br"),h.Lc(19),h.Xb(20,"br"),h.Lc(21),h.nc(22,"date"),h.Xb(23,"br"),h.Lc(24),h.Jc(25,tc,2,1,"ng-container",13),h.Jc(26,ec,4,1,"ng-container",13),h.Xb(27,"br"),h.Lc(28),h.Xb(29,"br"),h.Lc(30),h.Xb(31,"br"),h.Lc(32),h.Xb(33,"br"),h.Lc(34),h.Xb(35,"br"),h.Lc(36),h.bc(),h.bc(),h.cc(37,"div",12),h.Lc(38," Driver & Truck Details "),h.cc(39,"address"),h.cc(40,"strong"),h.Lc(41),h.bc(),h.Xb(42,"br"),h.Lc(43),h.Xb(44,"br"),h.Lc(45),h.Xb(46,"br"),h.Lc(47),h.Xb(48,"br"),h.Lc(49),h.nc(50,"number"),h.bc(),h.bc(),h.cc(51,"div",12),h.Lc(52," Destination "),h.cc(53,"address"),h.cc(54,"strong"),h.Lc(55),h.bc(),h.Xb(56,"br"),h.Lc(57),h.Jc(58,ic,2,1,"ng-container",13),h.Jc(59,rc,4,1,"ng-container",13),h.Xb(60,"br"),h.Lc(61),h.Xb(62,"br"),h.Lc(63),h.bc(),h.bc(),h.bc(),h.cc(64,"div",14),h.cc(65,"div",8),h.cc(66,"a",15),h.Xb(67,"i",16),h.Lc(68," Print"),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.bc(),h.bc()),2&c){const c=h.mc();h.Kb(8),h.Nc("Date: ",h.pc(9,31,c.data.created_date,"d MMM yyyy"),""),h.Kb(7),h.Mc(c.data.purchase_order.issue_to.name),h.Kb(2),h.Nc("",c.data.purchase_order.issue_to.registration_num," "),h.Kb(2),h.Nc("Mineral License No. ",c.data.purchase_order.issue_to.mining_license_num," "),h.Kb(2),h.Nc("License Expiry: ",h.pc(22,34,c.data.purchase_order.issue_to.mining_license_expiry_date,"d MMM yyyy")," "),h.Kb(3),h.Mc(c.data.purchase_order.issue_to.addr_line_1),h.Kb(1),h.sc("ngIf",c.data.purchase_order.issue_to.addr_line_2),h.Kb(1),h.sc("ngIf",c.data.purchase_order.issue_to.addr_line_3),h.Kb(2),h.Oc("",c.data.purchase_order.issue_to.postcode," ",c.data.purchase_order.issue_to.city," "),h.Kb(2),h.Oc("",c.data.purchase_order.issue_to.state.name,", ",c.data.purchase_order.issue_to.country.name," "),h.Kb(2),h.Nc("Phone: ",c.data.purchase_order.issue_to.contact_no," "),h.Kb(2),h.Nc("Email: ",c.data.purchase_order.issue_to.email," "),h.Kb(2),h.Nc("Fax: ",c.data.purchase_order.issue_to.fax_no," "),h.Kb(5),h.Mc(c.data.purchase_order_detail.driver.name),h.Kb(2),h.Nc("I/C No.: ",c.data.purchase_order_detail.driver.id_num," "),h.Kb(2),h.Nc("Truck Reg. No.: ",c.data.purchase_order_detail.truck.registration_num," "),h.Kb(2),h.Pc("Material: ",c.data.purchase_order_detail.material.name," ",c.data.purchase_order_detail.material.material_type," ",c.data.purchase_order_detail.material.grade," "),h.Kb(2),h.Nc("Weight: ",h.oc(50,37,c.data.delivery_order.actual_weight)," kg "),h.Kb(6),h.Mc(c.data.purchase_order_detail.recv_name),h.Kb(2),h.Mc(c.data.purchase_order_detail.recv_addr_line_1),h.Kb(1),h.sc("ngIf",c.data.purchase_order_detail.recv_addr_line_2),h.Kb(1),h.sc("ngIf",c.data.purchase_order_detail.recv_addr_line_3),h.Kb(2),h.Oc("",c.data.purchase_order_detail.recv_postcode," ",c.data.purchase_order_detail.recv_city," "),h.Kb(2),h.Oc("",c.data.purchase_order_detail.recv_state.name,", ",c.data.purchase_order_detail.recv_country.name," "),h.Kb(3),h.sc("routerLink",h.vc(39,nc,c.id))}}const ac=[{path:"company-details",component:w},{path:"delivery-order",children:[{path:"list",component:Q}]},{path:"permit/:id",component:(()=>{class c{constructor(c,t,e){this.route=c,this.router=t,this.permitService=e,this.isLoading=!1,this.data={id:""}}ngOnInit(){this.route.paramMap.subscribe(c=>{this.id=c.get("id"),this.load()})}load(){b.a.isNull(this.id)||b.a.isUndefined(this.id)?this.isLoading=!1:(this.isLoading=!0,this.permitService.detail(this.id).subscribe(c=>{this.data=c},c=>{},()=>{this.isLoading=!1}))}}return c.\u0275fac=function(t){return new(t||c)(h.Wb(d.a),h.Wb(d.g),h.Wb(cc.a))},c.\u0275cmp=h.Qb({type:c,selectors:[["app-permit-detail"]],decls:9,vars:1,consts:[[1,"content-header"],[1,"container-fluid"],[1,"row","mb-2"],[1,"col-sm-10"],[1,"col-sm-2"],[1,"content"],["class","container-fluid",4,"ngIf"],[1,"row"],[1,"col-12"],[1,"invoice","p-3","mb-3"],[1,"float-right"],[1,"row","invoice-info"],[1,"col-sm-4","invoice-col"],[4,"ngIf"],[1,"row","no-print"],["target","_blank",1,"btn","btn-default",3,"routerLink"],[1,"fas","fa-print"]],template:function(c,t){1&c&&(h.cc(0,"section",0),h.cc(1,"div",1),h.cc(2,"div",2),h.cc(3,"div",3),h.cc(4,"h1"),h.Lc(5,"Permit"),h.bc(),h.bc(),h.Xb(6,"div",4),h.bc(),h.bc(),h.bc(),h.cc(7,"section",5),h.Jc(8,sc,69,41,"div",6),h.bc()),2&c&&(h.Kb(8),h.sc("ngIf",!t.isLoading))},directives:[i.m,d.h],pipes:[i.e,i.f],styles:[""]}),c})()}];let oc=(()=>{class c{}return c.\u0275mod=h.Ub({type:c}),c.\u0275inj=h.Tb({factory:function(t){return new(t||c)},imports:[[d.i.forChild(ac)],d.i]}),c})();var dc=e("jgPy"),lc=e("mrcu"),bc=e("Thox");let uc=(()=>{class c{}return c.\u0275mod=h.Ub({type:c}),c.\u0275inj=h.Tb({factory:function(t){return new(t||c)},providers:[lc.a,bc.a,B,cc.a],imports:[[i.c,oc,r.g,r.o,dc.a,n.b,s.c.forRoot(),a.c.forRoot(),o.b.forRoot()]]}),c})()}}]);