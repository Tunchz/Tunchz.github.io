(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{487:function(t,e,o){"use strict";o.r(e),o.d(e,"SnippetElement",(function(){return d}));var r=o(1),n=o(339),i=o(67),s=o(394),l=o(395),a=o(396),h=o(397),c=o(398),p=function(t,e,o,r){var n,i=arguments.length,s=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(i<3?n(s):i>3?n(e,o,s):n(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s},u=function(t,e,o,r){return new(o||(o=Promise))((function(n,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function l(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(s,l)}a((r=r.apply(t,e||[])).next())}))};s.registerLanguage("javascript",l),s.registerLanguage("xml",a),s.registerLanguage("python",h),s.registerLanguage("bash",c);let d=class extends r.a{constructor(){super(...arguments),this.snippetUrl="",this.snippet="",this.mapSubstitutions=()=>({}),this._text="",this._md=new n({highlight:(t,e)=>{if(e&&s.getLanguage(e))try{return s.highlight(e,t).value}catch(t){}return""}})}requestUpdateSubstitutions(){this.requestUpdate()}_replaceVariables(t){return u(this,void 0,void 0,(function*(){const e=this.mapSubstitutions();for(const o of Object.keys(e)){const r=new RegExp(`{{${o}}}`,"gi");t=t.replace(r,e[o])}return t}))}_renderMarkdown(t){return this._md.render(t)}_updateText(){return u(this,void 0,void 0,(function*(){const t=yield this._replaceVariables(this._text),e=this.shadowRoot.querySelector("#snippet-container");if(e){e.innerHTML=this._renderMarkdown(t),e.querySelectorAll("a").forEach(t=>{t.setAttribute("target","_blank")});let o=0;e.querySelectorAll("pre").forEach(t=>{if(t.querySelector("code")){const e=document.createElement("tm-copy"),r="copy-"+o++;t.querySelector("code").setAttribute("id",r),e.setAttribute("for",r),t.appendChild(e)}})}}))}update(t){return t.has("snippetUrl")&&this.snippetUrl?fetch(this.snippetUrl,{mode:"cors"}).then(t=>t.text()).then(t=>{this._text=t,this._updateText()}).catch(t=>{this._text="Could not fetch snippet \n\n `"+t+"`",this._updateText()}):t.has("snippet")&&(this._text=this.snippet),this._updateText(),super.update(t)}render(){return r.d`
        <style>
            :host {
                display: block;
                height: 100%;
            }
            #snippet-container {
                width: 100%;
                height: 100%;
                margin: 0;
                /* max-height: 500px; */
                /* overflow: scroll; */
            }

            pre {
              background-color: #E8F0FE;
              padding: 10px;
              user-select: text;
              position: relative;
            }

            code {
              white-space: pre-wrap;

              font-family: var(--code-font-family, Roboto Mono, monospace);
              font-size: 12px;
              line-height: 14px;
              letter-spacing: 0px;
              font-weight: normal;
              font-style: normal;
              color: ${i.b.BlueDark};
            }

            .hljs {
              display: block;
              overflow-x: auto;
              padding: 0.5em;
              color: #333;
            }

            .hljs-comment,
            .hljs-quote {
              color: #61abea;
              font-style: italic;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-subst {
              color: ${i.b.BlueDark};
              font-weight: bold;
            }

            .hljs-number,
            .hljs-literal,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-tag .hljs-attr {
              color: ${i.b.OrangeDark};
            }

            .hljs-string,
            .hljs-doctag {
              color: ${i.b.RedDark};
            }

            .hljs-title,
            .hljs-section,
            .hljs-selector-id {
              color: ${i.b.RedDark};
              font-weight: bold;
            }

            .hljs-subst {
              font-weight: normal;
            }

            .hljs-type,
            .hljs-class .hljs-title {
              color: ${i.b.BlueDark};
              font-weight: bold;
            }

            .hljs-tag,
            .hljs-name,
            .hljs-attribute {
              color: ${i.b.OrangeDark};
              font-weight: normal;
            }

            .hljs-regexp,
            .hljs-link {
              color: #009926;
            }

            .hljs-symbol,
            .hljs-bullet {
              color: ${i.b.PurpleDark};
            }

            .hljs-built_in,
            .hljs-builtin-name {
              color: ${i.b.BlueDark};
              font-weight: bold;
            }

            .hljs-meta {
              color: #999;
              font-weight: bold;
            }

            .hljs-deletion {
              background: #fdd;
            }

            .hljs-addition {
              background: #dfd;
            }

            .hljs-emphasis {
              font-style: italic;
            }

            .hljs-strong {
              font-weight: bold;
            }

            tm-copy {
              position: absolute;
              right: 0;
              top: 0;
              white-space: normal;
            }

        </style>
        <div id="snippet-container">
        </div>`}};p([Object(r.e)({type:String})],d.prototype,"snippetUrl",void 0),p([Object(r.e)({type:String})],d.prototype,"snippet",void 0),d=p([Object(r.c)("tm-snippet")],d)}}]);