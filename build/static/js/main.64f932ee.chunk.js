(this.webpackJsonpzeiterfassung=this.webpackJsonpzeiterfassung||[]).push([[0],{278:function(e,n,t){"use strict";t.r(n);var a=t(16),r=t.n(a),i=t(338),s=t(88),o=t(335),c=t(334),l=t(150),u="#f6f5f4",d="#f2faff",m="#dedede",j="#4a4c51",b="#feed01",h=Object(l.a)({typography:{fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',fontWeight:300},palette:{background:{default:u},primary:{main:j,light:m},secondary:{main:b}}});h.props={MuiButton:{variant:"outlined",disableRipple:!0},MuiPaper:{elevation:0},MuiAlert:{variant:"outlined"},MuiAppBar:{color:"transparent",elevation:0}},h.overrides={MuiTouchRipple:{child:{backgroundColor:d}}};var f=h,O=t(21),g=t(1),p=t.n(g),x=t(20),v=t(336),w=t(323),y=Object(w.a)({root:{minHeight:"100vh","& a":{textDecoration:"none"}}}),k=t(152),C=t(3),E=p.a.createContext(),S=function(e){var n=e.children,t={message:null,severity:"info"},a=Object(k.a)(t),r=Object(O.a)(a,2),i=r[0],s=r[1],o={toast:i,addError:function(e){s((function(n){n.message=e.message,n.severity="error"}))},addMessage:function(e,n){s((function(t){t.message=e,t.severity=n}))},removeToast:function(e){s((function(e){e.message=t.message,e.severity=t.severity}))}};return Object(C.jsx)(E.Provider,{value:o,children:n})},F=function(){return Object(g.useContext)(E)},A=t(46),P=t(325),N=t(17),R=t(22),B=t.n(R),T=t(31),I=t(24),L=t(340),H=[{label:"Home",route:{href:"/",access:[1,2,3,4,5]}},{label:"Admin",route:{href:"/admin",access:[1]}},{label:"Reporte",route:{href:"/reports",access:[1,2]}},{label:"Region",route:{href:"/region",access:[1,3]}},{label:"Station",route:{href:"/station",access:[1,2,3,4]}}],_=[{num:10,station:{name:"Hamburg-Jenfeld",region:[1,2,5]}},{num:11,station:{name:"Hamburg-Eppendorf",region:[1,2,5]}},{num:12,station:{name:"Hamburg-Eiffestra\xdfe",region:[1,2,5]}},{num:13,station:{name:"Hamburg-Heimfeld",region:[1,2,5]}},{num:14,station:{name:"Hamburg-Billstedt",region:[1,2,5]}},{num:15,station:{name:"Hamburg-Altona",region:[1,2,5]}},{num:18,station:{name:"Hamburg-Osdorf",region:[1,2,5]}},{num:19,station:{name:"Hamburg-Wandsbek",region:[1,2,5]}},{num:20,station:{name:"Berlin-Tiergarten",region:[1,3]}},{num:21,station:{name:"Berlin-Neuk\xf6lln",region:[1,3]}},{num:22,station:{name:"Berlin-Pankow",region:[1,3]}},{num:23,station:{name:"Berlin-Rudow",region:[1,3]}},{num:24,station:{name:"Berlin-Spandau",region:[1,3]}},{num:26,station:{name:"Berlin-Spandau MB",region:[1,3]}},{num:30,station:{name:"Hannover",region:[1,2]}},{num:32,station:{name:"Bremen",region:[1,2]}},{num:33,station:{name:"Hannover-D\xf6hren",region:[1,2]}},{num:36,station:{name:"Braunschweig",region:[1,2]}},{num:40,station:{name:"K\xf6ln-S\xfclz",region:[1,4]}},{num:41,station:{name:"K\xf6ln-Renault",region:[1,4]}},{num:43,station:{name:"K\xf6ln St. Augustin",region:[1,4]}},{num:45,station:{name:"K\xf6ln-Ehrenfeld",region:[1,4]}},{num:46,station:{name:"K\xf6ln-Porz",region:[1,4]}},{num:47,station:{name:"K\xf6ln-Dellbr\xfcck",region:[1,4]}},{num:50,station:{name:"Essen",region:[1,4]}},{num:52,station:{name:"D\xfcsseldorf",region:[1,4]}},{num:53,station:{name:"Duisburg",region:[1,4]}},{num:54,station:{name:"Dortmund",region:[1,4]}},{num:55,station:{name:"Frankfurt-Ostend",region:[1,4]}},{num:60,station:{name:"Kiel",region:[1,2]}},{num:63,station:{name:"M\xfcnchen",region:[1,6]}},{num:70,station:{name:"Verwaltung",region:[1]}},{num:113,station:{name:"Hamburg-Harburg",region:[1,2,5]}},{num:114,station:{name:"Hamburg-Langenhorn",region:[1,2,5]}},{num:130,station:{name:"N\xfcrnberg",region:[1,6]}}],z=function(e){var n=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_PORT:"3000"}),t=n.NODE_ENV,a=n.REACT_APP_PORT,r="development"===t,i="/"===e[0]?"":"/",s=r?"http://localhost:".concat(a):"http://192.168.100.39:".concat(a);return"".concat(s).concat(i).concat(e)},D=function(){var e=Object(T.a)(B.a.mark((function e(n){var t,a,r,i,s,o,c,l,u=arguments;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=u.length>1&&void 0!==u[1]?u[1]:{},a=u.length>2&&void 0!==u[2]?u[2]:"get",r=z(n),i=a.toUpperCase(),s={"Content-Type":"application/json"},o="GET"===i?{}:{method:i,headers:s,body:JSON.stringify(t)},e.next=8,fetch(r,o);case 8:return c=e.sent,e.next=11,c.json();case 11:if(l=e.sent,c.ok){e.next=14;break}throw new Error(l.msg);case 14:return e.abrupt("return",l);case 15:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),$=function(){var e=Object(L.a)("session",Object(T.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D("/api/session");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),n=e.status,t=e.error,a=e.data,r=e.isFetching,i={isLoading:!1,isError:!1};if("loading"===n||r)return Object(N.a)(Object(N.a)({},i),{},{isLoading:!0});if("success"===n){var s=function(e){var n,t=[],a=Object(I.a)(H);try{for(a.s();!(n=a.n()).done;){var r,i=n.value,s=Object(I.a)(i.route.access);try{for(s.s();!(r=s.n()).done;)r.value===e&&t.push(i)}catch(o){s.e(o)}finally{s.f()}}}catch(o){a.e(o)}finally{a.f()}return 1===t.length?null:t}(a.access),o=function(e,n,t){var a,r=[],i=[],s=Object(I.a)(_);try{var o=function(){var s=a.value;s.isPushed=!1;var o=function(){if(!0!==s.isPushed){var e={number:s.num,name:s.station.name};r.push(e),s.isPushed=!0}};if(s.num===e&&o(),"string"===typeof n){i=n.split(",");var c,l=Object(I.a)(i);try{for(l.s();!(c=l.n()).done;){var u=c.value;parseInt(u)===s.num&&o()}}catch(j){l.e(j)}finally{l.f()}}var d,m=Object(I.a)(s.station.region);try{for(m.s();!(d=m.n()).done;)d.value===t&&o()}catch(j){m.e(j)}finally{m.f()}};for(s.s();!(a=s.n()).done;)o()}catch(c){s.e(c)}finally{s.f()}return r}(a.station,a.extstat,a.region);return Object(N.a)(Object(N.a)({},i),{},{username:a.username,station:a.currentStation,isLoggedIn:a.isLoggedIn,routes:s,stations:o})}return Object(N.a)(Object(N.a)({},i),{},{error:t,isError:!0})},K=t(51),M=Object(N.a)({},{flexCenterRoot:{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}),q=Object(w.a)((function(e){return Object(N.a)(Object(N.a)({},M),{},{mdInput:Object(K.a)({width:300},e.breakpoints.down("xs"),{width:"70vw"})})})),W=p.a.createContext(),Z=function(e){var n=e.children,t=q(),a=F().addError,r=$(),i=r.error,s=r.isError,o=r.isLoading,c=r.isLoggedIn,l=Object(A.a)(r,["error","isError","isLoading","isLoggedIn"]);return Object(g.useEffect)((function(){s&&a(i)})),o?Object(C.jsx)("div",{className:t.flexCenterRoot,children:Object(C.jsx)(P.a,{size:70})}):s?Object(C.jsx)(x.b,{to:"/login",noThrow:!0}):!0===c?Object(C.jsx)(W.Provider,{value:l,children:n}):Object(C.jsx)(x.b,{to:"/login",noThrow:!0})},U=function(){return Object(g.useContext)(W)},V=t(329),J=t(330),G=t(331),Q=Object(w.a)({navButton:{width:96}}),X=t.p+"static/media/logo.9c568c9b.png",Y=t(327),ee=t(151),ne=t(344),te=t(141),ae=t(90);var re=function(e){var n=e.routes,t=e.mobile,a=Object(g.useState)(null),r=Object(O.a)(a,2),i=r[0],o=r[1],c=Object(g.useState)(!1),l=Object(O.a)(c,2),u=l[0],d=l[1],m=F().addError,j=Object(s.b)(),b=function(){o(null)},h=function(){var e=Object(T.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),o(null),e.prev=2,e.next=5,D("api/session",{},"delete");case 5:e.sent&&(j.invalidateQueries("session"),Object(x.d)("/")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),m(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}();return Object(C.jsxs)("div",{children:[Object(C.jsx)(v.a,{ml:2,children:Object(C.jsx)(Y.a,{edge:"start",color:"inherit","aria-label":"nav-menu","aria-haspopup":!0,onClick:function(e){o(e.currentTarget)},children:t?Object(C.jsx)(te.a,{}):Object(C.jsx)(ae.b,{})})}),Object(C.jsxs)(ee.a,{id:"nav-menu",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:b,elevation:1,children:[t&&n.length>0&&n.map((function(e){var n=e.label,t=e.route;return Object(C.jsx)(ne.a,{onClick:function(){!function(e){b(),Object(x.d)(e.href)}(t)},children:n},n)})),Object(C.jsx)(ne.a,{onClick:b,children:"Mein Account"}),Object(C.jsx)(ne.a,{disabled:u,onClick:h,children:"Abmelden"})]})]})};var ie=function(e){var n=e.stations,t=Object(g.useState)(null),a=Object(O.a)(t,2),r=a[0],i=a[1],o=Object(g.useState)(!1),c=Object(O.a)(o,2),l=c[0],u=c[1],d=F().addError,m=Object(s.b)(),j=function(){var e=Object(T.a)(B.a.mark((function e(n){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u(!0),i(null),e.next=5,D("api/session",{station:n},"put");case 5:e.sent&&m.invalidateQueries("session"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),d(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}();return!n.length>0?null:Object(C.jsxs)("div",{children:[Object(C.jsx)(v.a,{ml:2,children:Object(C.jsx)(Y.a,{edge:"start",color:"inherit","aria-label":"stat-menu","aria-haspopup":!0,onClick:l?null:function(e){i(e.currentTarget)},children:Object(C.jsx)(ae.a,{})})}),Object(C.jsx)(ee.a,{id:"stat-menu",anchorEl:r,keepMounted:!0,open:Boolean(r),onClose:function(){i(null)},elevation:1,children:n.map((function(e){var n=e.number,t=e.name;return Object(C.jsx)(ne.a,{onClick:function(){j(n)},children:t},n)}))})]})},se=Object(w.a)({root:{position:"absolute",bottom:10,left:10,fontSize:"1rem"}});var oe=function(e){var n=e.station,t=se();return Object(C.jsxs)("div",{className:t.root,children:["Station: ",n]})};var ce=function(e){var n,t=e.mobile,a=Q(),r=$(),i=!0===(null===r||void 0===r?void 0:r.isLoggedIn),s=(null===r||void 0===r||null===(n=r.stations)||void 0===n?void 0:n.length)>1,o=!t&&i&&s;return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(V.a,{children:Object(C.jsx)(J.a,{children:Object(C.jsxs)(v.a,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",pt:2,children:[Object(C.jsx)(x.a,{to:"/",children:Object(C.jsx)("img",{src:X,alt:"logo",height:"45px"})}),Object(C.jsxs)(v.a,{display:"flex",children:[o&&r.routes.map((function(e){var n=e.label,t=e.route;return Object(C.jsx)(G.a,{className:a.navButton,color:"inherit",variant:"text",to:t.href,component:x.a,children:n},n)})),i&&Object(C.jsxs)(C.Fragment,{children:[s&&Object(C.jsx)(ie,{stations:r.stations}),Object(C.jsx)(re,{routes:r.routes,mobile:t})]})]})]})})}),s&&Object(C.jsx)(oe,{station:r.station})]})},le=t(342),ue=t(339);var de=function(e){var n=e.mobile,t=F(),a=t.toast,r=t.removeToast,i=function(e,n){"clickaway"!==n&&r()};return!!a.message&&Object(C.jsx)(v.a,{textAlign:"center",children:Object(C.jsx)(le.a,{anchorOrigin:{vertical:n?"bottom":"top",horizontal:"center"},open:!!a.message,autoHideDuration:5e3,onClose:i,children:Object(C.jsx)(ue.a,{onClose:i,severity:a.severity,children:a.message})})})},me=t(59),je=t(280);var be=function(e){var n=e.children,t=Object(A.a)(e,["children"]),a=Object(me.a)();return Object(C.jsx)(v.a,Object(N.a)(Object(N.a)({},t),{},{border:1,borderColor:a.palette.primary.light,clone:!0,children:Object(C.jsx)(je.a,{children:n})}))},he=t.p+"static/media/magnifying-glass.3d2f6d64.svg";var fe=function(){var e=q();return Object(C.jsx)(v.a,{className:e.flexCenterRoot,children:Object(C.jsx)(be,{m:2,p:10,children:Object(C.jsxs)(v.a,{textAlign:"center",children:[Object(C.jsx)("h1",{children:"Seite nicht gefunden"}),Object(C.jsx)("img",{src:he,alt:"lupe",width:"50%"})]})})})},Oe=Object(N.a)(Object(N.a)({},M),{},{root:{}}),ge=Object(w.a)(Oe);var pe=function(){var e=U().station,n=Object(L.a)("aushilfen",Object(T.a)(B.a.mark((function e(){return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D("/api/aushilfen");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))),t=n.status,a=n.data;if("success"===t){var r,i=[],s=Object(I.a)(a);try{for(s.s();!(r=s.n()).done;){var o=r.value;o.station===e&&i.push(o)}}catch(c){s.e(c)}finally{s.f()}return{station:i,all:a}}return{station:[],all:[]}},xe=t(332),ve=t(337);var we=function(e){var n=e.options;return Object(C.jsx)(ve.a,{id:"combo-box",options:n,getOptionLabel:function(e){return"".concat(e.vorname," ").concat(e.nachname)},style:{width:300},renderInput:function(e){return Object(C.jsx)(xe.a,Object(N.a)(Object(N.a)({},e),{},{label:"Aushilfe",variant:"outlined"}))}})};var ye=function(){var e=ge(),n=pe(),t=n.station;return Object(C.jsx)(v.a,{className:e.flexCenterRoot,children:Object(C.jsx)(be,{m:2,p:2,children:Object(C.jsx)(we,{options:t})})})};var ke=function(){return Object(C.jsx)("h1",{children:"Admin"})},Ce=t(48),Ee=t(333),Se={mixed:{default:"Feld ist ung\xfcltig",required:"Pflichtfeld",oneOf:"Feld muss einem der folgenden Werte entsprechen: ${values}",notOneOf:"Feld darf keinem der folgenden Werte entsprechen: ${values}"},string:{length:"Feld muss genau ${length} Zeichen lang sein",min:"Feld muss mindestens ${min} Zeichen lang sein",max:"Feld darf h\xf6chstens ${max} Zeichen lang sein",matches:"Feld entspricht nicht den Anforderungen",email:"Feld muss eine g\xfcltige E-Mail-Adresse enthalten",url:"Feld muss eine g\xfcltige URL sein",trim:"Feld darf keine Leerzeichen am Anfang oder Ende enthalten",lowercase:"Feld darf nur Kleinschreibung enthalten",uppercase:"Feld darf nur Gro\xdfschreibung enthalten"},number:{min:"Feld muss gr\xf6\xdfer oder gleich ${min} sein",max:"Feld muss kleiner oder gleich ${max} sein",lessThan:"Feld muss kleiner sein als ${less}",moreThan:"Feld muss gr\xf6\xdfer sein als ${more}",notEqual:'Feld darf nicht gleich sein mit "${notEqual}"',positive:"Feld muss eine positive Zahl sein",negative:"Feld muss eine negative Zahl sein",integer:"Feld muss eine ganze Zahl sein"},date:{min:"Feld muss sp\xe4ter sein als ${min}",max:"Feld muss fr\xfcher sein als ${max}"},object:{noUnknown:'Feld darf keine Schl\xfcssel verwenden, die nicht im "Objekt-Shape" definiert wurden'},array:{min:"Feld muss mindesten ${min} Eintr\xe4ge haben",max:"Feld darf h\xf6chstens ${max} Eintr\xe4ge haben"},boolean:{}};var Fe=function(e){var n=e.name,t=e.label,a=e.noComplete,r=e.formik,i=Object(A.a)(e,["name","label","noComplete","formik"]),s="password"===n||"repeat_password"===n?"password":"text",o=!0===a?{autoComplete:"new-password"}:{};return Object(C.jsx)(xe.a,Object(N.a)({variant:"outlined",id:n,name:n,label:t,type:s,value:r.values[n],onChange:r.handleChange,error:r.touched[n]&&!!r.errors[n],helperText:r.touched[n]&&r.errors[n],inputProps:o},i))},Ae=t(343),Pe=t(149),Ne=function(e,n,t,a,r){var i=F().addError,s=Object(Ae.a)((function(e){return D(a,e,r)}),{onError:function(e){i(e)},onSuccess:t});return{formik:Object(Pe.a)({initialValues:e,validationSchema:n,onSubmit:function(e,n){var t=n.setSubmitting;s.mutate(e),t(!1)}}),mutation:s}};Ce.setLocale(Se);var Re=function(){var e=q(),n=Ce.object({username:Ce.string().trim().lowercase().required("Benutzer eingeben"),password:Ce.string().required("Passwort eingeben")}),t=Ne({username:"",password:""},n,(function(e){Object(x.d)("/",{replace:!0})}),"/api/session","post"),a=t.formik,r=t.mutation;return Object(C.jsx)(v.a,{className:e.flexCenterRoot,children:Object(C.jsx)(be,{m:2,px:2,py:6,children:Object(C.jsx)("form",{onSubmit:a.handleSubmit,children:Object(C.jsxs)(Ee.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,children:[Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(Fe,{name:"username",label:"Benutzer",formik:a,className:e.mdInput})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(Fe,{name:"password",label:"Passwort",formik:a,className:e.mdInput})}),Object(C.jsx)(Ee.a,{className:e.mdInput,item:!0,children:Object(C.jsxs)(v.a,{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",mt:3,children:[Object(C.jsx)(x.a,{to:"/sign-up",children:"Account erstellen"}),Object(C.jsx)(G.a,{type:"submit",disabled:r.isLoading,color:"primary",children:"Anmelden"})]})})]})})})})},Be=Object(w.a)((function(e){return{root:Object(K.a)({width:600},e.breakpoints.down("xs"),{width:"90vw"}),headLine:{textAlign:"center",marginBottom:e.spacing(3)},textContainer:Object(K.a)({width:500},e.breakpoints.down("xs"),{width:"80vw"})}}));Ce.setLocale(Se);var Te=Ce,Ie=new RegExp("^[a-z.-]{1,}$"),Le=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"),He=Te.object().shape({username:Te.string().trim().lowercase().matches(Ie,"Benutzer entspricht nicht den Anforderungen").required(),password:Te.string().min(6).matches(Le,"Passwort entspricht nicht den Anforderungen").required(),repeat_password:Te.string().oneOf([Te.ref("password"),null],"Passw\xf6rter m\xfcssen gleich sein").required(),station:Te.number().required()}),_e=t(283),ze=t(288),De=t(286),$e=t(284);var Ke=function(e){var n=e.name,t=e.label,a=e.formik,r=e.children,i=Object(A.a)(e,["name","label","formik","children"]);return Object(C.jsxs)(_e.a,Object(N.a)(Object(N.a)({variant:"outlined",error:a.touched[n]&&!!a.errors[n]},i),{},{children:[Object(C.jsx)(ze.a,{id:"".concat(n,"-label"),children:t}),Object(C.jsx)(De.a,{labelId:"".concat(n,"-label"),id:n,name:n,onChange:a.handleChange,value:a.values[n],label:t,children:r}),Object(C.jsx)($e.a,{children:a.touched[n]&&a.errors[n]})]}))};var Me=function(){var e=q(),n=Be(),t=Ne({username:"",password:"",repeat_password:"",station:""},He,(function(e){Object(x.d)("/login")}),"/api/users","post"),a=t.formik,r=t.mutation;return Object(C.jsx)(v.a,{className:e.flexCenterRoot,children:Object(C.jsxs)(be,{m:2,px:2,py:4,className:n.root,children:[Object(C.jsx)("h1",{className:n.headLine,children:"Account erstellen"}),Object(C.jsx)("form",{onSubmit:a.handleSubmit,noValidate:!0,children:Object(C.jsxs)(Ee.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,children:[Object(C.jsx)(Ee.a,{className:n.textContainer,item:!0,children:Object(C.jsx)(v.a,{children:Object(C.jsxs)("p",{children:["Der Benutzername ist ",Object(C.jsx)("i",{children:"vorname.nachname"}),", wie bei deinem Citrix-Account. Das Passwort muss mindestens einen Klein-, einen Gro\xdfbuchstaben und eine Zahl enthalten."]})})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(Fe,{name:"username",label:"Benutzer",formik:a,noComplete:!0,className:e.mdInput})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(Fe,{name:"password",label:"Passwort",formik:a,noComplete:!0,className:e.mdInput})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(Fe,{name:"repeat_password",label:"Passwort wiederholen",formik:a,noComplete:!0,className:e.mdInput})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsxs)(Ke,{name:"station",label:"Station",formik:a,className:e.mdInput,children:[Object(C.jsx)(ne.a,{value:"",children:"\xa0"}),_.map((function(e){var n=e.num,t=e.station;return Object(C.jsx)(ne.a,{value:n,children:t.name},n)}))]})}),Object(C.jsx)(Ee.a,{item:!0,children:Object(C.jsx)(v.a,{mt:3,children:Object(C.jsx)(G.a,{type:"submit",disabled:r.isLoading,color:"primary",children:"Registrieren"})})})]})})]})})};var qe=function(){var e=y(),n=Object(g.useState)(!1),t=Object(O.a)(n,2),a=t[0],r=t[1];return Object(g.useEffect)((function(){var e=function(){return window.innerWidth<1024?r(!0):r(!1)};e(),window.addEventListener("resize",(function(){return e()}))})),Object(C.jsx)(S,{children:Object(C.jsxs)(v.a,{className:e.root,children:[Object(C.jsx)(ce,{mobile:a}),Object(C.jsx)(de,{mobile:a}),Object(C.jsxs)(x.c,{children:[Object(C.jsxs)(Z,{path:"/",children:[Object(C.jsx)(ye,{path:"/"}),Object(C.jsx)(ke,{path:"admin"}),Object(C.jsx)(fe,{default:!0})]}),Object(C.jsx)(Re,{path:"login"}),Object(C.jsx)(Me,{path:"sign-up"})]})]})})},We=new i.a;r.a.render(Object(C.jsx)(s.a,{client:We,children:Object(C.jsxs)(c.a,{theme:f,children:[Object(C.jsx)(o.a,{}),Object(C.jsx)(qe,{})]})}),document.getElementById("root"))}},[[278,1,2]]]);
//# sourceMappingURL=main.64f932ee.chunk.js.map