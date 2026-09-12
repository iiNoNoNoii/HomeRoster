"use strict";(()=>{var at=Object.defineProperty;var cr=Object.getOwnPropertyDescriptor;var k=(n,t)=>()=>(n&&(t=n(n=0)),t);var dr=(n,t)=>{for(var e in t)at(n,e,{get:t[e],enumerable:!0})};var c=(n,t,e,r)=>{for(var i=r>1?void 0:r?cr(t,e):t,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(t,e,i):s(i))||i);return r&&i&&at(t,e,i),i};var _e,ye,Ie,lt,X,ct,S,dt,Pe,Re=k(()=>{_e=globalThis,ye=_e.ShadowRoot&&(_e.ShadyCSS===void 0||_e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),lt=new WeakMap,X=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ye&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&lt.set(e,t))}return t}toString(){return this.cssText}},ct=n=>new X(typeof n=="string"?n:n+"",void 0,Ie),S=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,i,o)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new X(e,n,Ie)},dt=(n,t)=>{if(ye)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=_e.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},Pe=ye?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return ct(e)})(n):n});var pr,hr,ur,mr,fr,gr,be,pt,vr,_r,ee,te,$e,ht,N,re=k(()=>{Re();Re();({is:pr,defineProperty:hr,getOwnPropertyDescriptor:ur,getOwnPropertyNames:mr,getOwnPropertySymbols:fr,getPrototypeOf:gr}=Object),be=globalThis,pt=be.trustedTypes,vr=pt?pt.emptyScript:"",_r=be.reactiveElementPolyfillSupport,ee=(n,t)=>n,te={toAttribute(n,t){switch(t){case Boolean:n=n?vr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},$e=(n,t)=>!pr(n,t),ht={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:$e};Symbol.metadata??=Symbol("metadata"),be.litPropertyMetadata??=new WeakMap;N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&hr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:o}=ur(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let p=i?.call(this);o?.call(this,s),this.requestUpdate(t,p,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(ee("elementProperties")))return;let t=gr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ee("properties"))){let e=this.properties,r=[...mr(e),...fr(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(Pe(i))}else t!==void 0&&e.push(Pe(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:te).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:te;this._$Em=i;let p=s.fromAttribute(e,o.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,r,i=!1,o){if(t!==void 0){let s=this.constructor;if(i===!1&&(o=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??$e)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:o},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),o!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:s}=o,p=this[i];s!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,o,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[ee("elementProperties")]=new Map,N[ee("finalized")]=new Map,_r?.({ReactiveElement:N}),(be.reactiveElementVersions??=[]).push("2.1.2")});function wt(n,t){if(!qe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}function G(n,t,e=n,r){if(t===B)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,o=oe(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=G(n,i._$AS(n,t.values),i,r)),t}var We,ut,xe,mt,bt,U,$t,yr,F,ne,oe,qe,br,He,ie,ft,gt,q,vt,_t,xt,Ve,a,Jr,Zr,B,d,yt,V,$r,se,Le,ae,J,Oe,Ne,ze,Ue,xr,Et,we=k(()=>{We=globalThis,ut=n=>n,xe=We.trustedTypes,mt=xe?xe.createPolicy("lit-html",{createHTML:n=>n}):void 0,bt="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+U,yr=`<${$t}>`,F=document,ne=()=>F.createComment(""),oe=n=>n===null||typeof n!="object"&&typeof n!="function",qe=Array.isArray,br=n=>qe(n)||typeof n?.[Symbol.iterator]=="function",He=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,gt=/>/g,q=RegExp(`>|${He}(?:([^\\s"'>=/]+)(${He}*=${He}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,_t=/"/g,xt=/^(?:script|style|textarea|title)$/i,Ve=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),a=Ve(1),Jr=Ve(2),Zr=Ve(3),B=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),yt=new WeakMap,V=F.createTreeWalker(F,129);$r=(n,t)=>{let e=n.length-1,r=[],i,o=t===2?"<svg>":t===3?"<math>":"",s=ie;for(let p=0;p<e;p++){let h=n[p],_,x,f=-1,y=0;for(;y<h.length&&(s.lastIndex=y,x=s.exec(h),x!==null);)y=s.lastIndex,s===ie?x[1]==="!--"?s=ft:x[1]!==void 0?s=gt:x[2]!==void 0?(xt.test(x[2])&&(i=RegExp("</"+x[2],"g")),s=q):x[3]!==void 0&&(s=q):s===q?x[0]===">"?(s=i??ie,f=-1):x[1]===void 0?f=-2:(f=s.lastIndex-x[2].length,_=x[1],s=x[3]===void 0?q:x[3]==='"'?_t:vt):s===_t||s===vt?s=q:s===ft||s===gt?s=ie:(s=q,i=void 0);let m=s===q&&n[p+1].startsWith("/>")?" ":"";o+=s===ie?h+yr:f>=0?(r.push(_),h.slice(0,f)+bt+h.slice(f)+U+m):h+U+(f===-2?p:m)}return[wt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},se=class n{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,s=0,p=t.length-1,h=this.parts,[_,x]=$r(t,e);if(this.el=n.createElement(_,r),V.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=V.nextNode())!==null&&h.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let f of i.getAttributeNames())if(f.endsWith(bt)){let y=x[s++],m=i.getAttribute(f).split(U),E=/([.?@])?(.*)/.exec(y);h.push({type:1,index:o,name:E[2],strings:m,ctor:E[1]==="."?Oe:E[1]==="?"?Ne:E[1]==="@"?ze:J}),i.removeAttribute(f)}else f.startsWith(U)&&(h.push({type:6,index:o}),i.removeAttribute(f));if(xt.test(i.tagName)){let f=i.textContent.split(U),y=f.length-1;if(y>0){i.textContent=xe?xe.emptyScript:"";for(let m=0;m<y;m++)i.append(f[m],ne()),V.nextNode(),h.push({type:2,index:++o});i.append(f[y],ne())}}}else if(i.nodeType===8)if(i.data===$t)h.push({type:2,index:o});else{let f=-1;for(;(f=i.data.indexOf(U,f+1))!==-1;)h.push({type:7,index:o}),f+=U.length-1}o++}}static createElement(t,e){let r=F.createElement("template");return r.innerHTML=t,r}};Le=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??F).importNode(e,!0);V.currentNode=i;let o=V.nextNode(),s=0,p=0,h=r[0];for(;h!==void 0;){if(s===h.index){let _;h.type===2?_=new ae(o,o.nextSibling,this,t):h.type===1?_=new h.ctor(o,h.name,h.strings,this,t):h.type===6&&(_=new Ue(o,this,t)),this._$AV.push(_),h=r[++p]}s!==h?.index&&(o=V.nextNode(),s++)}return V.currentNode=F,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},ae=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),oe(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==B&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):br(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&oe(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=se.createElement(wt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new Le(i,this),s=o.u(this.options);o.p(e),this.T(s),this._$AH=o}}_$AC(t){let e=yt.get(t.strings);return e===void 0&&yt.set(t.strings,e=new se(t)),e}k(t){qe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let o of t)i===e.length?e.push(r=new n(this.O(ne()),this.O(ne()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=ut(t).nextSibling;ut(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(t,e=this,r,i){let o=this.strings,s=!1;if(o===void 0)t=G(this,t,e,0),s=!oe(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{let p=t,h,_;for(t=o[0],h=0;h<o.length-1;h++)_=G(this,p[r+h],e,h),_===B&&(_=this._$AH[h]),s||=!oe(_)||_!==this._$AH[h],_===d?t=d:t!==d&&(t+=(_??"")+o[h+1]),this._$AH[h]=_}s&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Oe=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},Ne=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},ze=class extends J{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??d)===B)return;let r=this._$AH,i=t===d&&r!==d||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==d&&(r===d||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ue=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}},xr=We.litHtmlPolyfillSupport;xr?.(se,ae),(We.litHtmlVersions??=[]).push("3.3.3");Et=(n,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let o=e?.renderBefore??null;r._$litPart$=i=new ae(t.insertBefore(ne(),o),o,void 0,e??{})}return i._$AI(n),i}});var Fe,$,wr,kt=k(()=>{re();re();we();we();Fe=globalThis,$=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Et(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};$._$litElement$=!0,$.finalized=!0,Fe.litElementHydrateSupport?.({LitElement:$});wr=Fe.litElementPolyfillSupport;wr?.({LitElement:$});(Fe.litElementVersions??=[]).push("4.2.2")});var Ct=k(()=>{});var C=k(()=>{re();we();kt();Ct()});var T,Tt=k(()=>{T=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)}});function g(n){return(t,e)=>typeof e=="object"?kr(n,t,e):((r,i,o)=>{let s=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}var Er,kr,Be=k(()=>{re();Er={attribute:!0,type:String,converter:te,reflect:!1,hasChanged:$e},kr=(n=Er,t,e)=>{let{kind:r,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),r==="accessor"){let{name:s}=e;return{set(p){let h=t.get.call(this);t.set.call(this,p),this.requestUpdate(s,h,n,!0,p)},init(p){return p!==void 0&&this.C(s,void 0,n,p),p}}}if(r==="setter"){let{name:s}=e;return function(p){let h=this[s];t.call(this,p),this.requestUpdate(s,h,n,!0,p)}}throw Error("Unsupported decorator location: "+r)}});function u(n){return g({...n,state:!0,attribute:!1})}var At=k(()=>{Be();});var St=k(()=>{});var Z=k(()=>{});var Dt=k(()=>{Z();});var Mt=k(()=>{Z();});var It=k(()=>{Z();});var Pt=k(()=>{Z();});var Rt=k(()=>{Z();});var z=k(()=>{Tt();Be();At();St();Dt();Mt();It();Pt();Rt()});var Ae,rt=k(()=>{"use strict";Ae={default_view:"week",show_filters:!0,show_search:!0,show_add_button:!0,allow_edit:!0,show_done_events:!0,show_cancelled_events:!1,show_weekends:!0,show_week_numbers:!0,start_hour:6,end_hour:22,time_step:30,time_format:"auto",max_events_per_day:3,agenda_days:14,dim_past_events:!0,color_mode:"person",compact:!1,show_now_line:!0,highlight_today:!0,read_only:!1,first_weekday:"monday"}});var ar={};dr(ar,{FamilyPlannerCardEditor:()=>Y});var Wr,qr,Y,lr=k(()=>{"use strict";C();z();rt();Wr={title:"Titel",default_view:"Standardansicht",show_filters:"Filterleiste anzeigen",show_search:"Suchfeld anzeigen",show_add_button:"Plus-Schaltfl\xE4che anzeigen",allow_edit:"Erstellen/Bearbeiten erlauben",read_only:"Nur-Lesen-Modus (Kiosk)",show_done_events:"Erledigte Termine anzeigen",show_cancelled_events:"Abgesagte Termine anzeigen",show_weekends:"Wochenenden anzeigen",show_week_numbers:"Kalenderwochen anzeigen",start_hour:"Startstunde",end_hour:"Endstunde",time_step:"Zeitschritt (Minuten)",time_format:"Zeitformat",max_events_per_day:"Max. Termine pro Tag (Monatsansicht)",agenda_days:"Agenda-Zeitraum (Tage)",dim_past_events:"Vergangene Termine abdunkeln",color_mode:"Farbmodus",compact:"Kompakter Modus",show_now_line:"\u201EJetzt\u201C-Linie anzeigen",highlight_today:"Heutiges Datum hervorheben",first_weekday:"Erster Wochentag"},qr=[{name:"title",selector:{text:{}}},{name:"default_view",selector:{select:{options:["today","day","week","month","agenda"],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_filters",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_add_button",selector:{boolean:{}}},{name:"allow_edit",selector:{boolean:{}}},{name:"read_only",selector:{boolean:{}}},{name:"show_done_events",selector:{boolean:{}}},{name:"show_cancelled_events",selector:{boolean:{}}},{name:"show_weekends",selector:{boolean:{}}},{name:"show_week_numbers",selector:{boolean:{}}},{name:"dim_past_events",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"show_now_line",selector:{boolean:{}}},{name:"highlight_today",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"start_hour",selector:{number:{min:0,max:23,mode:"box"}}},{name:"end_hour",selector:{number:{min:1,max:24,mode:"box"}}},{name:"time_step",selector:{number:{min:5,max:60,step:5,mode:"box"}}},{name:"max_events_per_day",selector:{number:{min:1,max:10,mode:"box"}}},{name:"agenda_days",selector:{number:{min:1,max:60,mode:"box"}}}]},{name:"time_format",selector:{select:{options:["auto","12","24"],mode:"dropdown"}}},{name:"color_mode",selector:{select:{options:["person","category"],mode:"dropdown"}}},{name:"first_weekday",selector:{select:{options:["monday","sunday"],mode:"dropdown"}}}],Y=class extends ${constructor(){super(...arguments);this._computeLabel=e=>Wr[e.name]??e.name}setConfig(e){this._config={...Ae,...e,type:e.type}}_valueChanged(e){e.stopPropagation(),this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return!this.hass||!this._config?d:a`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${qr}
        .computeLabel=${this._computeLabel}
        @value-changed=${e=>this._valueChanged(e)}
      ></ha-form>
    `}};c([g({attribute:!1})],Y.prototype,"hass",2),c([u()],Y.prototype,"_config",2),Y=c([T("family-planner-card-editor")],Y)});C();z();var le=class extends Error{constructor(t){super(t.message),this.code=t.code,this.current=t.current}};async function A(n,t){let e=await n.callWS(t);if(e&&typeof e=="object"&&"error"in e&&e.error)throw new le(e.error);return e}function Ht(n){return A(n,{type:"family_planner/config"})}async function Lt(n,t){return(await A(n,{type:"family_planner/events/get",...t})).events}async function Ot(n,t){return(await A(n,{type:"family_planner/events/create",...t})).event}async function je(n,t){return(await A(n,{type:"family_planner/events/update",...t})).event}async function Nt(n,t,e="series",r){await A(n,{type:"family_planner/events/delete",event_id:t,mode:e,occurrence_start:r})}async function zt(n,t,e,r){return(await A(n,{type:"family_planner/events/duplicate",event_id:t,start:e,end:r})).event}async function Ye(n){return(await A(n,{type:"family_planner/people/list"})).people}async function Ut(n,t){return(await A(n,{type:"family_planner/people/create",...t})).person}async function Ke(n,t,e){return(await A(n,{type:"family_planner/people/update",person_id:t,...e})).person}async function Wt(n,t,e,r){await A(n,{type:"family_planner/people/delete",person_id:t,strategy:e,reassign_to:r})}async function qt(n,t){return(await A(n,{type:"family_planner/people/reorder",ordered_ids:t})).people}async function Ge(n){return(await A(n,{type:"family_planner/categories/list"})).categories}async function Vt(n,t){return(await A(n,{type:"family_planner/categories/create",...t})).category}async function Je(n,t,e){return(await A(n,{type:"family_planner/categories/update",category_id:t,...e})).category}async function Ft(n,t){await A(n,{type:"family_planner/categories/delete",category_id:t})}async function Bt(n,t){return(await A(n,{type:"family_planner/categories/reorder",ordered_ids:t})).categories}C();var jt=S`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  .fp-loading {
    padding: 32px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .fp-banner {
    padding: 8px 16px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .fp-banner-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
  }
  .fp-banner button {
    background: none;
    border: 1px solid currentColor;
    border-radius: 4px;
    color: inherit;
    padding: 2px 10px;
  }

  .fp-header {
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fp-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .fp-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .fp-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .fp-fab {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .fp-fab:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .fp-header-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .fp-view-switch {
    display: flex;
    background: var(--secondary-background-color, #f0f0f0);
    border-radius: 8px;
    padding: 2px;
    gap: 2px;
  }
  .fp-view-switch button {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    min-height: 32px;
  }
  .fp-view-switch button.active {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .fp-nav-arrows {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fp-nav-today {
    border: 1px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--primary-text-color);
    border-radius: 6px;
    padding: 6px 10px;
    min-height: 32px;
  }

  .fp-range-label {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    margin-left: auto;
  }

  .fp-search {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 8px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 0.9rem;
    min-height: 40px;
  }

  .fp-filterbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .fp-person-chip,
  .fp-category-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 12px;
    min-height: 36px;
    font-size: 0.85rem;
  }
  .fp-person-chip.active,
  .fp-category-chip.active {
    border-color: var(--fp-chip-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-chip-color, var(--primary-color)) 18%, var(--card-background-color, #fff));
    font-weight: 600;
  }
  .fp-person-chip-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .fp-person-chip-all.active {
    border-color: var(--primary-color);
    font-weight: 600;
  }

  .fp-body {
    flex: 1;
    overflow: auto;
    padding: 8px 12px 16px;
  }

  /* ---- empty state ---- */
  .fp-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 48px 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .fp-empty-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--disabled-text-color);
  }
  .fp-empty-title {
    font-size: 1.1rem;
    color: var(--primary-text-color);
  }

  /* ---- shared chip (month cells / all-day row) ---- */
  .fp-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 3px 6px;
    font-size: 0.78rem;
    text-align: left;
    overflow: hidden;
    min-height: 22px;
  }
  .fp-chip-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .fp-chip-time {
    font-weight: 600;
    opacity: 0.85;
  }
  .fp-chip-icon {
    --mdc-icon-size: 14px;
  }
  .fp-chip.fp-past {
    opacity: 0.5;
  }
  .fp-chip.fp-cancelled {
    text-decoration: line-through;
  }

  .fp-person-dots {
    display: inline-flex;
    margin-left: auto;
  }
  .fp-person-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: #fff;
    margin-left: -6px;
    border: 1px solid var(--card-background-color, #fff);
    text-transform: uppercase;
  }
  .fp-person-dot:first-child {
    margin-left: 0;
  }
  .fp-person-dot-more {
    background: var(--disabled-text-color, #9e9e9e);
  }

  /* ---- month view ---- */
  .fp-view-month {
    display: flex;
    flex-direction: column;
    min-width: 640px;
  }
  .fp-month-headerrow,
  .fp-month-week {
    display: grid;
  }
  .fp-month-week {
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-month-weekday {
    padding: 6px 4px;
    text-align: center;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }
  .fp-month-weeknum-header {
    grid-column: 1;
  }
  .fp-month-weeknum {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 6px;
    font-size: 0.65rem;
    color: var(--disabled-text-color);
  }
  .fp-month-cell {
    min-height: 84px;
    border-right: 1px solid var(--divider-color, #e0e0e0);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
  }
  .fp-month-cell:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.02));
  }
  .fp-month-cell-date {
    font-size: 0.8rem;
    color: var(--primary-text-color);
    align-self: flex-end;
  }
  .fp-month-cell.fp-today .fp-month-cell-date {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fp-month-cell.fp-outside-month {
    opacity: 0.4;
  }
  .fp-month-cell-events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .fp-month-more {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
    text-align: left;
    padding: 2px 4px;
  }

  /* ---- time grid (day/week) ---- */
  .fp-timegrid {
    min-width: 480px;
  }
  .fp-timegrid-header,
  .fp-allday-row {
    display: flex;
  }
  .fp-time-gutter {
    width: 52px;
    flex-shrink: 0;
  }
  .fp-time-gutter-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
  }
  .fp-day-header {
    flex: 1;
    text-align: center;
    padding: 4px 2px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-day-header-weekday {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }
  .fp-day-header-date {
    font-size: 0.95rem;
    color: var(--primary-text-color);
  }
  .fp-day-header.fp-today .fp-day-header-date {
    color: var(--primary-color);
    font-weight: 700;
  }
  .fp-allday-row {
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    padding: 2px 0;
  }
  .fp-allday-cell {
    flex: 1;
    min-height: 24px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 2px;
    cursor: pointer;
  }
  .fp-timegrid-scroll {
    display: flex;
    position: relative;
  }
  .fp-time-gutter-col {
    width: 52px;
    flex-shrink: 0;
    position: relative;
  }
  .fp-hour-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    border-top: 1px solid var(--divider-color, #eee);
    padding-left: 4px;
    box-sizing: border-box;
  }
  .fp-day-col {
    flex: 1;
    position: relative;
    border-left: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-hour-line {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px solid var(--divider-color, #eee);
  }
  .fp-timed-event-slot {
    position: absolute;
    padding: 0 1px;
  }
  .fp-timed-event-slot .fp-chip {
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
  .fp-now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--error-color, #db4437);
    z-index: 2;
  }
  .fp-now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color, #db4437);
  }

  .fp-week-number {
    font-size: 0.75rem;
    color: var(--disabled-text-color);
    padding: 0 0 4px 52px;
  }

  /* ---- agenda view ---- */
  .fp-agenda-group {
    margin-bottom: 12px;
  }
  .fp-agenda-daylabel {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    padding: 4px 0;
    position: sticky;
    top: 0;
    background: var(--card-background-color, #fff);
  }
  .fp-agenda-daylabel.fp-today {
    color: var(--primary-color);
  }
  .fp-agenda-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .fp-agenda-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    border-radius: 8px;
    padding: 10px 12px;
    min-height: 44px;
    text-align: left;
  }
  .fp-agenda-item.fp-cancelled .fp-agenda-item-title {
    text-decoration: line-through;
    color: var(--disabled-text-color);
  }
  .fp-agenda-item-bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .fp-agenda-item-time {
    font-variant-numeric: tabular-nums;
    min-width: 52px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .fp-agenda-item-title {
    flex: 1;
    color: var(--primary-text-color);
  }
  .fp-agenda-item-location {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
  }
  .fp-agenda-item-location ha-icon {
    --mdc-icon-size: 14px;
  }
  .fp-agenda-item-status {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 1px 6px;
  }

  .fp-compact .fp-agenda-item {
    padding: 6px 10px;
    min-height: 32px;
  }

  @media (max-width: 600px) {
    .fp-header-top {
      flex-wrap: wrap;
    }
    .fp-range-label {
      margin-left: 0;
      width: 100%;
      order: 3;
    }
    .fp-month-cell {
      min-height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }
`;var M=n=>String(n).padStart(2,"0");function Cr(n){return`${n.getFullYear()}-${M(n.getMonth()+1)}-${M(n.getDate())}`}function Tr(n){let t=-n.getTimezoneOffset(),e=t>=0?"+":"-",r=M(Math.floor(Math.abs(t)/60)),i=M(Math.abs(t)%60);return`${n.getFullYear()}-${M(n.getMonth()+1)}-${M(n.getDate())}T${M(n.getHours())}:${M(n.getMinutes())}:${M(n.getSeconds())}${e}${r}:${i}`}function Qe(n,t){let[e,r]=(t||"00:00").split(":").map(Number),[i,o,s]=n.split("-").map(Number),p=new Date(i,(o||1)-1,s||1,e||0,r||0,0);return Tr(p)}function Xe(n,t){let[e,r,i]=n.split("-").map(Number),o=new Date(e,(r||1)-1,i||1,12,0,0);return o.setDate(o.getDate()+t),Cr(o)}function w(n,t){let e=new Date(n);return e.setDate(e.getDate()+t),e}function Q(n,t){let e=new Date(n);e.setHours(0,0,0,0);let r=e.getDay(),i=t==="monday"?r===0?6:r-1:r;return w(e,-i)}function ke(n,t){let e=new Date(n.getFullYear(),n.getMonth(),1);return Q(e,t)}function R(n,t){return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()&&n.getDate()===t.getDate()}function Yt(n,t){if(t==="24")return!0;if(t==="12")return!1;let e=n.locale?.time_format;if(e==="24")return!0;if(e==="12")return!1;try{return!new Intl.DateTimeFormat(n.language||"en",{hour:"numeric"}).formatToParts(new Date(2e3,0,1,13)).some(i=>i.type==="dayPeriod")}catch{return!0}}function ce(n,t){if(t)return`${M(n.getHours())}:${M(n.getMinutes())}`;let e=n.getHours()%12||12,r=n.getHours()<12?"AM":"PM";return`${e}:${M(n.getMinutes())} ${r}`}function Ce(n){let t=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate())),e=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-e);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function Te(n,t){if(t)return t;let e=n.locale?.first_weekday;return e==="monday"||e==="sunday"?e:"monday"}function et(n,t){let e;return(...r)=>{e&&clearTimeout(e),e=setTimeout(()=>n(...r),t)}}function Kt(n,t){let e=n;t.showDoneEvents||(e=e.filter(i=>i.status!=="done")),t.showCancelledEvents||(e=e.filter(i=>i.status!=="cancelled")),t.personIds.length>0&&(e=e.filter(i=>i.person_ids.some(o=>t.personIds.includes(o)))),t.categoryIds.length>0&&(e=e.filter(i=>i.category_id!==null&&t.categoryIds.includes(i.category_id)));let r=t.search.trim().toLowerCase();return r&&(e=e.filter(i=>[i.title,i.subtitle,i.description,i.location].filter(o=>!!o).some(o=>o.toLowerCase().includes(r)))),[...e]}var Ar={"view.today":"Heute","view.day":"Tag","view.week":"Woche","view.month":"Monat","view.agenda":"Agenda","nav.today":"Heute","nav.prev":"Zur\xFCck","nav.next":"Weiter","action.add_event":"Termin hinzuf\xFCgen","action.search":"Suchen","action.filter":"Filter","action.save":"Speichern","action.cancel":"Abbrechen","action.delete":"L\xF6schen","action.edit":"Bearbeiten","action.duplicate":"Duplizieren","action.close":"Schlie\xDFen","action.done":"Fertig","action.mark_done":"Als erledigt markieren","action.manage_people":"Personen verwalten","action.manage_categories":"Kategorien verwalten","action.export":"Als JSON exportieren","action.import":"JSON importieren","event.title":"Titel","event.subtitle":"Untertitel","event.start_date":"Startdatum","event.start_time":"Startzeit","event.end_date":"Enddatum","event.end_time":"Endzeit","event.all_day":"Ganzt\xE4gig","event.people":"Personen","event.description":"Beschreibung","event.location":"Ort","event.category":"Kategorie","event.color":"Farbe","event.icon":"Symbol","event.status":"Status","event.reminders":"Erinnerungen","event.repeat":"Wiederholung","event.repeat_none":"Keine Wiederholung","event.new_title":"Neuer Termin","event.edit_title":"Termin bearbeiten","event.no_people":"Keine Person zugewiesen","status.planned":"Geplant","status.confirmed":"Best\xE4tigt","status.tentative":"Optional","status.done":"Erledigt","status.cancelled":"Abgesagt","validation.title_required":"Bitte einen Titel eingeben.","validation.end_before_start":"Das Ende darf nicht vor dem Start liegen.","validation.person_required":"Bitte mindestens eine Person ausw\xE4hlen.","empty.no_events":"Keine Termine","empty.no_events_hint":"F\xFCr diesen Zeitraum sind keine Termine vorhanden. Tippe auf +, um einen Termin zu erstellen.","month.more":"+{count} weitere","dialog.confirm_delete_title":"Termin l\xF6schen?","dialog.confirm_delete_series":"Ganze Serie l\xF6schen","dialog.confirm_delete_instance":"Nur diesen Termin l\xF6schen","dialog.unsaved_changes_title":"Ungespeicherte \xC4nderungen","dialog.unsaved_changes_message":"Es gibt ungespeicherte \xC4nderungen. Trotzdem schlie\xDFen?","dialog.discard":"Verwerfen","dialog.keep_editing":"Weiter bearbeiten","people.title":"Personen","people.add":"Person hinzuf\xFCgen","people.name":"Name","people.color":"Farbe","people.role":"Rolle","people.role.parent":"Elternteil","people.role.child":"Kind","people.role.other":"Sonstige","people.active":"Aktiv","people.delete_title":"Person l\xF6schen?","people.delete_strategy.deactivate":"Nur deaktivieren","people.delete_strategy.remove_from_events":"Aus Terminen entfernen","people.delete_strategy.reassign":"Terminen einer anderen Person zuweisen","people.delete_strategy.keep_unassigned":"Termine ohne Personenzuweisung behalten","people.reassign_to":"Neu zuweisen an","category.title":"Kategorien","category.add":"Kategorie hinzuf\xFCgen","category.name":"Name","category.color":"Farbe","category.none":"Keine Kategorie","filter.all_people":"Alle Personen","filter.search_placeholder":"Termine durchsuchen\u2026","error.connection_lost":"Verbindung zu Home Assistant verloren. Es wird versucht, erneut zu verbinden\u2026","error.forbidden":"Keine Berechtigung f\xFCr diese Aktion.","error.conflict":"Dieser Termin wurde inzwischen auf einem anderen Ger\xE4t ge\xE4ndert.","error.not_found":"Dieser Termin existiert nicht mehr.","error.invalid_data":"Ung\xFCltige Eingabe.","error.not_loaded":"Family Planner wird noch geladen\u2026","error.unknown_error":"Unbekannter Fehler.","error.reload":"Neu laden","reminder.at_start":"Zum Startzeitpunkt","reminder.5":"5 Minuten vorher","reminder.15":"15 Minuten vorher","reminder.30":"30 Minuten vorher","reminder.60":"1 Stunde vorher","reminder.1440":"1 Tag vorher","reminder.custom":"Eigener Wert (Minuten)","weekday.short.0":"So","weekday.short.1":"Mo","weekday.short.2":"Di","weekday.short.3":"Mi","weekday.short.4":"Do","weekday.short.5":"Fr","weekday.short.6":"Sa",calendar_week_short:"KW"},Sr={"view.today":"Today","view.day":"Day","view.week":"Week","view.month":"Month","view.agenda":"Agenda","nav.today":"Today","nav.prev":"Previous","nav.next":"Next","action.add_event":"Add event","action.search":"Search","action.filter":"Filter","action.save":"Save","action.cancel":"Cancel","action.delete":"Delete","action.edit":"Edit","action.duplicate":"Duplicate","action.close":"Close","action.done":"Done","action.mark_done":"Mark as done","action.manage_people":"Manage people","action.manage_categories":"Manage categories","action.export":"Export as JSON","action.import":"Import JSON","event.title":"Title","event.subtitle":"Subtitle","event.start_date":"Start date","event.start_time":"Start time","event.end_date":"End date","event.end_time":"End time","event.all_day":"All day","event.people":"People","event.description":"Description","event.location":"Location","event.category":"Category","event.color":"Color","event.icon":"Icon","event.status":"Status","event.reminders":"Reminders","event.repeat":"Repeat","event.repeat_none":"Does not repeat","event.new_title":"New event","event.edit_title":"Edit event","event.no_people":"No one assigned","status.planned":"Planned","status.confirmed":"Confirmed","status.tentative":"Tentative","status.done":"Done","status.cancelled":"Cancelled","validation.title_required":"Please enter a title.","validation.end_before_start":"The end must not be before the start.","validation.person_required":"Please select at least one person.","empty.no_events":"No events","empty.no_events_hint":"There are no events in this range. Tap + to create one.","month.more":"+{count} more","dialog.confirm_delete_title":"Delete event?","dialog.confirm_delete_series":"Delete whole series","dialog.confirm_delete_instance":"Delete only this occurrence","dialog.unsaved_changes_title":"Unsaved changes","dialog.unsaved_changes_message":"You have unsaved changes. Close anyway?","dialog.discard":"Discard","dialog.keep_editing":"Keep editing","people.title":"People","people.add":"Add person","people.name":"Name","people.color":"Color","people.role":"Role","people.role.parent":"Parent","people.role.child":"Child","people.role.other":"Other","people.active":"Active","people.delete_title":"Delete person?","people.delete_strategy.deactivate":"Deactivate only","people.delete_strategy.remove_from_events":"Remove from events","people.delete_strategy.reassign":"Reassign events to another person","people.delete_strategy.keep_unassigned":"Keep events without a person assigned","people.reassign_to":"Reassign to","category.title":"Categories","category.add":"Add category","category.name":"Name","category.color":"Color","category.none":"No category","filter.all_people":"All people","filter.search_placeholder":"Search events\u2026","error.connection_lost":"Connection to Home Assistant lost. Reconnecting\u2026","error.forbidden":"You are not allowed to do this.","error.conflict":"This event was changed on another device in the meantime.","error.not_found":"This event no longer exists.","error.invalid_data":"Invalid input.","error.not_loaded":"Family Planner is still loading\u2026","error.unknown_error":"Unknown error.","error.reload":"Reload","reminder.at_start":"At start time","reminder.5":"5 minutes before","reminder.15":"15 minutes before","reminder.30":"30 minutes before","reminder.60":"1 hour before","reminder.1440":"1 day before","reminder.custom":"Custom (minutes)","weekday.short.0":"Sun","weekday.short.1":"Mon","weekday.short.2":"Tue","weekday.short.3":"Wed","weekday.short.4":"Thu","weekday.short.5":"Fri","weekday.short.6":"Sat",calendar_week_short:"W"},tt={de:Ar,en:Sr};function l(n,t,e){let r=(n||"de").split("-")[0],o=(tt[r]||tt.de)[t]??tt.de[t]??t;if(e)for(let[s,p]of Object.entries(e))o=o.replace(`{${s}}`,String(p));return o}rt();C();C();function Dr(n){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n.trim());return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}function Gt(n){let t=Dr(n);if(!t)return"#000000";let[e,r,i]=t.map(s=>{let p=s/255;return p<=.03928?p/12.92:Math.pow((p+.055)/1.055,2.4)});return .2126*e+.7152*r+.0722*i>.42?"#000000":"#ffffff"}function W(n,t,e,r){if(n.color)return n.color;if(r==="category"&&n.category_id){let i=e.find(o=>o.id===n.category_id);if(i)return i.color}if(n.person_ids.length>0){let i=t.find(o=>o.id===n.person_ids[0]);if(i)return i.color}if(n.category_id){let i=e.find(o=>o.id===n.category_id);if(i)return i.color}return"var(--primary-color, #03a9f4)"}function de(n,t){return n.person_ids.map(e=>t.find(r=>r.id===e)).filter(e=>!!e)}function pe(n,t=4,e){let r=n.slice(0,t),i=n.length-r.length;return a`
    <span class="fp-person-dots" role="img" aria-label=${n.map(o=>o.name).join(", ")||l(e,"event.no_people")}>
      ${r.map(o=>a`<span class="fp-person-dot" style="background:${o.color}" title=${o.name}>${o.name.slice(0,1)}</span>`)}
      ${i>0?a`<span class="fp-person-dot fp-person-dot-more">+${i}</span>`:d}
    </span>
  `}function he(n,t){return n.all_day?"":ce(new Date(n.occurrence_start),t)}function Mr(n,t){return new Date(n.occurrence_end).getTime()<t.getTime()}function ue(n,t,e){let r=W(t,n.people,n.categories,n.config.color_mode??"person"),i=Gt(r),o=de(t,n.people),s=(n.config.dim_past_events??!0)&&Mr(t,n.now),p=t.status==="cancelled",h=["fp-chip",s?"fp-past":"",p?"fp-cancelled":""].filter(Boolean).join(" ");return a`
    <button
      type="button"
      class=${h}
      style="background:${r};color:${i}"
      title=${t.title}
      @click=${_=>{_.stopPropagation(),n.callbacks.onEventClick(t)}}
    >
      ${t.icon?a`<ha-icon icon=${t.icon} class="fp-chip-icon"></ha-icon>`:d}
      ${!t.all_day&&!e?.compact?a`<span class="fp-chip-time">${he(t,n.use24h)}</span>`:d}
      <span class="fp-chip-title">${t.title}</span>
      ${o.length>1?pe(o,3,n.hass.language):d}
    </button>
  `}function Jt(n,t){return n?l(t,`status.${n}`):""}function Zt(n){let t=n.config.agenda_days??14,e=[];for(let i=0;i<t;i++)e.push(w(n.currentDate,i));let r=e.map(i=>({day:i,events:n.events.filter(o=>R(new Date(o.occurrence_start),i)||o.all_day&&Ir(o,i)).sort((o,s)=>new Date(o.occurrence_start).getTime()-new Date(s.occurrence_start).getTime())})).filter(i=>i.events.length>0);return r.length===0?a`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <div class="fp-empty-title">${l(n.hass.language,"empty.no_events")}</div>
        <div class="fp-empty-hint">${l(n.hass.language,"empty.no_events_hint")}</div>
      </div>
    `:a`
    <div class="fp-view fp-view-agenda">
      ${r.map(i=>a`
          <div class="fp-agenda-group">
            <div class="fp-agenda-daylabel ${R(i.day,n.now)?"fp-today":""}">
              ${l(n.hass.language,`weekday.short.${i.day.getDay()}`)} ${i.day.getDate()}.${i.day.getMonth()+1}.
            </div>
            <div class="fp-agenda-items">
              ${i.events.map(o=>Pr(n,o))}
            </div>
          </div>
        `)}
    </div>
  `}function Ir(n,t){let e=new Date(n.occurrence_start),r=new Date(n.occurrence_end),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=w(i,1);return e<o&&r>i}function Pr(n,t){let e=W(t,n.people,n.categories,n.config.color_mode??"person"),r=de(t,n.people);return a`
    <button
      type="button"
      class="fp-agenda-item ${t.status==="cancelled"?"fp-cancelled":""}"
      @click=${()=>n.callbacks.onEventClick(t)}
    >
      <span class="fp-agenda-item-bar" style="background:${e}"></span>
      <span class="fp-agenda-item-time">${t.all_day?l(n.hass.language,"event.all_day"):he(t,n.use24h)}</span>
      <span class="fp-agenda-item-title">${t.title}</span>
      ${t.location?a`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${t.location}</span>`:d}
      ${t.status?a`<span class="fp-agenda-item-status">${Jt(t.status,n.hass.language)}</span>`:d}
      ${pe(r,4,n.hass.language)}
    </button>
  `}C();C();function Qt(n){if(n.length===0)return[];let t=[...n].sort((p,h)=>p.start!==h.start?p.start-h.start:p.end-h.end),e=[],r=[],i=-1/0,o=[],s=()=>{if(r.length===0)return;let p=Math.max(...r.map(h=>h.lane))+1;for(let h of r)e.push({item:h.item,lane:h.lane,laneCount:p});r=[],o.length=0};for(let p of t){p.start>=i&&(s(),i=-1/0);let h=o.findIndex(_=>_<=p.start);h===-1?(h=o.length,o.push(p.end)):o[h]=p.end,r.push({item:p,lane:h}),i=Math.max(i,p.end)}return s(),e}var Xt={compact:32,normal:48};function Rr(n){return n.getHours()*60+n.getMinutes()}function Se(n,t){let e=n.config.start_hour??6,r=n.config.end_hour??22,i=n.config.time_step??30,o=n.config.compact?Xt.compact:Xt.normal,s=(r-e)*60,p=s/i*o,h=[];for(let m=e;m<=r;m++)h.push(m);let _=n.events.filter(m=>m.all_day&&t.some(E=>R(E,new Date(m.occurrence_start)))),x=_.length>0,f=m=>Math.min(Math.max(Rr(m)-e*60,0),s)/s*100,y=n.now;return a`
    <div class="fp-timegrid" style="--fp-row-height:${o}px">
      <div class="fp-timegrid-header">
        <div class="fp-time-gutter"></div>
        ${t.map(m=>a`
            <div class="fp-day-header ${R(m,y)?"fp-today":""}">
              <div class="fp-day-header-weekday">${l(n.hass.language,`weekday.short.${m.getDay()}`)}</div>
              <div class="fp-day-header-date">${m.getDate()}.${m.getMonth()+1}.</div>
            </div>
          `)}
      </div>
      ${x?a`
            <div class="fp-allday-row">
              <div class="fp-time-gutter fp-time-gutter-label">${l(n.hass.language,"event.all_day")}</div>
              ${t.map(m=>{let E=_.filter(P=>R(m,new Date(P.occurrence_start)));return a`
                  <div class="fp-allday-cell" @click=${()=>n.callbacks.onSlotClick(m,!0)}>
                    ${E.map(P=>ue(n,P,{compact:!0}))}
                  </div>
                `})}
            </div>
          `:d}
      <div class="fp-timegrid-scroll">
        <div class="fp-time-gutter-col" style="height:${p}px">
          ${h.map(m=>a`<div class="fp-hour-label" style="height:${o*(60/i)}px">
              ${String(m).padStart(2,"0")}:00
            </div>`)}
        </div>
        ${t.map(m=>{let E=n.events.filter(D=>!D.all_day&&R(m,new Date(D.occurrence_start))),P=Qt(E.map(D=>({event:D,start:new Date(D.occurrence_start).getTime(),end:new Date(D.occurrence_end).getTime()}))),K=R(m,y)?f(y):null;return a`
            <div
              class="fp-day-col"
              style="height:${p}px"
              @click=${D=>{let De=D.currentTarget.getBoundingClientRect(),ge=D.clientY-De.top,Me=Math.round(ge/p*s/i)*i+e*60,ve=new Date(m);ve.setHours(0,Me,0,0),n.callbacks.onSlotClick(ve,!1)}}
            >
              ${h.slice(0,-1).map((D,fe)=>a`<div class="fp-hour-line" style="top:${fe*(60/i)*o}px"></div>`)}
              ${P.map(({item:D,lane:fe,laneCount:De})=>{let ge=f(new Date(D.event.occurrence_start)),Me=f(new Date(D.event.occurrence_end)),ve=Math.max(Me-ge,3),st=100/De;return a`
                  <div
                    class="fp-timed-event-slot"
                    style="top:${ge}%;height:${ve}%;left:${fe*st}%;width:${st}%"
                  >
                    ${ue(n,D.event)}
                  </div>
                `})}
              ${K!==null&&(n.config.show_now_line??!0)?a`<div class="fp-now-line" style="top:${K}%"></div>`:d}
            </div>
          `})}
      </div>
    </div>
  `}function er(n){return a`<div class="fp-view fp-view-day">${Se(n,[n.currentDate])}</div>`}C();var Hr=6;function tr(n){let t=n.config.show_weekends??!0,e=n.config.show_week_numbers??!0,r=n.config.max_events_per_day??3,i=ke(n.currentDate,n.firstWeekday),o=n.currentDate.getMonth(),s=[],p=i;for(let f=0;f<Hr;f++){let y=[];for(let m=0;m<7;m++){let E=p.getDay();(t||E!==0&&E!==6)&&y.push(p),p=w(p,1)}s.push(y)}let h=s[0].map(f=>l(n.hass.language,`weekday.short.${f.getDay()}`)),_=`${e?"32px ":""}repeat(${s[0].length}, 1fr)`,x=f=>n.events.filter(y=>{let m=new Date(y.occurrence_start),E=new Date(y.occurrence_end),P=new Date(f.getFullYear(),f.getMonth(),f.getDate()),me=w(P,1);return m<me&&E>P}).sort((y,m)=>y.all_day!==m.all_day?y.all_day?-1:1:new Date(y.occurrence_start).getTime()-new Date(m.occurrence_start).getTime());return a`
    <div class="fp-view fp-view-month">
      <div class="fp-month-headerrow" style="grid-template-columns:${_}">
        ${e?a`<div class="fp-month-weeknum-header"></div>`:d}
        ${h.map(f=>a`<div class="fp-month-weekday">${f}</div>`)}
      </div>
      ${s.map(f=>a`
          <div class="fp-month-week" style="grid-template-columns:${_}">
            ${e?a`<div class="fp-month-weeknum">${l(n.hass.language,"calendar_week_short")}${Ce(f[0])}</div>`:d}
            ${f.map(y=>{let m=x(y),E=m.slice(0,r),P=m.length-E.length,me=y.getMonth()===o;return a`
                <div
                  class="fp-month-cell ${me?"":"fp-outside-month"} ${R(y,n.now)&&(n.config.highlight_today??!0)?"fp-today":""}"
                  @click=${()=>n.callbacks.onSlotClick(y,!0)}
                >
                  <div class="fp-month-cell-date">${y.getDate()}</div>
                  <div class="fp-month-cell-events">
                    ${E.map(K=>ue(n,K,{compact:!0}))}
                    ${P>0?a`<button
                          type="button"
                          class="fp-month-more"
                          @click=${K=>{K.stopPropagation(),n.callbacks.onMoreClick(y,m)}}
                        >
                          ${l(n.hass.language,"month.more",{count:P})}
                        </button>`:d}
                  </div>
                </div>
              `})}
          </div>
        `)}
    </div>
  `}C();function rr(n){let t=Q(n.currentDate,n.firstWeekday),e=n.config.show_weekends??!0,r=e?7:5,i=[];for(let o=0,s=0;s<r&&o<7;o++){let p=w(t,o),h=p.getDay();!e&&(h===0||h===6)||(i.push(p),s++)}return a`
    <div class="fp-view fp-view-week">
      ${n.config.show_week_numbers??!0?a`<div class="fp-week-number">${l(n.hass.language,"calendar_week_short")} ${Ce(t)}</div>`:d}
      ${Se(n,i)}
    </div>
  `}C();z();C();z();var j=class extends ${constructor(){super(...arguments);this.heading="";this.wide=!1;this._previouslyFocused=null;this._onKeydown=e=>{e.key==="Escape"&&this._requestClose()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown),this._previouslyFocused=document.activeElement,requestAnimationFrame(()=>this._focusFirst())}disconnectedCallback(){document.removeEventListener("keydown",this._onKeydown),this._previouslyFocused?.focus?.(),super.disconnectedCallback()}_focusFirst(){this.querySelector("[autofocus], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus()}_requestClose(){this.dispatchEvent(new CustomEvent("fp-shell-close"))}render(){return a`
      <div
        class="backdrop"
        @click=${e=>{e.target===e.currentTarget&&this._requestClose()}}
      >
        <div class="dialog ${this.wide?"wide":""}" role="dialog" aria-modal="true" aria-label=${this.heading}>
          <div class="dialog-header">
            <div class="dialog-title">${this.heading}</div>
            <button class="dialog-close" type="button" aria-label="Close" @click=${()=>this._requestClose()}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-body"><slot></slot></div>
        </div>
      </div>
    `}};j.styles=S`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 500;
      padding: 16px;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--ha-dialog-border-radius, 12px);
      width: 100%;
      max-width: 480px;
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .dialog.wide {
      max-width: 720px;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 8px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .dialog-title {
      font-size: 1.15rem;
      font-weight: 500;
    }
    .dialog-close {
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-close:focus-visible,
    .dialog-close:hover {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    }
    .dialog-body {
      padding: 12px 16px 16px;
      overflow-y: auto;
    }
    @media (max-width: 500px) {
      .backdrop {
        padding: 0;
        align-items: flex-end;
      }
      .dialog {
        max-width: 100%;
        max-height: 92vh;
        border-radius: 12px 12px 0 0;
      }
    }
  `,c([g()],j.prototype,"heading",2),c([g({type:Boolean})],j.prototype,"wide",2),j=c([T("family-planner-dialog-shell")],j);var ir=[0,5,15,30,60,1440];function nr(n,t,e){return e?new Date(`${n}T00:00:00`).getTime():new Date(`${n}T${t||"00:00"}:00`).getTime()}function or(n){let t={};if((!n.title||!n.title.trim())&&(t.title="title_required"),!n.startDate||!n.endDate)t.end="end_before_start";else{let e=nr(n.startDate,n.startTime,n.allDay),r=nr(n.endDate,n.endTime,n.allDay);n.allDay?r<e&&(t.end="end_before_start"):r<=e&&(t.end="end_before_start")}return n.requirePerson&&n.personIds.length===0&&(t.personIds="person_required"),{valid:Object.keys(t).length===0,errors:t}}var Lr=S`
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
  }
  label {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select,
  textarea {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
    min-height: 44px;
  }
  textarea {
    min-height: 72px;
    resize: vertical;
  }
  .row {
    display: flex;
    gap: 12px;
  }
  .row > .field {
    flex: 1;
  }
  .switch-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .switch-row input {
    width: 22px;
    height: 22px;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .person-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid transparent;
    background: var(--secondary-background-color, #eee);
    border-radius: 16px;
    padding: 8px 12px;
    min-height: 40px;
    font: inherit;
  }
  .person-chip .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .person-chip.selected {
    border-color: var(--fp-color, var(--primary-color));
    font-weight: 600;
  }
  .reminder-chip {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color, #fff);
    border-radius: 16px;
    padding: 6px 10px;
    min-height: 36px;
  }
  .reminder-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.78rem;
  }
  .server-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 12px;
    font-size: 0.85rem;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
  .btn {
    border-radius: 8px;
    padding: 10px 18px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
  }
`,v=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.event=null;this.prefill=null;this.serverError=null;this.requirePerson=!0;this.enableCategories=!0;this.enableStatus=!0;this._title="";this._subtitle="";this._allDay=!1;this._startDate="";this._startTime="09:00";this._endDate="";this._endTime="10:00";this._personIds=[];this._description="";this._location="";this._categoryId="";this._color="";this._icon="";this._status="";this._reminders=[];this._customReminder="";this._repeatFreq="";this._repeatUntil="";this._errors={};this._confirmingDiscard=!1;this._submitting=!1;this._dirty=!1;this._initialized=!1}willUpdate(e){!this._initialized&&(this.event||this.prefill)&&(this._initFromProps(),this._initialized=!0)}_initFromProps(){if(this.event){let e=this.event;if(this._title=e.title,this._subtitle=e.subtitle??"",this._allDay=e.all_day,e.all_day)this._startDate=e.start,this._endDate=Xe(e.end,-1);else{let r=new Date(e.start),i=new Date(e.end);this._startDate=sr(r),this._startTime=it(r),this._endDate=sr(i),this._endTime=it(i)}if(this._personIds=[...e.person_ids],this._description=e.description??"",this._location=e.location??"",this._categoryId=e.category_id??"",this._color=e.color??"",this._icon=e.icon??"",this._status=e.status??"",this._reminders=[...e.reminders],e.rrule){let r=/FREQ=([A-Z]+)/.exec(e.rrule);this._repeatFreq=r?r[1]:"";let i=/UNTIL=(\d{8})/.exec(e.rrule);if(i){let o=i[1];this._repeatUntil=`${o.slice(0,4)}-${o.slice(4,6)}-${o.slice(6,8)}`}}}else if(this.prefill){this._allDay=this.prefill.allDay,this._startDate=this.prefill.date,this._endDate=this.prefill.date,this._startTime=this.prefill.time;let[e,r]=this.prefill.time.split(":").map(Number),i=new Date(2e3,0,1,e,r);i.setMinutes(i.getMinutes()+60),this._endTime=it(i),this._personIds=[]}}_markDirty(){this._dirty=!0}_togglePerson(e){this._personIds=this._personIds.includes(e)?this._personIds.filter(r=>r!==e):[...this._personIds,e],this._markDirty()}_toggleReminder(e){this._reminders=this._reminders.includes(e)?this._reminders.filter(r=>r!==e):[...this._reminders,e].sort((r,i)=>r-i),this._markDirty()}_addCustomReminder(){let e=parseInt(this._customReminder,10);!Number.isNaN(e)&&e>=0&&!this._reminders.includes(e)&&(this._reminders=[...this._reminders,e].sort((r,i)=>r-i),this._customReminder="",this._markDirty())}_buildRrule(){if(!this._repeatFreq)return null;let e=`FREQ=${this._repeatFreq}`;return this._repeatUntil&&(e+=`;UNTIL=${this._repeatUntil.replace(/-/g,"")}T000000Z`),e}_validate(){let e=or({title:this._title,allDay:this._allDay,startDate:this._startDate,startTime:this._startTime,endDate:this._endDate,endTime:this._endTime,personIds:this._personIds,requirePerson:this.requirePerson});return this._errors=e.errors,e}_handleSave(){if(!this._validate().valid)return;let r=this._allDay?this._startDate:Qe(this._startDate,this._startTime),i=this._allDay?Xe(this._endDate,1):Qe(this._endDate,this._endTime),o={title:this._title.trim(),subtitle:this._subtitle.trim()||null,start:r,end:i,all_day:this._allDay,person_ids:this._personIds,description:this._description.trim()||null,location:this._location.trim()||null,category_id:this._categoryId||null,color:this._color.trim()||null,icon:this._icon.trim()||null,status:this._status||null,reminders:this._reminders,rrule:this._buildRrule()};this._submitting=!0,this.dispatchEvent(new CustomEvent("fp-save",{detail:o}))}updated(e){e.has("serverError")&&this.serverError&&(this._submitting=!1)}_requestClose(){if(this._dirty&&!this._confirmingDiscard){this._confirmingDiscard=!0;return}this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=this.event?l(e,"event.edit_title"):l(e,"event.new_title");return a`
      <family-planner-dialog-shell .heading=${r} wide @fp-shell-close=${()=>this._requestClose()}>
        ${this.serverError?a`<div class="server-error">${this.serverError}</div>`:d}
        ${this._confirmingDiscard?a`
              <div class="confirm-box">
                <p>${l(e,"dialog.unsaved_changes_message")}</p>
                <div class="actions">
                  <button class="btn" type="button" @click=${()=>this._confirmingDiscard=!1}>
                    ${l(e,"dialog.keep_editing")}
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click=${()=>this.dispatchEvent(new CustomEvent("fp-close"))}
                  >
                    ${l(e,"dialog.discard")}
                  </button>
                </div>
              </div>
            `:this._renderForm(e)}
      </family-planner-dialog-shell>
    `}_renderForm(e){return a`
      <div class="field">
        <label for="fp-title">${l(e,"event.title")} *</label>
        <input
          id="fp-title"
          type="text"
          autofocus
          .value=${this._title}
          @input=${r=>{this._title=r.target.value,this._markDirty()}}
        />
        ${this._errors.title?a`<span class="error-text">${l(e,"validation.title_required")}</span>`:d}
      </div>

      <div class="field">
        <label for="fp-subtitle">${l(e,"event.subtitle")}</label>
        <input
          id="fp-subtitle"
          type="text"
          .value=${this._subtitle}
          @input=${r=>{this._subtitle=r.target.value,this._markDirty()}}
        />
      </div>

      <div class="switch-row">
        <input
          id="fp-allday"
          type="checkbox"
          .checked=${this._allDay}
          @change=${r=>{this._allDay=r.target.checked,this._markDirty()}}
        />
        <label for="fp-allday">${l(e,"event.all_day")}</label>
      </div>

      <div class="row">
        <div class="field">
          <label for="fp-start-date">${l(e,"event.start_date")}</label>
          <input
            id="fp-start-date"
            type="date"
            .value=${this._startDate}
            @input=${r=>{this._startDate=r.target.value,this._markDirty()}}
          />
        </div>
        ${this._allDay?d:a`
              <div class="field">
                <label for="fp-start-time">${l(e,"event.start_time")}</label>
                <input
                  id="fp-start-time"
                  type="time"
                  .value=${this._startTime}
                  @input=${r=>{this._startTime=r.target.value,this._markDirty()}}
                />
              </div>
            `}
      </div>
      <div class="row">
        <div class="field">
          <label for="fp-end-date">${l(e,"event.end_date")}</label>
          <input
            id="fp-end-date"
            type="date"
            .value=${this._endDate}
            @input=${r=>{this._endDate=r.target.value,this._markDirty()}}
          />
        </div>
        ${this._allDay?d:a`
              <div class="field">
                <label for="fp-end-time">${l(e,"event.end_time")}</label>
                <input
                  id="fp-end-time"
                  type="time"
                  .value=${this._endTime}
                  @input=${r=>{this._endTime=r.target.value,this._markDirty()}}
                />
              </div>
            `}
      </div>
      ${this._errors.end?a`<span class="error-text">${l(e,"validation.end_before_start")}</span>`:d}

      <div class="field">
        <label>${l(e,"event.people")}${this.requirePerson?" *":""}</label>
        <div class="chip-row">
          ${this.people.filter(r=>r.active).map(r=>a`
                <button
                  type="button"
                  class="person-chip ${this._personIds.includes(r.id)?"selected":""}"
                  style="--fp-color:${r.color}"
                  @click=${()=>this._togglePerson(r.id)}
                >
                  <span class="dot" style="background:${r.color}"></span>${r.name}
                </button>
              `)}
        </div>
        ${this._errors.personIds?a`<span class="error-text">${l(e,"validation.person_required")}</span>`:d}
      </div>

      <div class="field">
        <label for="fp-description">${l(e,"event.description")}</label>
        <textarea
          id="fp-description"
          .value=${this._description}
          @input=${r=>{this._description=r.target.value,this._markDirty()}}
        ></textarea>
      </div>

      <div class="field">
        <label for="fp-location">${l(e,"event.location")}</label>
        <input
          id="fp-location"
          type="text"
          .value=${this._location}
          @input=${r=>{this._location=r.target.value,this._markDirty()}}
        />
      </div>

      ${this.enableCategories?a`
            <div class="field">
              <label for="fp-category">${l(e,"event.category")}</label>
              <select
                id="fp-category"
                .value=${this._categoryId}
                @change=${r=>{this._categoryId=r.target.value,this._markDirty()}}
              >
                <option value="">${l(e,"category.none")}</option>
                ${this.categories.filter(r=>r.active).map(r=>a`<option value=${r.id} ?selected=${r.id===this._categoryId}>${r.name}</option>`)}
              </select>
            </div>
          `:d}

      <div class="row">
        <div class="field">
          <label for="fp-color">${l(e,"event.color")}</label>
          <input
            id="fp-color"
            type="text"
            placeholder="#3f51b5"
            .value=${this._color}
            @input=${r=>{this._color=r.target.value,this._markDirty()}}
          />
        </div>
        <div class="field">
          <label for="fp-icon">${l(e,"event.icon")}</label>
          <input
            id="fp-icon"
            type="text"
            placeholder="mdi:tooth"
            .value=${this._icon}
            @input=${r=>{this._icon=r.target.value,this._markDirty()}}
          />
        </div>
      </div>

      ${this.enableStatus?a`
            <div class="field">
              <label for="fp-status">${l(e,"event.status")}</label>
              <select
                id="fp-status"
                .value=${this._status}
                @change=${r=>{this._status=r.target.value,this._markDirty()}}
              >
                <option value="">-</option>
                ${["planned","confirmed","tentative","done","cancelled"].map(r=>a`<option value=${r} ?selected=${r===this._status}>${l(e,`status.${r}`)}</option>`)}
              </select>
            </div>
          `:d}

      <div class="field">
        <label>${l(e,"event.reminders")}</label>
        <div class="chip-row">
          ${ir.map(r=>a`
              <button
                type="button"
                class="reminder-chip ${this._reminders.includes(r)?"selected":""}"
                @click=${()=>this._toggleReminder(r)}
              >
                ${r===0?l(e,"reminder.at_start"):l(e,`reminder.${r}`)||`${r} min`}
              </button>
            `)}
        </div>
        <div class="row" style="margin-top:6px">
          <input
            type="number"
            min="0"
            placeholder=${l(e,"reminder.custom")}
            .value=${this._customReminder}
            @input=${r=>this._customReminder=r.target.value}
          />
          <button class="btn" type="button" @click=${()=>this._addCustomReminder()}>+</button>
        </div>
      </div>

      <div class="field">
        <label for="fp-repeat">${l(e,"event.repeat")}</label>
        <select
          id="fp-repeat"
          .value=${this._repeatFreq}
          @change=${r=>{this._repeatFreq=r.target.value,this._markDirty()}}
        >
          <option value="">${l(e,"event.repeat_none")}</option>
          <option value="DAILY" ?selected=${this._repeatFreq==="DAILY"}>Täglich / Daily</option>
          <option value="WEEKLY" ?selected=${this._repeatFreq==="WEEKLY"}>Wöchentlich / Weekly</option>
          <option value="MONTHLY" ?selected=${this._repeatFreq==="MONTHLY"}>Monatlich / Monthly</option>
          <option value="YEARLY" ?selected=${this._repeatFreq==="YEARLY"}>Jährlich / Yearly</option>
        </select>
        ${this._repeatFreq?a`
              <input
                type="date"
                .value=${this._repeatUntil}
                @input=${r=>this._repeatUntil=r.target.value}
              />
            `:d}
      </div>

      <div class="actions">
        <button class="btn" type="button" @click=${()=>this._requestClose()}>${l(e,"action.cancel")}</button>
        <button class="btn btn-primary" type="button" ?disabled=${this._submitting} @click=${()=>this._handleSave()}>
          ${l(e,"action.save")}
        </button>
      </div>
    `}};v.styles=Lr,c([g({attribute:!1})],v.prototype,"hass",2),c([g({attribute:!1})],v.prototype,"config",2),c([g({attribute:!1})],v.prototype,"people",2),c([g({attribute:!1})],v.prototype,"categories",2),c([g({attribute:!1})],v.prototype,"event",2),c([g({attribute:!1})],v.prototype,"prefill",2),c([g({attribute:!1})],v.prototype,"serverError",2),c([g({type:Boolean})],v.prototype,"requirePerson",2),c([g({type:Boolean})],v.prototype,"enableCategories",2),c([g({type:Boolean})],v.prototype,"enableStatus",2),c([u()],v.prototype,"_title",2),c([u()],v.prototype,"_subtitle",2),c([u()],v.prototype,"_allDay",2),c([u()],v.prototype,"_startDate",2),c([u()],v.prototype,"_startTime",2),c([u()],v.prototype,"_endDate",2),c([u()],v.prototype,"_endTime",2),c([u()],v.prototype,"_personIds",2),c([u()],v.prototype,"_description",2),c([u()],v.prototype,"_location",2),c([u()],v.prototype,"_categoryId",2),c([u()],v.prototype,"_color",2),c([u()],v.prototype,"_icon",2),c([u()],v.prototype,"_status",2),c([u()],v.prototype,"_reminders",2),c([u()],v.prototype,"_customReminder",2),c([u()],v.prototype,"_repeatFreq",2),c([u()],v.prototype,"_repeatUntil",2),c([u()],v.prototype,"_errors",2),c([u()],v.prototype,"_confirmingDiscard",2),c([u()],v.prototype,"_submitting",2),v=c([T("family-planner-event-dialog")],v);function sr(n){let t=e=>String(e).padStart(2,"0");return`${n.getFullYear()}-${t(n.getMonth()+1)}-${t(n.getDate())}`}function it(n){let t=e=>String(e).padStart(2,"0");return`${t(n.getHours())}:${t(n.getMinutes())}`}C();z();var Or=S`
  .meta-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
  }
  .meta-row ha-icon {
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .color-bar {
    width: 6px;
    border-radius: 3px;
    align-self: stretch;
    min-height: 24px;
  }
  .subtitle {
    color: var(--secondary-text-color);
  }
  .person-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .person-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 14px;
    padding: 4px 10px;
    background: var(--secondary-background-color, #eee);
  }
  .person-pill .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .status-badge {
    display: inline-block;
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    padding: 10px 16px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-danger {
    color: var(--error-color, #db4437);
    border-color: var(--error-color, #db4437);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`,H=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.canWrite=!0;this._confirmingDelete=!1}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=this.event,i=W(r,this.people,this.categories,"person"),o=r.person_ids.map(h=>this.people.find(_=>_.id===h)).filter(Boolean),s=r.category_id?this.categories.find(h=>h.id===r.category_id):void 0,p=!!r.rrule||!!r.is_recurring_instance;return a`
      <family-planner-dialog-shell .heading=${r.title} @fp-shell-close=${()=>this._close()}>
        <div class="meta-row">
          <span class="color-bar" style="background:${i}"></span>
          <div>
            ${r.subtitle?a`<div class="subtitle">${r.subtitle}</div>`:d}
            <div>
              ${r.all_day?l(e,"event.all_day"):`${ce(new Date(r.occurrence_start),!0)} \u2013 ${ce(new Date(r.occurrence_end),!0)}`}
            </div>
            ${r.status?a`<span class="status-badge">${l(e,`status.${r.status}`)}</span>`:d}
          </div>
        </div>

        ${o.length>0?a`
              <div class="meta-row">
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                <div class="person-list">
                  ${o.map(h=>a`<span class="person-pill"><span class="dot" style="background:${h.color}"></span>${h.name}</span>`)}
                </div>
              </div>
            `:d}

        ${r.location?a`<div class="meta-row"><ha-icon icon="mdi:map-marker"></ha-icon><div>${r.location}</div></div>`:d}
        ${s?a`<div class="meta-row"><ha-icon icon=${s.icon||"mdi:tag"}></ha-icon><div>${s.name}</div></div>`:d}
        ${r.description?a`<div class="meta-row"><ha-icon icon="mdi:text"></ha-icon><div>${r.description}</div></div>`:d}

        ${this._confirmingDelete?this._renderDeleteConfirm(e,p):this._renderActions(e)}
      </family-planner-dialog-shell>
    `}_renderActions(e){return this.canWrite?a`
      <div class="actions">
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-edit",{detail:this.event}))}>
          <ha-icon icon="mdi:pencil"></ha-icon>${l(e,"action.edit")}
        </button>
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-duplicate"))}>
          <ha-icon icon="mdi:content-copy"></ha-icon>${l(e,"action.duplicate")}
        </button>
        ${this.event.status!=="done"?a`
              <button
                class="btn"
                type="button"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-set-status",{detail:"done"}))}
              >
                <ha-icon icon="mdi:check"></ha-icon>${l(e,"action.mark_done")}
              </button>
            `:d}
        <button class="btn btn-danger" type="button" @click=${()=>this._confirmingDelete=!0}>
          <ha-icon icon="mdi:delete"></ha-icon>${l(e,"action.delete")}
        </button>
      </div>
    `:a``}_renderDeleteConfirm(e,r){return a`
      <div class="confirm-box">
        <div>${l(e,"dialog.confirm_delete_title")}</div>
        <div class="actions">
          ${r?a`
                <button
                  class="btn btn-danger"
                  type="button"
                  @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"instance",occurrenceStart:this.event.occurrence_start}}))}
                >
                  ${l(e,"dialog.confirm_delete_instance")}
                </button>
              `:d}
          <button
            class="btn btn-danger"
            type="button"
            @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"series"}}))}
          >
            ${r?l(e,"dialog.confirm_delete_series"):l(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._confirmingDelete=!1}>
            ${l(e,"action.cancel")}
          </button>
        </div>
      </div>
    `}};H.styles=Or,c([g({attribute:!1})],H.prototype,"hass",2),c([g({attribute:!1})],H.prototype,"people",2),c([g({attribute:!1})],H.prototype,"categories",2),c([g({attribute:!1})],H.prototype,"event",2),c([g({type:Boolean})],H.prototype,"canWrite",2),c([u()],H.prototype,"_confirmingDelete",2),H=c([T("family-planner-event-detail-dialog")],H);C();z();var Nr=S`
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 6px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    text-align: left;
    min-height: 44px;
  }
  .bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .time {
    min-width: 48px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .title {
    flex: 1;
  }
  .add-btn {
    margin-top: 8px;
    width: 100%;
    border: 1px dashed var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px;
    background: transparent;
    color: var(--primary-text-color);
    min-height: 44px;
  }
`,L=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.events=[];this.canWrite=!0}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=new Intl.DateTimeFormat(e||"de",{weekday:"long",day:"numeric",month:"long"}).format(this.date);return a`
      <family-planner-dialog-shell .heading=${r} @fp-shell-close=${()=>this._close()}>
        ${this.events.map(i=>{let o=W(i,this.people,this.categories,"person"),s=de(i,this.people);return a`
            <button
              type="button"
              class="item"
              @click=${()=>this.dispatchEvent(new CustomEvent("fp-event-click",{detail:i}))}
            >
              <span class="bar" style="background:${o}"></span>
              <span class="time">${i.all_day?l(e,"event.all_day"):he(i,!0)}</span>
              <span class="title">${i.title}</span>
              ${pe(s,4,e)}
            </button>
          `})}
        ${this.canWrite?a`
              <button
                type="button"
                class="add-btn"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-add-event",{detail:{date:this.date}}))}
              >
                + ${l(e,"action.add_event")}
              </button>
            `:d}
      </family-planner-dialog-shell>
    `}};L.styles=Nr,c([g({attribute:!1})],L.prototype,"hass",2),c([g({attribute:!1})],L.prototype,"people",2),c([g({attribute:!1})],L.prototype,"categories",2),c([g({attribute:!1})],L.prototype,"date",2),c([g({attribute:!1})],L.prototype,"events",2),c([g({type:Boolean})],L.prototype,"canWrite",2),L=c([T("family-planner-day-detail-dialog")],L);C();z();var zr=S`
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .name {
    flex: 1;
  }
  .name.inactive {
    opacity: 0.5;
  }
  .iconbtn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .iconbtn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  }
  input[type="text"],
  input[type="color"],
  select {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 8px 10px;
    min-height: 40px;
    font: inherit;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn {
    border-radius: 8px;
    padding: 8px 14px;
    min-height: 40px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`,nt={id:null,name:"",color:"#3f51b5",role:""},I=class extends ${constructor(){super(...arguments);this.people=[];this._draft={...nt};this._deletingId=null;this._deleteStrategy="deactivate";this._reassignTo="";this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{this._draft.id?await Ke(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}):await Ut(this.hass,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}),this._draft={...nt},this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await Ke(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-people-changed"))}async _move(e,r){let i=[...this.people].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),o=i.indexOf(e.id),s=o+r;s<0||s>=i.length||([i[o],i[s]]=[i[s],i[o]],await qt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-people-changed")))}async _confirmDelete(){if(this._deletingId)try{await Wt(this.hass,this._deletingId,this._deleteStrategy,this._reassignTo||void 0),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,r=[...this.people].sort((i,o)=>i.sort_order-o.sort_order);return a`
      <family-planner-dialog-shell .heading=${l(e,"people.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?a`<div class="confirm-box">${this._error}</div>`:d}
        ${r.map((i,o)=>a`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${o===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${o===r.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"people.active")} @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${l(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color,role:i.role??""}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?this._renderDeleteConfirm(e,i):d}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${l(e,"people.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          <select
            .value=${this._draft.role}
            @change=${i=>this._draft={...this._draft,role:i.target.value}}
          >
            <option value="">-</option>
            <option value="parent" ?selected=${this._draft.role==="parent"}>${l(e,"people.role.parent")}</option>
            <option value="child" ?selected=${this._draft.role==="child"}>${l(e,"people.role.child")}</option>
            <option value="other" ?selected=${this._draft.role==="other"}>${l(e,"people.role.other")}</option>
          </select>
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?l(e,"action.save"):l(e,"people.add")}
          </button>
          ${this._draft.id?a`<button class="btn" type="button" @click=${()=>this._draft={...nt}}>
                ${l(e,"action.cancel")}
              </button>`:d}
        </div>
      </family-planner-dialog-shell>
    `}_renderDeleteConfirm(e,r){let i=this.people.filter(o=>o.id!==r.id);return a`
      <div class="confirm-box">
        <div>${l(e,"people.delete_title")} (${r.name})</div>
        <select
          .value=${this._deleteStrategy}
          @change=${o=>this._deleteStrategy=o.target.value}
        >
          <option value="deactivate">${l(e,"people.delete_strategy.deactivate")}</option>
          <option value="remove_from_events">${l(e,"people.delete_strategy.remove_from_events")}</option>
          <option value="reassign">${l(e,"people.delete_strategy.reassign")}</option>
          <option value="keep_unassigned">${l(e,"people.delete_strategy.keep_unassigned")}</option>
        </select>
        ${this._deleteStrategy==="reassign"?a`
              <select .value=${this._reassignTo} @change=${o=>this._reassignTo=o.target.value}>
                <option value="">${l(e,"people.reassign_to")}</option>
                ${i.map(o=>a`<option value=${o.id}>${o.name}</option>`)}
              </select>
            `:d}
        <div class="form">
          <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
            ${l(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._deletingId=null}>${l(e,"action.cancel")}</button>
        </div>
      </div>
    `}};I.styles=zr,c([g({attribute:!1})],I.prototype,"hass",2),c([g({attribute:!1})],I.prototype,"people",2),c([u()],I.prototype,"_draft",2),c([u()],I.prototype,"_deletingId",2),c([u()],I.prototype,"_deleteStrategy",2),c([u()],I.prototype,"_reassignTo",2),c([u()],I.prototype,"_error",2),I=c([T("family-planner-people-manager-dialog")],I);C();z();var Ur=S`
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .name {
    flex: 1;
  }
  .name.inactive {
    opacity: 0.5;
  }
  .iconbtn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .iconbtn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  }
  input[type="text"],
  input[type="color"] {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 8px 10px;
    min-height: 40px;
    font: inherit;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn {
    border-radius: 8px;
    padding: 8px 14px;
    min-height: 40px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
    display: flex;
    gap: 8px;
    align-items: center;
  }
`,ot={id:null,name:"",color:"#9e9e9e"},O=class extends ${constructor(){super(...arguments);this.categories=[];this._draft={...ot};this._deletingId=null;this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{this._draft.id?await Je(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color}):await Vt(this.hass,{name:this._draft.name.trim(),color:this._draft.color}),this._draft={...ot},this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await Je(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-categories-changed"))}async _move(e,r){let i=[...this.categories].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),o=i.indexOf(e.id),s=o+r;s<0||s>=i.length||([i[o],i[s]]=[i[s],i[o]],await Bt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-categories-changed")))}async _confirmDelete(){if(this._deletingId)try{await Ft(this.hass,this._deletingId),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,r=[...this.categories].sort((i,o)=>i.sort_order-o.sort_order);return a`
      <family-planner-dialog-shell .heading=${l(e,"category.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?a`<div class="confirm-box">${this._error}</div>`:d}
        ${r.map((i,o)=>a`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${o===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${o===r.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${l(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?a`
                  <div class="confirm-box">
                    <span>${l(e,"action.delete")}: ${i.name}?</span>
                    <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
                      ${l(e,"action.delete")}
                    </button>
                    <button class="btn" type="button" @click=${()=>this._deletingId=null}>
                      ${l(e,"action.cancel")}
                    </button>
                  </div>
                `:d}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${l(e,"category.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?l(e,"action.save"):l(e,"category.add")}
          </button>
          ${this._draft.id?a`<button class="btn" type="button" @click=${()=>this._draft={...ot}}>
                ${l(e,"action.cancel")}
              </button>`:d}
        </div>
      </family-planner-dialog-shell>
    `}};O.styles=Ur,c([g({attribute:!1})],O.prototype,"hass",2),c([g({attribute:!1})],O.prototype,"categories",2),c([u()],O.prototype,"_draft",2),c([u()],O.prototype,"_deletingId",2),c([u()],O.prototype,"_error",2),O=c([T("family-planner-category-manager-dialog")],O);var Vr=["today","day","week","month","agenda"],Fr=["family_planner_event_created","family_planner_event_updated","family_planner_event_deleted"],b=class extends ${constructor(){super(...arguments);this._view="week";this._currentDate=new Date;this._events=[];this._people=[];this._categories=[];this._loading=!0;this._error=null;this._connectionLost=!1;this._search="";this._selectedPersonIds=[];this._selectedCategoryIds=[];this._canWriteEvents=!0;this._isAdmin=!1;this._requirePerson=!0;this._enableCategories=!0;this._enableStatus=!0;this._createDraft=null;this._editingEvent=null;this._dialogError=null;this._detailEvent=null;this._dayDetail=null;this._peopleManagerOpen=!1;this._categoryManagerOpen=!1;this._bootstrapped=!1;this._unsubBus=[];this._fetchToken=0;this._debouncedSetSearch=et(e=>{this._search=e},200)}get hass(){return this._hass}set hass(e){this._hass=e,this._bootstrapped||(this._bootstrapped=!0,this._bootstrap())}setConfig(e){if(!e)throw new Error("Ung\xFCltige Konfiguration");let r={...Ae,...e,type:e.type},i=!this._config;this._config=r,i&&(this._view=r.default_view??"week",this._selectedPersonIds=r.preselected_people??[])}getCardSize(){return this._config?.compact?6:9}getGridOptions(){return{rows:this._config?.compact?6:9,columns:12,min_rows:4}}static getStubConfig(){return{type:"custom:family-planner-card",title:"Familienkalender",default_view:"week"}}static async getConfigElement(){return await Promise.resolve().then(()=>(lr(),ar)),document.createElement("family-planner-card-editor")}disconnectedCallback(){super.disconnectedCallback();for(let e of this._unsubBus)e();this._unsubBus=[]}async _bootstrap(){if(this._hass){try{let[e,r,i]=await Promise.all([Ht(this._hass),Ye(this._hass),Ge(this._hass)]);this._isAdmin=e.is_admin,this._canWriteEvents=e.can_write_events,this._requirePerson=!!(e.options.require_person??!0),this._enableCategories=!!(e.options.enable_categories??!0),this._enableStatus=!!(e.options.enable_status??!0),this._people=r,this._categories=i,this._error=null}catch(e){this._error=e instanceof Error?e.message:String(e)}await this._fetchEvents(),this._subscribeRealtime()}}_subscribeRealtime(){if(!this._hass)return;let e=et(()=>void this._fetchEvents(),250);for(let o of Fr)this._hass.connection.subscribeEvents(()=>e(),o).then(s=>this._unsubBus.push(s)).catch(()=>{});let r=()=>{this._connectionLost=!1,this._fetchEvents()},i=()=>{this._connectionLost=!0};this._hass.connection.addEventListener("ready",r),this._hass.connection.addEventListener("disconnected",i),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("ready",r)),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("disconnected",i))}_computeRange(){let e=Te(this._hass,this._config.first_weekday);if(this._view==="today"){let i=new Date;return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="day"){let i=new Date(this._currentDate);return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="week"){let i=Q(this._currentDate,e);return{start:i,end:w(i,7)}}if(this._view==="month"){let i=ke(this._currentDate,e);return{start:i,end:w(i,42)}}let r=new Date(this._currentDate);return r.setHours(0,0,0,0),{start:r,end:w(r,this._config.agenda_days??14)}}async _fetchEvents(){if(!this._hass)return;let e=++this._fetchToken;this._loading=!0;let{start:r,end:i}=this._computeRange();try{let o=await Lt(this._hass,{start:r.toISOString(),end:i.toISOString(),include_cancelled:!0});if(e!==this._fetchToken)return;this._events=o,this._error=null}catch(o){if(e!==this._fetchToken)return;this._error=o instanceof Error?o.message:String(o)}finally{e===this._fetchToken&&(this._loading=!1)}}get _filteredEvents(){return Kt(this._events,{showDoneEvents:this._config.show_done_events??!0,showCancelledEvents:this._config.show_cancelled_events??!1,personIds:this._selectedPersonIds,categoryIds:this._selectedCategoryIds,search:this._search})}get _visiblePeople(){let e=this._config.people,r=this._people.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}get _visibleCategories(){let e=this._config.visible_categories,r=this._categories.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}_setView(e){e!==this._view&&(this._view=e,this._fetchEvents())}_navStep(e){let r=new Date(this._currentDate);switch(this._view){case"day":r=w(r,e);break;case"week":r=w(r,7*e);break;case"month":r=new Date(r.getFullYear(),r.getMonth()+e,1);break;case"agenda":r=w(r,(this._config.agenda_days??14)*e);break;default:return}this._currentDate=r,this._fetchEvents()}_navToday(){this._currentDate=new Date,this._fetchEvents()}_onSearchInput(e){let r=e.target.value;this._debouncedSetSearch(r)}_togglePerson(e){this._selectedPersonIds=this._selectedPersonIds.includes(e)?this._selectedPersonIds.filter(r=>r!==e):[...this._selectedPersonIds,e]}_toggleCategory(e){this._selectedCategoryIds=this._selectedCategoryIds.includes(e)?this._selectedCategoryIds.filter(r=>r!==e):[...this._selectedCategoryIds,e]}_openCreate(e,r){if(this._config.read_only||!this._canWriteEvents)return;let i=o=>String(o).padStart(2,"0");this._createDraft={date:`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())}`,time:`${i(e.getHours())}:${i(e.getMinutes())}`,allDay:r},this._editingEvent=null,this._dialogError=null}_openEdit(e){this._editingEvent=e,this._createDraft=null,this._dialogError=null,this._detailEvent=null}async _handleDialogSave(e){if(this._hass){this._dialogError=null;try{this._editingEvent?await je(this._hass,{...e.detail,event_id:this._editingEvent.id,expected_version:this._editingEvent.version}):await Ot(this._hass,e.detail),this._editingEvent=null,this._createDraft=null,await this._fetchEvents()}catch(r){this._dialogError=r instanceof le?l(this._hass.language,`error.${r.code}`):r instanceof Error?r.message:String(r)}}}_closeEventDialog(){this._editingEvent=null,this._createDraft=null,this._dialogError=null}async _handleDelete(e,r,i){if(this._hass)try{await Nt(this._hass,e,r,i),this._detailEvent=null,await this._fetchEvents()}catch(o){this._error=o instanceof Error?o.message:String(o)}}async _handleDuplicate(e){if(this._hass)try{await zt(this._hass,e),this._detailEvent=null,await this._fetchEvents()}catch(r){this._error=r instanceof Error?r.message:String(r)}}async _handleSetStatus(e,r){if(this._hass)try{await je(this._hass,{event_id:e,status:r}),this._detailEvent=null,await this._fetchEvents()}catch(i){this._error=i instanceof Error?i.message:String(i)}}async _refreshPeople(){this._hass&&(this._people=await Ye(this._hass))}async _refreshCategories(){this._hass&&(this._categories=await Ge(this._hass))}_rangeLabel(){let e=this._hass;if(!e)return"";let r=e.language||"de";if(this._view==="today")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(new Date);if(this._view==="day")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(this._currentDate);if(this._view==="week"){let o=Q(this._currentDate,Te(e,this._config.first_weekday)),s=w(o,6),p=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${p.format(o)} \u2013 ${p.format(s)}`}if(this._view==="month")return new Intl.DateTimeFormat(r,{month:"long",year:"numeric"}).format(this._currentDate);let i=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${i.format(this._currentDate)} \u2013 ${i.format(w(this._currentDate,(this._config.agenda_days??14)-1))}`}_buildViewContext(){let e={onEventClick:r=>{this._detailEvent=r},onSlotClick:(r,i)=>this._openCreate(r,i),onMoreClick:(r,i)=>{this._dayDetail={date:r,events:i}}};return{hass:this._hass,config:this._config,events:this._filteredEvents,people:this._people,categories:this._categories,currentDate:this._view==="today"?new Date:this._currentDate,now:new Date,firstWeekday:Te(this._hass,this._config.first_weekday),use24h:Yt(this._hass,this._config.time_format),callbacks:e}}_renderView(){let e=this._buildViewContext();switch(this._view){case"today":case"day":return er(e);case"week":return rr(e);case"month":return tr(e);default:return Zt(e)}}_renderFilterBar(){if(!this._config.show_filters)return d;let e=this._hass?.language;return a`
      <div class="fp-filterbar">
        <button
          type="button"
          class="fp-person-chip fp-person-chip-all ${this._selectedPersonIds.length===0?"active":""}"
          @click=${()=>this._selectedPersonIds=[]}
        >
          ${l(e,"filter.all_people")}
        </button>
        ${this._visiblePeople.map(r=>a`
            <button
              type="button"
              class="fp-person-chip ${this._selectedPersonIds.includes(r.id)?"active":""}"
              style="--fp-chip-color:${r.color}"
              @click=${()=>this._togglePerson(r.id)}
            >
              <span class="fp-person-chip-dot" style="background:${r.color}"></span>${r.name}
            </button>
          `)}
        ${this._visibleCategories.map(r=>a`
            <button
              type="button"
              class="fp-category-chip ${this._selectedCategoryIds.includes(r.id)?"active":""}"
              style="--fp-chip-color:${r.color}"
              @click=${()=>this._toggleCategory(r.id)}
            >
              ${r.icon?a`<ha-icon icon=${r.icon}></ha-icon>`:d}${r.name}
            </button>
          `)}
      </div>
    `}render(){if(!this._hass||!this._config)return a`<ha-card><div class="fp-loading">…</div></ha-card>`;let e=this._hass.language;return a`
      <ha-card>
        ${this._connectionLost?a`<div class="fp-banner fp-banner-error">${l(e,"error.connection_lost")}</div>`:d}
        ${this._error?a`<div class="fp-banner fp-banner-error">
              ${this._error}
              <button type="button" @click=${()=>void this._fetchEvents()}>${l(e,"error.reload")}</button>
            </div>`:d}
        <div class="fp-header">
          <div class="fp-header-top">
            <div class="fp-title">${this._config.title??"Familienkalender"}</div>
            <div class="fp-header-actions">
              ${this._isAdmin?a`
                    <ha-icon-button
                      title=${l(e,"action.manage_people")}
                      @click=${()=>this._peopleManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:account-multiple"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      title=${l(e,"action.manage_categories")}
                      @click=${()=>this._categoryManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:tag-multiple"></ha-icon>
                    </ha-icon-button>
                  `:d}
              ${(this._config.show_add_button??!0)&&!this._config.read_only&&this._canWriteEvents?a`
                    <button
                      type="button"
                      class="fp-fab"
                      title=${l(e,"action.add_event")}
                      aria-label=${l(e,"action.add_event")}
                      @click=${()=>this._openCreate(new Date,!1)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </button>
                  `:d}
            </div>
          </div>
          <div class="fp-header-nav">
            <div class="fp-view-switch" role="tablist">
              ${Vr.map(r=>a`
                  <button
                    role="tab"
                    aria-selected=${this._view===r}
                    class=${this._view===r?"active":""}
                    @click=${()=>this._setView(r)}
                  >
                    ${l(e,`view.${r}`)}
                  </button>
                `)}
            </div>
            ${this._view!=="today"?a`
                  <div class="fp-nav-arrows">
                    <ha-icon-button title=${l(e,"nav.prev")} @click=${()=>this._navStep(-1)}>
                      <ha-icon icon="mdi:chevron-left"></ha-icon>
                    </ha-icon-button>
                    <button type="button" class="fp-nav-today" @click=${()=>this._navToday()}>
                      ${l(e,"nav.today")}
                    </button>
                    <ha-icon-button title=${l(e,"nav.next")} @click=${()=>this._navStep(1)}>
                      <ha-icon icon="mdi:chevron-right"></ha-icon>
                    </ha-icon-button>
                  </div>
                `:d}
            <div class="fp-range-label">${this._rangeLabel()}</div>
          </div>
          ${this._config.show_search?a`
                <input
                  class="fp-search"
                  type="search"
                  placeholder=${l(e,"filter.search_placeholder")}
                  @input=${r=>this._onSearchInput(r)}
                />
              `:d}
          ${this._renderFilterBar()}
        </div>
        <div class="fp-body ${this._config.compact?"fp-compact":""}">
          ${this._loading?a`<div class="fp-loading">…</div>`:this._renderView()}
        </div>
      </ha-card>

      ${this._createDraft||this._editingEvent?a`
            <family-planner-event-dialog
              .hass=${this._hass}
              .config=${this._config}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._editingEvent}
              .prefill=${this._createDraft}
              .serverError=${this._dialogError}
              .requirePerson=${this._requirePerson}
              .enableCategories=${this._enableCategories}
              .enableStatus=${this._enableStatus}
              @fp-save=${r=>void this._handleDialogSave(r)}
              @fp-close=${()=>this._closeEventDialog()}
            ></family-planner-event-dialog>
          `:d}
      ${this._detailEvent?a`
            <family-planner-event-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._detailEvent}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-edit=${r=>this._openEdit(r.detail)}
              @fp-delete=${r=>void this._handleDelete(this._detailEvent.id,r.detail.mode,r.detail.occurrenceStart)}
              @fp-duplicate=${()=>void this._handleDuplicate(this._detailEvent.id)}
              @fp-set-status=${r=>void this._handleSetStatus(this._detailEvent.id,r.detail)}
              @fp-close=${()=>this._detailEvent=null}
            ></family-planner-event-detail-dialog>
          `:d}
      ${this._dayDetail?a`
            <family-planner-day-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .date=${this._dayDetail.date}
              .events=${this._dayDetail.events}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-event-click=${r=>{this._dayDetail=null,this._detailEvent=r.detail}}
              @fp-add-event=${r=>{this._dayDetail=null,this._openCreate(r.detail.date,!0)}}
              @fp-close=${()=>this._dayDetail=null}
            ></family-planner-day-detail-dialog>
          `:d}
      ${this._peopleManagerOpen?a`
            <family-planner-people-manager-dialog
              .hass=${this._hass}
              .people=${this._people}
              @fp-people-changed=${()=>void this._refreshPeople()}
              @fp-close=${()=>this._peopleManagerOpen=!1}
            ></family-planner-people-manager-dialog>
          `:d}
      ${this._categoryManagerOpen?a`
            <family-planner-category-manager-dialog
              .hass=${this._hass}
              .categories=${this._categories}
              @fp-categories-changed=${()=>void this._refreshCategories()}
              @fp-close=${()=>this._categoryManagerOpen=!1}
            ></family-planner-category-manager-dialog>
          `:d}
    `}};b.styles=jt,c([u()],b.prototype,"_config",2),c([u()],b.prototype,"_view",2),c([u()],b.prototype,"_currentDate",2),c([u()],b.prototype,"_events",2),c([u()],b.prototype,"_people",2),c([u()],b.prototype,"_categories",2),c([u()],b.prototype,"_loading",2),c([u()],b.prototype,"_error",2),c([u()],b.prototype,"_connectionLost",2),c([u()],b.prototype,"_search",2),c([u()],b.prototype,"_selectedPersonIds",2),c([u()],b.prototype,"_selectedCategoryIds",2),c([u()],b.prototype,"_canWriteEvents",2),c([u()],b.prototype,"_isAdmin",2),c([u()],b.prototype,"_requirePerson",2),c([u()],b.prototype,"_enableCategories",2),c([u()],b.prototype,"_enableStatus",2),c([u()],b.prototype,"_createDraft",2),c([u()],b.prototype,"_editingEvent",2),c([u()],b.prototype,"_dialogError",2),c([u()],b.prototype,"_detailEvent",2),c([u()],b.prototype,"_dayDetail",2),c([u()],b.prototype,"_peopleManagerOpen",2),c([u()],b.prototype,"_categoryManagerOpen",2),b=c([T("family-planner-card")],b);window.customCards=window.customCards||[];window.customCards.push({type:"family-planner-card",name:"Family Planner",description:"Lokaler Familienkalender mit Personen, Kategorien und \xDCberlappungs-Ansicht.",preview:!0});})();
//# sourceMappingURL=family-planner-card.js.map
