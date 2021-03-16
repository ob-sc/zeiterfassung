(this["webpackJsonpza-react"]=this["webpackJsonpza-react"]||[]).push([[0],{267:function(e,n,t){"use strict";t.r(n);var r=t(13),a=t.n(r),i=t(314),s=t(79),o=t(310),c=t(309),u=t(140),l="#f6f5f4",m="#f2faff",d="#4a4c51",b="#feed01",j=Object(u.a)({palette:{background:{default:l},primary:{main:d},secondary:{main:b,contrastText:d}}});j.props={MuiButton:{variant:"outlined",disableRipple:!0},MuiPaper:{square:!0,elevation:1},MuiAlert:{variant:"outlined"},MuiAppBar:{color:"transparent",elevation:0}},j.overrides={MuiButtonBase:{root:{borderRadius:0,textTransform:"none"}},MuiTouchRipple:{child:{backgroundColor:m}}};var h=j,p=t(21),f=t(1),g=t.n(f),O=t(18),x=t(312),v=t(300),w=Object(v.a)({root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh","& a":{textDecoration:"none"}}}),y=t(142),k=t(3),E=g.a.createContext(),S=function(e){var n=e.children,t={message:null,severity:"info"},r=Object(y.a)(t),a=Object(p.a)(r,2),i=a[0],s=a[1],o={toast:i,addError:function(e){s((function(n){n.message=e.message,n.severity="error"}))},addMessage:function(e,n){s((function(t){t.message=e,t.severity=n}))},removeToast:function(e){s((function(e){e.message=t.message,e.severity=t.severity}))}};return Object(k.jsx)(E.Provider,{value:o,children:n})},$=function(){return Object(f.useContext)(E)},C=t(304),T=t(305),B=t(306),P=Object(v.a)({navButton:{width:96}}),A=t.p+"static/media/logo.9c568c9b.png",H=t(35),_=t(24),z=t(20),L=t.n(z),R=t(27),D=t(315),I={"Content-Type":"application/json"},N=function(e){var n=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_PORT:"3000"}),t=n.NODE_ENV,r=n.REACT_APP_PORT,a="development"===t,i="/"===e[0]?"":"/",s=a?"http://localhost:".concat(r):"https://192.168.100.39:".concat(r);return"".concat(s).concat(i).concat(e)},M=function(){var e=Object(R.a)(L.a.mark((function e(n){var t,r,a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=N(n),e.next=3,fetch(t);case 3:return r=e.sent,e.next=6,r.json();case 6:if(a=e.sent,r.ok){e.next=9;break}throw new Error(a.msg);case 9:return e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),K=function(){var e=Object(R.a)(L.a.mark((function e(n){var t,r,a,i,s=arguments;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>1&&void 0!==s[1]?s[1]:{},r=N(n),e.next=4,fetch(r,{method:"POST",headers:I,body:JSON.stringify(t)});case 4:return a=e.sent,e.next=7,a.json();case 7:if(i=e.sent,a.ok){e.next=10;break}throw new Error(i.msg);case 10:return e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),F=function(){var e=Object(R.a)(L.a.mark((function e(n){var t,r,a,i,s=arguments;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>1&&void 0!==s[1]?s[1]:{},r=N(n),e.next=4,fetch(r,{method:"PUT",headers:I,body:JSON.stringify(t)});case 4:return a=e.sent,e.next=7,a.json();case 7:if(i=e.sent,a.ok){e.next=10;break}throw new Error(i.msg);case 10:return e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),q=function(){var e=Object(R.a)(L.a.mark((function e(n){var t,r,a,i,s=arguments;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.length>1&&void 0!==s[1]?s[1]:{},r=N(n),e.next=4,fetch(r,{method:"DELETE",headers:I,body:JSON.stringify(t)});case 4:return a=e.sent,e.next=7,a.json();case 7:if(i=e.sent,a.ok){e.next=10;break}throw new Error(i.msg);case 10:return e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),W=function(){var e=Object(R.a)(L.a.mark((function e(){var n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M("/api/session");case 2:return n=e.sent,e.abrupt("return",n.payload);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();var Z=function(){return Object(D.a)("session",W,{retry:!1})},J=[{label:"Home",route:{href:"/",access:[1,2,3,4,5]}},{label:"Admin",route:{href:"/admin",access:[1]}},{label:"Reporte",route:{href:"/reports",access:[1,2]}},{label:"Region",route:{href:"/region",access:[1,3]}},{label:"Station",route:{href:"/station",access:[1,2,3,4]}}],V=[{num:10,station:{name:"Hamburg-Jenfeld",region:[1,2,5]}},{num:11,station:{name:"Hamburg-Eppendorf",region:[1,2,5]}},{num:12,station:{name:"Hamburg-Eiffestra\xdfe",region:[1,2,5]}},{num:13,station:{name:"Hamburg-Heimfeld",region:[1,2,5]}},{num:14,station:{name:"Hamburg-Billstedt",region:[1,2,5]}},{num:15,station:{name:"Hamburg-Altona",region:[1,2,5]}},{num:18,station:{name:"Hamburg-Osdorf",region:[1,2,5]}},{num:19,station:{name:"Hamburg-Wandsbek",region:[1,2,5]}},{num:20,station:{name:"Berlin-Tiergarten",region:[1,3]}},{num:21,station:{name:"Berlin-Neuk\xf6lln",region:[1,3]}},{num:22,station:{name:"Berlin-Pankow",region:[1,3]}},{num:23,station:{name:"Berlin-Rudow",region:[1,3]}},{num:24,station:{name:"Berlin-Spandau",region:[1,3]}},{num:26,station:{name:"Berlin-Spandau MB",region:[1,3]}},{num:30,station:{name:"Hannover",region:[1,2]}},{num:32,station:{name:"Bremen",region:[1,2]}},{num:33,station:{name:"Hannover-D\xf6hren",region:[1,2]}},{num:36,station:{name:"Braunschweig",region:[1,2]}},{num:40,station:{name:"K\xf6ln-S\xfclz",region:[1,4]}},{num:41,station:{name:"K\xf6ln-Renault",region:[1,4]}},{num:43,station:{name:"K\xf6ln St. Augustin",region:[1,4]}},{num:45,station:{name:"K\xf6ln-Ehrenfeld",region:[1,4]}},{num:46,station:{name:"K\xf6ln-Porz",region:[1,4]}},{num:47,station:{name:"K\xf6ln-Dellbr\xfcck",region:[1,4]}},{num:50,station:{name:"Essen",region:[1,4]}},{num:52,station:{name:"D\xfcsseldorf",region:[1,4]}},{num:53,station:{name:"Duisburg",region:[1,4]}},{num:54,station:{name:"Dortmund",region:[1,4]}},{num:55,station:{name:"Frankfurt-Ostend",region:[1,4]}},{num:60,station:{name:"Kiel",region:[1,2]}},{num:63,station:{name:"M\xfcnchen",region:[1,6]}},{num:70,station:{name:"Verwaltung",region:[1]}},{num:113,station:{name:"Hamburg-Harburg",region:[1,2,5]}},{num:114,station:{name:"Hamburg-Langenhorn",region:[1,2,5]}},{num:130,station:{name:"N\xfcrnberg",region:[1,6]}}],U=function(){var e=Z(),n=e.status,t=e.error,r=e.data,a=e.isFetching,i={isLoading:!1,isError:!1};if("loading"===n||a)return Object(H.a)(Object(H.a)({},i),{},{isLoading:!0});if("success"===n){var s=function(e){var n,t=[],r=Object(_.a)(J);try{for(r.s();!(n=r.n()).done;){var a,i=n.value,s=Object(_.a)(i.route.access);try{for(s.s();!(a=s.n()).done;)a.value===e&&t.push(i)}catch(o){s.e(o)}finally{s.f()}}}catch(o){r.e(o)}finally{r.f()}return 1===t.length?null:t}(r.access),o=function(e,n,t){var r,a=[],i=[],s=Object(_.a)(V);try{var o=function(){var s=r.value;s.isPushed=!1;var o=function(){if(!0!==s.isPushed){var e={number:s.num,name:s.station.name};a.push(e),s.isPushed=!0}};if(s.num===e&&o(),"string"===typeof n){i=n.split(",");var c,u=Object(_.a)(i);try{for(u.s();!(c=u.n()).done;){var l=c.value;parseInt(l)===s.num&&o()}}catch(b){u.e(b)}finally{u.f()}}var m,d=Object(_.a)(s.station.region);try{for(d.s();!(m=d.n()).done;)m.value===t&&o()}catch(b){d.e(b)}finally{d.f()}};for(s.s();!(r=s.n()).done;)o()}catch(c){s.e(c)}finally{s.f()}return a}(r.station,r.extstat,r.region);return Object(H.a)(Object(H.a)({},i),{},{username:r.username,station:r.currentStation,isLoggedIn:r.isLoggedIn,routes:s,stations:o})}return Object(H.a)(Object(H.a)({},i),{},{error:t,isError:!0})},Q=t(302),G=t(141),X=t(319),Y=t(134),ee=t(81);var ne=function(e){var n=e.routes,t=e.mobile,r=Object(f.useState)(null),a=Object(p.a)(r,2),i=a[0],o=a[1],c=Object(f.useState)(!1),u=Object(p.a)(c,2),l=u[0],m=u[1],d=$().addError,b=Object(s.b)(),j=function(){o(null)},h=function(){var e=Object(R.a)(L.a.mark((function e(){return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),o(null),e.prev=2,e.next=5,q("api/session");case 5:e.sent&&(b.invalidateQueries("session"),Object(O.d)("/")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),d(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}();return Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{ml:2,children:Object(k.jsx)(Q.a,{edge:"start",color:"inherit","aria-label":"nav-menu","aria-haspopup":!0,onClick:function(e){o(e.currentTarget)},children:t?Object(k.jsx)(Y.a,{}):Object(k.jsx)(ee.b,{})})}),Object(k.jsxs)(G.a,{id:"nav-menu",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:j,elevation:1,children:[t&&n.length>0&&n.map((function(e){var n=e.label,t=e.route;return Object(k.jsx)(X.a,{onClick:function(){!function(e){j(),Object(O.d)(e.href)}(t)},children:n},n)})),Object(k.jsx)(X.a,{onClick:j,children:"Mein Account"}),Object(k.jsx)(X.a,{disabled:l,onClick:h,children:"Abmelden"})]})]})};var te=function(e){var n=e.stations,t=Object(f.useState)(null),r=Object(p.a)(t,2),a=r[0],i=r[1],o=Object(f.useState)(!1),c=Object(p.a)(o,2),u=c[0],l=c[1],m=$().addError,d=Object(s.b)(),b=function(){var e=Object(R.a)(L.a.mark((function e(n){return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,l(!0),i(null),e.next=5,F("api/session",{station:n});case 5:e.sent&&d.invalidateQueries("session"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),m(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}();return!n.length>0?null:Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{ml:2,children:Object(k.jsx)(Q.a,{edge:"start",color:"inherit","aria-label":"stat-menu","aria-haspopup":!0,onClick:u?null:function(e){i(e.currentTarget)},children:Object(k.jsx)(ee.a,{})})}),Object(k.jsx)(G.a,{id:"stat-menu",anchorEl:a,keepMounted:!0,open:Boolean(a),onClose:function(){i(null)},elevation:1,children:n.map((function(e){var n=e.number,t=e.name;return Object(k.jsx)(X.a,{onClick:function(){b(n)},children:t},n)}))})]})},re=Object(v.a)({root:{position:"absolute",bottom:10,left:10,fontSize:"1rem"}});var ae=function(e){var n=e.station,t=re();return Object(k.jsxs)("div",{className:t.root,children:["Station: ",n]})};var ie=function(e){var n,t=e.mobile,r=P(),a=U(),i=!0===(null===a||void 0===a?void 0:a.isLoggedIn),s=(null===a||void 0===a||null===(n=a.stations)||void 0===n?void 0:n.length)>1,o=!t&&i&&s;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(C.a,{children:Object(k.jsx)(T.a,{children:Object(k.jsxs)(x.a,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",pt:2,children:[Object(k.jsx)(O.a,{to:"/",children:Object(k.jsx)("img",{src:A,alt:"logo",height:"45px"})}),Object(k.jsxs)(x.a,{display:"flex",children:[o&&a.routes.map((function(e){var n=e.label,t=e.route;return Object(k.jsx)(B.a,{className:r.navButton,color:"inherit",variant:"text",to:t.href,component:O.a,children:n},n)})),i&&Object(k.jsxs)(k.Fragment,{children:[s&&Object(k.jsx)(te,{stations:a.stations}),Object(k.jsx)(ne,{routes:a.routes,mobile:t})]})]})]})})}),s&&Object(k.jsx)(ae,{station:a.station})]})},se=t(307);var oe=function(e){var n=e.children,t=U(),r=t.error,a=t.isError,i=t.isLoading,s=t.isLoggedIn,o=$().addError;return Object(f.useEffect)((function(){a&&o(r)})),i?Object(k.jsx)(se.a,{size:70}):a?Object(k.jsx)(O.b,{to:"/login",noThrow:!0}):!0===s?n:Object(k.jsx)(O.b,{to:"/login",noThrow:!0})},ce=t(317),ue=t(313);var le=function(e){var n=e.mobile,t=$(),r=t.toast,a=t.removeToast,i=function(e,n){"clickaway"!==n&&a()};return!!r.message&&Object(k.jsx)(x.a,{textAlign:"center",children:Object(k.jsx)(ce.a,{anchorOrigin:{vertical:n?"bottom":"top",horizontal:"center"},open:!!r.message,autoHideDuration:5e3,onClose:i,children:Object(k.jsx)(ue.a,{onClose:i,severity:r.severity,children:r.message})})})},me=t(269);var de=function(){var e="/api"===Object(O.e)().pathname.substring(0,4);return Object(k.jsx)(me.a,{children:Object(k.jsx)(x.a,{m:2,p:8,textAlign:"center",children:e?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:"Kein Zugriff"}),Object(k.jsx)(x.a,{fontSize:"90px",children:"\ud83d\udd12"})]}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:"Seite nicht gefunden"}),Object(k.jsx)(x.a,{fontSize:"90px",children:"\ud83d\udd0e"})]})})})};var be=function(){return Object(k.jsx)("div",{children:Object(k.jsx)("h1",{children:"Home"})})};var je=function(){return Object(k.jsx)("h1",{children:"Admin"})},he=t(318),pe=t(87),fe=t(28),ge=t(308),Oe=Object(v.a)({loginInput:{minWidth:280},actionBox:{minWidth:280}}),xe={mixed:{default:"${path} ist ung\xfcltig",required:"Pflichtfeld",oneOf:"${path} muss einem der folgenden Werte entsprechen: ${values}",notOneOf:"${path} darf keinem der folgenden Werte entsprechen: ${values}"},string:{length:"${path} muss genau ${length} Zeichen lang sein",min:"${path} muss mindestens ${min} Zeichen lang sein",max:"${path} darf h\xf6chstens ${max} Zeichen lang sein",matches:'${path} muss wie folgt aussehen: "${regex}"',email:"${path} muss eine g\xfcltige E-Mail-Adresse enthalten",url:"${path} muss eine g\xfcltige URL sein",trim:"${path} darf keine Leerzeichen am Anfang oder Ende enthalten",lowercase:"${path} darf nur Kleinschreibung enthalten",uppercase:"${path} darf nur Gro\xdfschreibung enthalten"},number:{min:"${path} muss gr\xf6\xdfer oder gleich ${min} sein",max:"${path} muss kleiner oder gleich ${max} sein",lessThan:"${path} muss kleiner sein als ${less}",moreThan:"${path} muss gr\xf6\xdfer sein als ${more}",notEqual:'${path} darf nicht gleich sein mit "${notEqual}"',positive:"${path} muss eine positive Zahl sein",negative:"${path} muss eine negative Zahl sein",integer:"${path} muss eine ganze Zahl sein"},date:{min:"${path} muss sp\xe4ter sein als ${min}",max:"${path} muss fr\xfcher sein als ${max}"},object:{noUnknown:'${path}-Feld darf keine Schl\xfcssel verwenden, die nicht im "Objekt-Shape" definiert wurden'},array:{min:"${path}-Feld muss mindesten ${min} Eintr\xe4ge haben",max:"${path}-Feld darf h\xf6chstens ${max} Eintr\xe4ge haben"},boolean:{}},ve=t(144),we=t(311);var ye=function(e){var n=e.name,t=e.label,r=e.noComplete,a=e.formik,i=Object(ve.a)(e,["name","label","noComplete","formik"]),s="password"===n||"repeat_password"===n?"password":"text",o=!0===r?{autoComplete:"new-password"}:{};return Object(k.jsx)(we.a,Object(H.a)({id:n,name:n,label:t,type:s,value:a.values[n],onChange:a.handleChange,error:a.touched[n]&&!!a.errors[n],helperText:a.touched[n]&&a.errors[n],inputProps:o},i))};fe.b(xe);var ke=function(){var e=Oe(),n=$().addError,t=Object(he.a)((function(e){return K("/api/session",e)}),{onError:function(e){n(e)},onSuccess:function(e){Object(O.d)("/",{replace:!0})}}),r=Object(pe.a)({initialValues:{username:"",password:""},validationSchema:fe.a({username:fe.c().trim().lowercase().required("Benutzer eingeben"),password:fe.c().trim().lowercase().required("Passwort eingeben")}),onSubmit:function(e,n){var r=n.setSubmitting;t.mutate(e),r(!1)}});return Object(k.jsx)(x.a,{m:2,px:3,py:6,clone:!0,children:Object(k.jsx)(me.a,{children:Object(k.jsx)("form",{onSubmit:r.handleSubmit,children:Object(k.jsxs)(ge.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,children:[Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(ye,{name:"username",label:"Benutzer",formik:r,variant:"outlined",className:e.loginInput})}),Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(ye,{name:"password",label:"Passwort",formik:r,variant:"outlined",className:e.loginInput})}),Object(k.jsx)(ge.a,{className:e.actionBox,item:!0,children:Object(k.jsxs)(x.a,{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",mt:3,children:[Object(k.jsx)(O.a,{to:"/sign-up",children:"Account erstellen"}),Object(k.jsx)(B.a,{type:"submit",disabled:t.isLoading,color:"primary",children:"Anmelden"})]})})]})})})})};fe.b(xe);var Ee=function(){var e=$().addError,n=Object(he.a)((function(e){return K("/api/users",e)}),{onError:function(n){e(n)},onSuccess:function(e){Object(O.d)("/login")}}),t=Object(pe.a)({initialValues:{username:"",password:"",repeat_password:""},validationSchema:fe.a({username:fe.c().trim().lowercase().required("Benutzer eingeben"),password:fe.c().trim().lowercase().required("Passwort eingeben"),repeat_password:fe.c().trim().lowercase().required("Passwort eingeben")}),onSubmit:function(e,t){var r=t.setSubmitting;n.mutate(e),r(!1)}});return Object(k.jsx)(x.a,{m:2,px:8,py:6,clone:!0,children:Object(k.jsx)(me.a,{children:Object(k.jsx)("form",{onSubmit:t.handleSubmit,noValidate:!0,children:Object(k.jsxs)(ge.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,children:[Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(ye,{name:"username",label:"Benutzer",formik:t,noComplete:!0})}),Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(ye,{name:"password",label:"Passwort",formik:t,noComplete:!0})}),Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(ye,{name:"repeat_password",label:"Passwort wiederholen",formik:t,noComplete:!0})}),Object(k.jsx)(ge.a,{item:!0,children:Object(k.jsx)(x.a,{float:"right",mt:3,children:Object(k.jsx)(B.a,{type:"submit",disabled:n.isLoading,color:"primary",children:"Anmelden"})})})]})})})})};var Se=function(){var e=w(),n=Object(f.useState)(!1),t=Object(p.a)(n,2),r=t[0],a=t[1];return Object(f.useEffect)((function(){var e=function(){return window.innerWidth<1024?a(!0):a(!1)};e(),window.addEventListener("resize",(function(){return e()}))})),Object(k.jsx)(S,{children:Object(k.jsxs)(x.a,{className:e.root,children:[Object(k.jsx)(ie,{mobile:r}),Object(k.jsx)(le,{mobile:r}),Object(k.jsxs)(O.c,{children:[Object(k.jsxs)(oe,{path:"/",children:[Object(k.jsx)(be,{path:"/"}),Object(k.jsx)(de,{default:!0})]}),Object(k.jsx)(oe,{path:"admin",children:Object(k.jsx)(je,{path:"/"})}),Object(k.jsx)(ke,{path:"login"}),Object(k.jsx)(Ee,{path:"sign-up"})]})]})})},$e=new i.a;a.a.render(Object(k.jsx)(s.a,{client:$e,children:Object(k.jsxs)(c.a,{theme:h,children:[Object(k.jsx)(o.a,{}),Object(k.jsx)(Se,{})]})}),document.getElementById("root"))}},[[267,1,2]]]);
//# sourceMappingURL=main.7a9cbf96.chunk.js.map