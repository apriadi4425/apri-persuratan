(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[30],{687:function(e,a,t){"use strict";var n=t(617),r=t(629),i=t(12),c=t(1),o=(t(57),t(619)),l=t(621),u=t(922),s=t(644),m=t(626),d=t(656),p=t(80),f="undefined"===typeof window?c.useEffect:c.useLayoutEffect,h=c.forwardRef((function(e,a){var t=e.alignItems,r=void 0===t?"center":t,l=e.autoFocus,h=void 0!==l&&l,b=e.button,E=void 0!==b&&b,v=e.children,g=e.classes,k=e.className,j=e.component,O=e.ContainerComponent,_=void 0===O?"li":O,C=e.ContainerProps,w=(C=void 0===C?{}:C).className,y=Object(n.a)(C,["className"]),x=e.dense,S=void 0!==x&&x,N=e.disabled,M=void 0!==N&&N,z=e.disableGutters,A=void 0!==z&&z,B=e.divider,I=void 0!==B&&B,D=e.focusVisibleClassName,W=e.selected,q=void 0!==W&&W,T=Object(n.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),Y=c.useContext(d.a),K={dense:S||Y.dense||!1,alignItems:r},V=c.useRef(null);f((function(){h&&V.current&&V.current.focus()}),[h]);var F=c.Children.toArray(v),L=F.length&&Object(s.a)(F[F.length-1],["ListItemSecondaryAction"]),G=c.useCallback((function(e){V.current=p.findDOMNode(e)}),[]),H=Object(m.a)(G,a),U=Object(i.a)({className:Object(o.default)(g.root,k,K.dense&&g.dense,!A&&g.gutters,I&&g.divider,M&&g.disabled,E&&g.button,"center"!==r&&g.alignItemsFlexStart,L&&g.secondaryAction,q&&g.selected),disabled:M},T),J=j||"li";return E&&(U.component=j||"div",U.focusVisibleClassName=Object(o.default)(g.focusVisible,D),J=u.a),L?(J=U.component||j?J:"div","li"===_&&("li"===J?J="div":"li"===U.component&&(U.component="div")),c.createElement(d.a.Provider,{value:K},c.createElement(_,Object(i.a)({className:Object(o.default)(g.container,w),ref:H},y),c.createElement(J,U,F),F.pop()))):c.createElement(d.a.Provider,{value:K},c.createElement(J,Object(i.a)({ref:H},U),F))})),b=Object(l.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(h),E=c.forwardRef((function(e,a){var t,r=e.classes,l=e.className,u=e.component,s=void 0===u?"li":u,m=e.disableGutters,d=void 0!==m&&m,p=e.ListItemClasses,f=e.role,h=void 0===f?"menuitem":f,E=e.selected,v=e.tabIndex,g=Object(n.a)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(t=void 0!==v?v:-1),c.createElement(b,Object(i.a)({button:!0,role:h,tabIndex:t,component:s,selected:E,disableGutters:d,classes:Object(i.a)({dense:r.dense},p),className:Object(o.default)(r.root,l,E&&r.selected,!d&&r.gutters),ref:a},g))}));a.a=Object(l.a)((function(e){return{root:Object(i.a)({},e.typography.body1,Object(r.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(i.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(E)},865:function(e,a,t){"use strict";t.r(a);var n=t(105),r=t(622),i=t.n(r),c=t(623),o=t(618),l=t(1),u=t.n(l),s=t(19),m=t(620),d=t.n(m),p=function(e){var a=JSON.parse(localStorage.getItem("user")),t=Object(l.useState)([]),n=Object(o.a)(t,2),r=n[0],u=n[1],s=Object(l.useState)({nomor_variabel:"",isi:"",sk_list_id:""}),m=Object(o.a)(s,2),p=m[0],f=m[1],h=Object(l.useState)(!1),b=Object(o.a)(h,2),E=b[0],v=b[1],g=function(){var t=Object(c.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/sk-variabel/").concat(e,"/").concat(a.instansi_id),{headers:{Accept:"application/json",Authorization:"Bearer ".concat(a.token)}}).then((function(e){u(e.data),v(!1)})).catch((function(e){console.log(e)}));case 2:f({nomor_variabel:"",isi:"",sk_list_id:""});case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:t,isi:p.isi},e.next=3,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/update-isi-sk-variabel"),data:n,headers:{Accept:"application/json",Authorization:"Bearer ".concat(a.token)}}).then((function(e){g()})).catch((function(e){console.log("error")}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),j=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/isi-sk-variabel"),data:p,headers:{Accept:"application/json",Authorization:"Bearer ".concat(a.token)}}).then((function(e){"save"===e.data.message?k(e.data.id):g()})).catch((function(e){console.log("error")}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{getData:g,Variabel:r,User:a,Form:p,setForm:f,OnEnter:function(){var e=Object(c.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==a.key){e.next=3;break}return e.next=3,j();case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),Loading:E}},f=t(616),h=t(378),b=t(906),E=t(917),v=t(687),g=u.a.memo((function(e){var a=e.GetData,t=e.nomor,r=Object(l.useState)(!1),s=Object(o.a)(r,2),m=s[0],p=s[1],h=Object(l.useState)({nomor_variabel:t,nama_variabel:"",default_value:"",tipe:""}),g=Object(o.a)(h,2),k=g[0],j=g[1],O=Object(l.useState)(!1),_=Object(o.a)(O,2),C=_[0],w=_[1],y=function(){p(!m)},x=function(){var e=Object(c.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("user")),w(!0),e.next=4,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/add-sk-variabel"),data:k,headers:{Accept:"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){a(),y()})).catch((function(e){console.log("error")}));case 4:w(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,m?u.a.createElement(u.a.Fragment,null,u.a.createElement(f.u,{md:12},u.a.createElement(f.wb,null,u.a.createElement(f.u,{md:8},u.a.createElement(b.a,{size:"small",placeholder:"Nama Variabel",className:"mt-1",value:k.nama_variabel,onChange:function(e){return j(Object(n.a)(Object(n.a)({},k),{},{nama_variabel:e.target.value}))}}),u.a.createElement(b.a,{size:"small",placeholder:"Default Value",className:"ml-3 mt-1",value:k.default_value,onChange:function(e){return j(Object(n.a)(Object(n.a)({},k),{},{default_value:e.target.value}))}}),u.a.createElement(E.a,{labelId:"Tipe Data",size:"small",displayEmpty:!0,className:"ml-3",value:k.tipe,onChange:function(e){return j(Object(n.a)(Object(n.a)({},k),{},{tipe:e.target.value}))}},u.a.createElement(v.a,{value:""},"Tipe Data"),u.a.createElement(v.a,{value:"text"},"Text"),u.a.createElement(v.a,{value:"date"},"Tanggal"))),u.a.createElement(f.u,{md:4},u.a.createElement(f.f,{color:"danger",className:"ml-2 float-right",type:"submit",onClick:y},"Batalkan"),u.a.createElement(f.f,{color:"info",disabled:C,className:"float-right",type:"submit",onClick:x},C?"...Loading":"Simpan Variabel"))))):u.a.createElement(f.f,{color:"primary",size:"sm",type:"submit",onClick:y},"Tambah Variabel"))})),k=t(638),j=t(674),O=t(914),_=t(157),C=u.a.memo((function(e){var a=e.GetDataKonsideran,t=e.Konsideran,r=e.nama,s=e.jenis,m=e.id,p=e.TogleModal,h=e.Modal,E=JSON.parse(localStorage.getItem("user")),v=Object(l.useState)(!1),g=Object(o.a)(v,2),k=g[0],j=g[1],O=Object(l.useState)(!1),C=Object(o.a)(O,2),w=C[0],y=C[1],x=Object(l.useState)({sk_list_id:m,urutan:"",jenis:s,nomor_huruf:"",isi:""}),S=Object(o.a)(x,2),N=S[0],M=S[1],z=Object(l.useState)({id:"",urutan:"",jenis:s,nomor_huruf:"",isi:""}),A=Object(o.a)(z,2),B=A[0],I=A[1],D=function(e){M(Object(n.a)(Object(n.a)({},N),{},Object(_.a)({},e.target.name,e.target.value)))},W=function(e){I(Object(n.a)(Object(n.a)({},B),{},Object(_.a)({},e.target.name,e.target.value)))},q=function(){j(!k),M(Object(n.a)(Object(n.a)({},N),{},{urutan:"",jenis:s,nomor_huruf:"",isi:""}))},T=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),e.next=3,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/add-konsideran"),data:N,headers:{Accept:"application/json",Authorization:"Bearer ".concat(E.token)}}).then((function(e){a(m,s),q()})).catch((function(e){console.log("error")}));case 3:y(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()({method:"put",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/edit-konsideran"),data:B,headers:{Accept:"application/json",Authorization:"Bearer ".concat(E.token)}}).then((function(e){a(m,s)})).catch((function(e){console.log("error")}));case 2:I({id:"",urutan:"",jenis:s,nomor_huruf:"",isi:""});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(c.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:t.id},e.next=3,d()({method:"delete",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/delete-konsideran"),data:n,headers:{Accept:"application/json",Authorization:"Bearer ".concat(E.token)}}).then((function(e){a(),I({id:"",urutan:"",jenis:s,nomor_huruf:"",isi:""})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(f.gb,{size:"lg",show:h,onClose:p,closeOnBackdrop:!1,color:"success"},u.a.createElement(f.jb,{closeButton:!0},u.a.createElement(f.kb,null,"Konsideran ",r)),u.a.createElement(f.hb,null,u.a.createElement("table",{className:"table table-bordered"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",{width:"5%"},"Urutan"),u.a.createElement("th",{width:"10%"},"Huruf"),u.a.createElement("th",{width:"65%"},"Isi"),u.a.createElement("th",{width:"20%"},"Aksi"))),u.a.createElement("tbody",null,t.map((function(e,a){return B.id===e.id?u.a.createElement("tr",{key:a},u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,onChange:W,name:"urutan",value:B.urutan})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,onChange:W,name:"nomor_huruf",value:B.nomor_huruf})),u.a.createElement("td",null,u.a.createElement(b.a,{multiline:!0,onChange:W,fullWidth:!0,name:"isi",value:B.isi})),u.a.createElement("td",{align:"center"},u.a.createElement(f.f,{color:"info",variant:"outline",className:"mr-2",onClick:Y,shape:"square",size:"sm"},"Simpan"),u.a.createElement(f.f,{color:"success",variant:"outline",onClick:function(){return I({id:"",urutan:"",jenis:s,nomor_huruf:"",isi:""})},shape:"square",size:"sm"},"Batal"))):u.a.createElement("tr",{key:a},u.a.createElement("td",null,e.urutan),u.a.createElement("td",null,e.nomor_huruf),u.a.createElement("td",null,e.isi),u.a.createElement("td",{align:"center"},u.a.createElement(f.f,{onClick:function(){return function(e){I({id:e.id,urutan:e.urutan,nomor_huruf:e.nomor_huruf,isi:e.isi})}(e)},color:"warning",variant:"outline",className:"mr-2",shape:"square",size:"sm"},"Edit"),u.a.createElement(f.f,{color:"danger",variant:"outline",shape:"square",size:"sm",onClick:function(){return K(e)}},"Hapus")))})),k?u.a.createElement("tr",null,u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"urutan",onChange:D,value:N.urutan})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"nomor_huruf",onChange:D,value:N.nomor_huruf})),u.a.createElement("td",{colSpan:2},u.a.createElement(b.a,{multiline:!0,fullWidth:!0,name:"isi",onChange:D,value:N.isi}))):null))),u.a.createElement(f.ib,null,u.a.createElement(f.f,{color:"primary",onClick:q},k?"Batalkan":"Tambah Kolom"),k?u.a.createElement(f.f,{color:"success",disabled:w||""===N.isi||""===N.nomor_huruf||""===N.urutan,onClick:T},w?"...Loading":"Tambahkan"):null,u.a.createElement(f.f,{color:"secondary",onClick:p},"Tutup"))))})),w=u.a.memo((function(e){var a=e.ModalMemutuskan,t=e.TogleModalMemutuskan,r=e.GetDatanyaMemutuskan,s=e.id,m=e.GetDataMemutuskan,p=JSON.parse(localStorage.getItem("user")),h=Object(l.useState)(!1),E=Object(o.a)(h,2),v=E[0],g=E[1],k=Object(l.useState)(!1),j=Object(o.a)(k,2),O=j[0],C=j[1],w=Object(l.useState)({sk_list_id:s,urutan:"",nama:"",isi:""}),y=Object(o.a)(w,2),x=y[0],S=y[1],N=Object(l.useState)({id:"",urutan:"",nama:"",isi:""}),M=Object(o.a)(N,2),z=M[0],A=M[1],B=Object(l.useState)({konsideran_memutuskan_id:"",urutan:"",nomor_huruf:"",isi:""}),I=Object(o.a)(B,2),D=I[0],W=I[1],q=Object(l.useState)({id:"",urutan:"",nomor_huruf:"",isi:""}),T=Object(o.a)(q,2),Y=T[0],K=T[1],V=Object(l.useState)(!1),F=Object(o.a)(V,2),L=F[0],G=F[1],H=function(){g(!v),S(Object(n.a)(Object(n.a)({},x),{},{sk_list_id:s,urutan:"",nama:"",isi:""}))},U=function(e){C(!0),W(Object(n.a)(Object(n.a)({},D),{},{konsideran_memutuskan_id:e,urutan:"",nomor_huruf:"",isi:""}))},J=function(){C(!O),W(Object(n.a)(Object(n.a)({},D),{},{konsideran_memutuskan_id:"",urutan:"",nomor_huruf:"",isi:""}))},P=function(e){S(Object(n.a)(Object(n.a)({},x),{},Object(_.a)({},e.target.name,e.target.value)))},R=function(e){A(Object(n.a)(Object(n.a)({},z),{},Object(_.a)({},e.target.name,e.target.value)))},$=function(e){W(Object(n.a)(Object(n.a)({},D),{},Object(_.a)({},e.target.name,e.target.value)))},Q=function(e){K(Object(n.a)(Object(n.a)({},Y),{},Object(_.a)({},e.target.name,e.target.value)))},X=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),e.next=3,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/add-memutuskan"),data:x,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m(),H()})).catch((function(e){console.log(e)}));case 3:G(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()({method:"post",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/add-anakan"),data:D,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m(),J()})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()({method:"put",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/edit-anakan"),data:Y,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m(),K({id:"",urutan:"",nomor_huruf:"",isi:""})})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d()({method:"put",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/edit-memutuskan"),data:z,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m()})).catch((function(e){console.log("error")}));case 2:A({id:"",urutan:"",nama:"",isi:""});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),te=function(){var e=Object(c.a)(i.a.mark((function e(a){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:a.id},e.next=3,d()({method:"delete",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/delete-memutuskan"),data:t,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m(),A({id:"",urutan:"",nama:"",isi:""})})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),ne=function(){var e=Object(c.a)(i.a.mark((function e(a){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:a.id},e.next=3,d()({method:"delete",url:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/delete-anakan"),data:t,headers:{Accept:"application/json",Authorization:"Bearer ".concat(p.token)}}).then((function(e){m()})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(f.gb,{size:"xl",show:a,onClose:t,closeOnBackdrop:!1,color:"success"},u.a.createElement(f.jb,{closeButton:!0},u.a.createElement(f.kb,null,"Konsideran Memutuskan")),u.a.createElement(f.hb,null,u.a.createElement("table",{className:"table table-bordered"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",{width:"5%"},"Urutan"),u.a.createElement("th",{width:"5%"},"Nama"),u.a.createElement("th",{width:"68%"},"Isi"),u.a.createElement("th",{width:"22%"},"Aksi"))),u.a.createElement("tbody",null,r.map((function(e,a){return z.id===e.id?u.a.createElement("tr",{key:a},u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,onChange:R,name:"urutan",value:z.urutan})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,onChange:R,name:"nomor_huruf",value:z.nomor_huruf})),u.a.createElement("td",null,u.a.createElement(b.a,{multiline:!0,onChange:R,fullWidth:!0,name:"isi",value:z.isi})),u.a.createElement("td",{align:"center"},u.a.createElement(f.f,{color:"info",variant:"outline",className:"mr-2",onClick:ae,shape:"square",size:"sm"},"Simpan"),u.a.createElement(f.f,{color:"success",variant:"outline",onClick:function(){return A({id:"",urutan:"",nama:"",isi:""})},className:"ml-2",shape:"square",size:"sm"},"Batal"))):u.a.createElement("tr",{key:a},u.a.createElement("td",null,e.urutan),u.a.createElement("td",null,e.nama),u.a.createElement("td",null,e.isi,e.anakan.length>0||D.konsideran_memutuskan_id===e.id?u.a.createElement("table",{className:"table table-bordered"},u.a.createElement("thead",null,u.a.createElement("tr",null,u.a.createElement("th",{width:"5%"},"Urutan"),u.a.createElement("th",{width:"5%"},"Huruf"),u.a.createElement("th",{width:"65%"},"Isi"),u.a.createElement("th",{width:"25%"},"Aksi"))),u.a.createElement("tbody",null,e.anakan.map((function(e,a){return Y.id===e.id?u.a.createElement("tr",{key:a},u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"urutan",value:Y.urutan,onChange:Q})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"nomor_huruf",value:Y.nomor_huruf,onChange:Q})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"isi",value:Y.isi,onChange:Q})),u.a.createElement("td",null,u.a.createElement(f.f,{color:"info",variant:"outline",onClick:ee,className:"mr-2",shape:"square",size:"sm"},"Save"))):u.a.createElement("tr",{key:a},u.a.createElement("td",null,e.urutan),u.a.createElement("td",null,e.nomor_huruf),u.a.createElement("td",null,e.isi),u.a.createElement("td",null,u.a.createElement(f.f,{color:"success",variant:"outline",onClick:function(){return function(e){K({id:e.id,urutan:e.urutan,nomor_huruf:e.nomor_huruf,isi:e.isi})}(e)},className:"mr-2",shape:"square",size:"sm"},"Edit"),u.a.createElement(f.f,{color:"danger",variant:"outline",onClick:function(){return ne(e)},className:"mr-2",shape:"square",size:"sm"},"Hapus")))})),O&&D.konsideran_memutuskan_id===e.id?u.a.createElement("tr",null,u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"urutan",value:D.urutan,onChange:$})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"nomor_huruf",value:D.nomor_huruf,onChange:$})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"isi",value:D.isi,onChange:$})),u.a.createElement("td",null,u.a.createElement(f.f,{color:"info",variant:"outline",onClick:Z,className:"mr-2",shape:"square",size:"sm"},"Tambah"))):null)):null),u.a.createElement("td",null,u.a.createElement(f.f,{onClick:function(){return function(e){A({id:e.id,urutan:e.urutan,nama:e.nama,isi:e.isi})}(e)},color:"warning",variant:"outline",className:"mr-2",shape:"square",size:"sm"},"Edit"),u.a.createElement(f.f,{color:"danger",variant:"outline",shape:"square",size:"sm",onClick:function(){return te(e)}},"Hapus"),O?D.konsideran_memutuskan_id===e.id?u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",onClick:J,size:"sm"},"Batal"):u.a.createElement(f.f,{color:"primary",variant:"outline",className:"ml-2",shape:"square",onClick:function(){return U(e.id)},size:"sm"},"Add List"):u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",className:"ml-2",onClick:function(){return U(e.id)},size:"sm"},"Add List")))})),v?u.a.createElement("tr",null,u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"urutan",onChange:P,value:x.urutan})),u.a.createElement("td",null,u.a.createElement(b.a,{fullWidth:!0,name:"nama",onChange:P,value:x.nama})),u.a.createElement("td",{colSpan:2},u.a.createElement(b.a,{multiline:!0,fullWidth:!0,name:"isi",onChange:P,value:x.isi}))):null))),u.a.createElement(f.ib,null,u.a.createElement(f.f,{color:"primary",onClick:H},v?"Batalkan":"Tambah Kolom"),v?u.a.createElement(f.f,{color:"success",disabled:L||""===x.isi||""===x.nama||""===x.urutan,onClick:X},L?"...Loading":"Tambahkan"):null,u.a.createElement(f.f,{color:"secondary",onClick:t},"Tutup"))))}));a.default=function(){var e=Object(s.i)(),a=e.slug,t=e.id,r=e.sk_asal,m=Object(l.useState)({nama:"",jenis:"",id:""}),E=Object(o.a)(m,2),v=E[0],_=E[1],y=Object(l.useState)(!1),x=Object(o.a)(y,2),S=x[0],N=x[1],M=Object(l.useState)(!1),z=Object(o.a)(M,2),A=z[0],B=z[1],I=Object(l.useState)([]),D=Object(o.a)(I,2),W=D[0],q=D[1],T=Object(l.useState)([]),Y=Object(o.a)(T,2),K=Y[0],V=Y[1],F=Object(l.useCallback)((function(){N(!S)}),[S]),L=Object(l.useCallback)((function(){B(!A)}),[A]),G=Object(l.useCallback)(function(){var e=Object(c.a)(i.a.mark((function e(a,t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(localStorage.getItem("user")),e.next=3,d.a.get("".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/get-konsideran?sk_list_id=").concat(a,"&jenis=").concat(t,"&instansi_asal=").concat(r),{headers:{Accept:"application/json",Authorization:"Bearer ".concat(n.token)}}).then((function(e){q(e.data)})).catch((function(e){console.log(e)}));case 3:N(!0);case 4:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}(),[r]),H=Object(l.useCallback)(Object(c.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=JSON.parse(localStorage.getItem("user")),e.next=3,d.a.get("".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/get-memutuskan?sk_list_id=").concat(t,"&instansi_asal=").concat(r),{headers:{Accept:"application/json",Authorization:"Bearer ".concat(a.token)}}).then((function(e){V(e.data)})).catch((function(e){console.log(e)}));case 3:B(!0);case 4:case"end":return e.stop()}}),e)}))),[t,r]),U=function(){var e=Object(c.a)(i.a.mark((function e(a,t,n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_({nama:a,jenis:t,id:n});case 2:return e.next=4,G(n,t);case 4:case"end":return e.stop()}}),e)})));return function(a,t,n){return e.apply(this,arguments)}}(),J=p(a),P=J.getData,R=J.Variabel,$=J.User,Q=J.Form,X=J.setForm,Z=J.OnEnter,ee=J.Loading,ae=Object(l.useCallback)(P,[]);return Object(l.useEffect)((function(){ae()}),[ae]),u.a.createElement(f.j,null,""!==v.nama?u.a.createElement(C,{GetDataKonsideran:G,Konsideran:W,TogleModal:F,Modal:S,nama:v.nama,jenis:v.jenis,id:v.id}):null,u.a.createElement(w,{ModalMemutuskan:A,TogleModalMemutuskan:L,GetDatanyaMemutuskan:K,id:t,GetDataMemutuskan:H}),u.a.createElement(f.n,null,u.a.createElement(f.wb,null,u.a.createElement(f.u,{md:8},u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:function(){return U("Menimbang",1,t)}},"Menimbang"),u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",className:"ml-2",size:"sm",onClick:function(){return U("Mengingat",2,t)}},"Mengingat"),u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",className:"ml-2 mr-2",size:"sm",onClick:function(){return U("Memperhatikan",3,t)}},"Memperhatikan"),u.a.createElement(f.f,{color:"primary",variant:"outline",shape:"square",onClick:H,size:"sm"},"Memutuskan")),u.a.createElement(f.u,{md:4},u.a.createElement("div",{className:"card-header-actions text-danger font-weight-bold"},u.a.createElement("a",{href:"".concat("https://api-surat.pta-banjarmasin.go.id/public","/api/c-sk/").concat(a,"/").concat($.instansi_id)},"Cetak"))))),u.a.createElement(f.k,null,u.a.createElement("table",{className:"table table-bordered"},u.a.createElement("tbody",null,R.map((function(e,a){return u.a.createElement("tr",{key:a},u.a.createElement("td",{width:"20%"},""===Q.nomor_variabel?""===e.nama||null===e.nama?"Var No. ".concat(e.nomor):e.nama:Q.nomor_variabel===e.nomor?ee?u.a.createElement("span",{className:"text-success font-weight-bold"},"....Loading"):u.a.createElement("span",{className:"text-danger font-weight-bold"},"Enter to Save"):""===e.nama||null===e.nama?"Var No. ".concat(e.nomor):e.nama),u.a.createElement("td",null,""===e.nama?e.instansi_id===$.instansi_id?u.a.createElement(g,{GetData:ae,nomor:e.nomor}):"Variabel tidak ada Silahkan Hubungi Pemilik SK":"text"===e.tipe?""===Q.nomor_variabel?u.a.createElement("span",{onClick:function(){return X({sk_list_id:e.sk_id,nomor_variabel:e.nomor,isi:e.value})}},e.value?e.value:"Klik disini Untuk Mengubah"):Q.nomor_variabel===e.nomor?u.a.createElement(b.a,{size:"small",fullWidth:!0,autoFocus:!0,onChange:function(e){return X(Object(n.a)(Object(n.a)({},Q),{},{isi:e.target.value}))},onKeyPress:Z,value:Q.isi}):u.a.createElement("span",{onClick:function(){return X({sk_list_id:e.sk_id,nomor_variabel:e.nomor,isi:e.value})}},e.value?e.value:"Klik disini Untuk Mengubah"):""===Q.nomor_variabel?u.a.createElement("span",{onClick:function(){return X({sk_list_id:e.sk_id,nomor_variabel:e.nomor,isi:e.value})}},e.value?h(e.value).locale("id").format("dddd, DD MMMM YYYY"):"Klik disini Untuk Mengubah"):Q.nomor_variabel===e.nomor?u.a.createElement(j.a,{utils:k.a},u.a.createElement(O.a,{onKeyPress:Z,autoFocus:!0,onChange:function(e){return X(Object(n.a)(Object(n.a)({},Q),{},{isi:h(e).format("YYYY-MM-DD")}))},size:"small",fullWidth:!0,autoOk:!0,value:Q.isi,format:"DD MMMM YYYY"})):u.a.createElement("span",{onClick:function(){return X({sk_list_id:e.sk_id,nomor_variabel:e.nomor,isi:e.value})}},e.value?h(e.value).locale("id").format("dddd, DD MMMM YYYY"):"Klik disini Untuk Mengubah")))}))))))}}}]);
//# sourceMappingURL=30.77a384e5.chunk.js.map