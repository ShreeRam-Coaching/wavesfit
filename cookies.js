/* WAVES GYM cookie consent. No analytics/ads: only gates third-party embeds (Google Maps). */
(function(){
  var KEY='waves_consent',VER=1,MONTHS=6;
  function read(){try{var m=document.cookie.match(new RegExp('(?:^|; )'+KEY+'=([^;]*)'));if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c&&c.v===VER)return c}}catch(e){}return null}
  function write(embeds){var c={v:VER,embeds:!!embeds,t:Date.now()};var d=new Date();d.setMonth(d.getMonth()+MONTHS);
    try{document.cookie=KEY+'='+encodeURIComponent(JSON.stringify(c))+';expires='+d.toUTCString()+';path=/;SameSite=Lax'+(location.protocol==='https:'?';Secure':'')}catch(e){}
    return c}
  function applyEmbeds(on){
    document.querySelectorAll('iframe[data-consent-src]').forEach(function(f){
      if(on){if(!f.getAttribute('src'))f.setAttribute('src',f.getAttribute('data-consent-src'))}
      else{f.removeAttribute('src')}
    });
    document.querySelectorAll('[data-map-placeholder]').forEach(function(p){p.hidden=!!on});
  }
  var css='.cc-wrap{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;padding:max(.75rem,env(safe-area-inset-bottom)) .75rem .75rem;pointer-events:none}'+
  '.cc-box{pointer-events:auto;max-width:880px;margin:0 auto;background:#172124;border:1px solid #2B3739;border-top:2px solid #D7F36B;color:#F2F0E9;padding:1.1rem 1.25rem;font:400 14px/1.55 "Space Grotesk",system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)}'+
  '.cc-box h2{font:700 15px/1.2 "Syne","Space Grotesk",sans-serif;text-transform:uppercase;letter-spacing:.02em;margin:0 0 .4rem}'+
  '.cc-box p{margin:0 0 .9rem;color:#d9d7d0}.cc-box a{color:#D7F36B}'+
  '.cc-row{display:flex;flex-wrap:wrap;gap:.6rem}'+
  '.cc-btn{flex:1 1 140px;min-height:44px;padding:.7rem 1rem;font:600 11px/14px "Space Grotesk",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;border:1px solid #65716F;background:transparent;color:#F2F0E9}'+
  '.cc-btn:hover{border-color:#D7F36B;color:#D7F36B}.cc-btn.cc-p{background:#D7F36B;border-color:#D7F36B;color:#101719}.cc-btn.cc-p:hover{background:#F2F0E9;border-color:#F2F0E9;color:#101719}'+
  '.cc-opt{display:flex;gap:.9rem;align-items:flex-start;justify-content:space-between;border:1px solid #2B3739;padding:.8rem .9rem;margin:0 0 .6rem;background:#101719}'+
  '.cc-opt strong{display:block;font-size:14px}.cc-opt span{display:block;color:#a8b0ae;font-size:13px}'+
  '.cc-opt input{width:20px;height:20px;accent-color:#D7F36B;margin-top:2px;flex:none}'+
  '.cc-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:.8rem;padding:1.5rem 1.5rem 1.5rem;background:#172124;color:#F2F0E9;font:400 14px/1.55 "Space Grotesk",system-ui,sans-serif}.cc-ph[hidden]{display:none}.cc-ph p{margin:0;max-width:34ch;color:#d9d7d0}.cc-ph .cc-row{width:100%;max-width:420px}.cc-ph .cc-btn{flex:1 1 150px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;text-align:center}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var wrap=null,lastFocus=null;
  function close(){if(wrap){wrap.remove();wrap=null}if(lastFocus&&lastFocus.focus){try{lastFocus.focus()}catch(e){}}}
  function save(on){write(on);applyEmbeds(on);close()}
  function banner(){
    close();wrap=document.createElement('div');wrap.className='cc-wrap';
    wrap.innerHTML='<div class="cc-box" role="dialog" aria-labelledby="cc-t" aria-describedby="cc-d"><h2 id="cc-t">Your cookie choices</h2>'+
    '<p id="cc-d">We only use the cookie needed to remember your choice. We would also like to load the Google Maps map on this site, which lets Google set cookies. We do not use analytics or advertising cookies. See our <a href="cookies.html">Cookie Policy</a> and <a href="privacy.html">Privacy Policy</a>.</p>'+
    '<div class="cc-row"><button type="button" class="cc-btn" data-a="no">Decline</button><button type="button" class="cc-btn" data-a="set">Settings</button><button type="button" class="cc-btn cc-p" data-a="yes">Accept</button></div></div>';
    document.body.appendChild(wrap);bind(wrap);
    var f=wrap.querySelector('[data-a=yes]');f&&f.focus({preventScroll:true});
  }
  function settings(){
    var c=read()||{embeds:false};
    close();wrap=document.createElement('div');wrap.className='cc-wrap';
    wrap.innerHTML='<div class="cc-box" role="dialog" aria-modal="true" aria-labelledby="cc-t"><h2 id="cc-t">Cookie settings</h2>'+
    '<div class="cc-opt"><label for="cc-n"><strong>Strictly necessary</strong><span>Remembers your cookie choices. Always on.</span></label><input id="cc-n" type="checkbox" checked disabled></div>'+
    '<div class="cc-opt"><label for="cc-e"><strong>Third-party embeds (Google Maps)</strong><span>Shows the interactive map. Google may set cookies and receive your IP address.</span></label><input id="cc-e" type="checkbox"'+(c.embeds?' checked':'')+'></div>'+
    '<div class="cc-row"><button type="button" class="cc-btn" data-a="cancel">Cancel</button><button type="button" class="cc-btn cc-p" data-a="save">Save choices</button></div></div>';
    document.body.appendChild(wrap);bind(wrap);
    var f=wrap.querySelector('#cc-e');f&&f.focus({preventScroll:true});
  }
  function bind(root){
    root.addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;var a=b.getAttribute('data-a');
      if(a==='yes')save(true);else if(a==='no')save(false);else if(a==='set')settings();
      else if(a==='save')save(root.querySelector('#cc-e').checked);
      else if(a==='cancel'){close();if(!read())banner()}});
    root.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&root.querySelector('[data-a=cancel]')){close();if(!read())banner()}
      if(e.key==='Tab'){var els=root.querySelectorAll('button,input:not([disabled]),a[href]');if(!els.length)return;var f=els[0],l=els[els.length-1];
        if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus()}}
    });
  }
  function init(){
    var c=read();applyEmbeds(!!(c&&c.embeds));
    if(!c)banner();
    document.addEventListener('click',function(e){var t=e.target.closest('[data-cookie-settings]');if(t){e.preventDefault();lastFocus=t;settings()}
      var m=e.target.closest('[data-map-allow]');if(m){e.preventDefault();save(true)}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.WavesConsent={open:function(){settings()},get:read};
})();
