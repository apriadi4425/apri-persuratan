(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[27],{719:function(e,t,a){"use strict";var n=function(){for(var e={},t=document.styleSheets,a="",n=t.length-1;n>-1;n--){for(var r=t[n].cssRules,l=r.length-1;l>-1;l--)if(".ie-custom-properties"===r[l].selectorText){a=r[l].cssText;break}if(a)break}return(a=a.substring(a.lastIndexOf("{")+1,a.lastIndexOf("}"))).split(";").forEach((function(t){if(t){var a=t.split(": ")[0],n=t.split(": ")[1];a&&n&&(e["--".concat(a.trim())]=n.trim())}})),e},r=function(){return Boolean(document.documentMode)&&document.documentMode>=10},l=function(e){return e.match(/^--.*/i)};t.a=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(l(e)&&r()){var c=n();t=c[e]}else t=window.getComputedStyle(a,null).getPropertyValue(e).replace(/^\s/,"");return t}},866:function(e,t,a){"use strict";a.r(t);var n=a(622),r=a.n(n),l=a(623),c=a(618),u=a(1),o=a.n(u),i=a(616),s=a(625),m=o.a.memo((function(e){var t=e.KategoriTable;return o.a.createElement("div",{className:"table-responsive"},o.a.createElement("table",{className:"table"},o.a.createElement("tr",null,o.a.createElement("td",null,"Nama"),o.a.createElement("td",null,"Januari"),o.a.createElement("td",null,"Februari"),o.a.createElement("td",null,"Maret"),o.a.createElement("td",null,"April"),o.a.createElement("td",null,"Mei"),o.a.createElement("td",null,"Juni"),o.a.createElement("td",null,"Juli"),o.a.createElement("td",null,"Agustus"),o.a.createElement("td",null,"September"),o.a.createElement("td",null,"Oktober"),o.a.createElement("td",null,"November"),o.a.createElement("td",null,"Desember")),o.a.createElement("tbody",null,t.map((function(e,t){return o.a.createElement("tr",{key:t},o.a.createElement("td",null,e.nama_kategori),o.a.createElement("td",null,e.Januari),o.a.createElement("td",null,e.Februari),o.a.createElement("td",null,e.Maret),o.a.createElement("td",null,e.April),o.a.createElement("td",null,e.Mei),o.a.createElement("td",null,e.Juni),o.a.createElement("td",null,e.Juli),o.a.createElement("td",null,e.Agustus),o.a.createElement("td",null,e.September),o.a.createElement("td",null,e.Oktober),o.a.createElement("td",null,e.November),o.a.createElement("td",null,e.Desember))})))))})),d=a(620),b=a.n(d),p=a(668),E=a(719),f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if("undefined"===typeof e)throw new TypeError("Hex color is not defined");var a,n,r,l=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!l)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(a=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16)):(a=parseInt(e.slice(1,2),16),n=parseInt(e.slice(2,3),16),r=parseInt(e.slice(3,5),16)),"rgba(".concat(a,", ").concat(n,", ").concat(r,", ").concat(t/100,")")},h=Object(E.a)("success")||"#4dbd74",g=Object(E.a)("info")||"#20a8d8",k=(Object(E.a)("danger"),function(e){var t=JSON.parse(localStorage.getItem("user")),a=Object(u.useState)({jumlah:"",chart:[],bulan:[]}),n=Object(c.a)(a,2),i=n[0],s=n[1],m=Object(u.useState)({jumlah:"",chart:[],bulan:[]}),d=Object(c.a)(m,2),E=d[0],k=d[1],v=function(){var e=Object(l.a)(r.a.mark((function e(a,n,l){var c,u=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=u.length>3&&void 0!==u[3]?u[3]:null,e.next=3,b.a.get("".concat("http://surat3.pa-kotabaru.go.id/public","/api/data-surat-keluar?field=").concat(a,"&tabel=").concat(n,"&status=").concat(c),{headers:{Accept:"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){l(e.data)})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){v("tanggal_surat","t_surat_keluar",s,2),v("tanggal_terima","t_surat_masuk",k)}),[]);var j=[{label:"Data Surat Keluar",backgroundColor:f(g,10),borderColor:g,pointHoverBackgroundColor:g,borderWidth:2,data:E.chart},{label:"Data Surat Masuk",backgroundColor:"transparent",borderColor:h,pointHoverBackgroundColor:h,borderWidth:2,data:i.chart}],O={maintainAspectRatio:!1,legend:{display:!0},scales:{xAxes:[{gridLines:{drawOnChartArea:!1}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(Number(i.jumlah)/5),max:Number(i.jumlah)},gridLines:{display:!0}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}};return o.a.createElement(p.a,Object.assign({},e,{datasets:j,options:O,labels:i.bulan}))}),v=Object(u.lazy)((function(){return a.e(23).then(a.bind(null,751))}));t.default=function(){var e=Object(u.useRef)(null),t=JSON.parse(localStorage.getItem("user")),a=Object(u.useState)([]),n=Object(c.a)(a,2),d=n[0],p=n[1],E=Object(u.useState)([]),f=Object(c.a)(E,2),h=f[0],g=f[1],j=function(){var e=Object(l.a)(r.a.mark((function e(a,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("".concat("http://surat3.pa-kotabaru.go.id/public","/api/data-kategori?tabel=").concat(a),{headers:{Accept:"application/json",Authorization:"Bearer ".concat(t.token)}}).then((function(e){n(e.data)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){j("t_surat_keluar",p),j("t_surat_masuk",g)}),[]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(v,null),o.a.createElement(i.j,null,o.a.createElement(i.k,null,o.a.createElement(i.wb,null,o.a.createElement(i.u,{sm:"5"},o.a.createElement("h4",{id:"traffic",className:"card-title mb-0"},"Grafik Data Persuratan"),o.a.createElement("div",{className:"small text-muted"},"Tahun 2020")),o.a.createElement(i.u,{sm:"7",className:"d-none d-md-block"},o.a.createElement(i.f,{color:"primary",className:"float-right"},o.a.createElement(s.a,{name:"cil-cloud-download"})),o.a.createElement(i.g,{className:"float-right mr-3"},o.a.createElement(i.f,{onClick:function(){return e.current.scrollIntoView()},color:"outline-secondary",className:"mx-0"},"Kategori Surat")))),o.a.createElement(k,{style:{height:"300px",marginTop:"40px"}}))),o.a.createElement("div",{ref:e},o.a.createElement(i.wb,null,o.a.createElement(i.u,null,o.a.createElement(i.j,null,o.a.createElement(i.n,null,"Data Kategori Surat Masuk"),o.a.createElement(i.k,null,o.a.createElement(i.wb,null,o.a.createElement(i.u,{xs:"12",md:"12",xl:"12"},o.a.createElement(m,{KategoriTable:d}))))))),o.a.createElement(i.wb,null,o.a.createElement(i.u,null,o.a.createElement(i.j,null,o.a.createElement(i.n,null,"Data Kategori Surat Keluar"),o.a.createElement(i.k,null,o.a.createElement(i.wb,null,o.a.createElement(i.u,{xs:"12",md:"12",xl:"12"},o.a.createElement(m,{KategoriTable:h})))))))))}}}]);
//# sourceMappingURL=27.9c23f869.chunk.js.map