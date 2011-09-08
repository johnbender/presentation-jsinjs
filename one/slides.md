!SLIDE
# js testing w/ js

!SLIDE center
<img src="adobe.jpg" style="max-height: 70%"></img>

!SLIDE center
<img src="vagrant_chilling.png" style="max-height: 70%; min-height: 65%"></img>

!SLIDE center
<img src="jquery-logo.png" style="max-height: 70%"></img>
!SLIDE bullets
* @johnbender
* johnbender.us

!SLIDE
# motivation

!SLIDE
### ship better software

!SLIDE
### Java<span style="text-decoration: line-through;">Script</span>

!SLIDE
### Java<span style="color: red">App</span>

!SLIDE
### scripts ⇒ applications

!SLIDE
# state of js testing

!SLIDE
## no testing

!SLIDE
### jquery plugins

!SLIDE
## browser automation

!SLIDE
### slow

!SLIDE
### time sensitive

!SLIDE
### cross page

!SLIDE
### <span class="heart">♥</span> language

!SLIDE
### ci

!SLIDE
## js

!SLIDE
### fast

!SLIDE
### easy mocking

!SLIDE bullets incremental
## libraries
* qunit
* jasmine
* etc

!SLIDE
### limited ci

!SLIDE
### single page

!SLIDE
### state/timing

!SLIDE
# existing issues

!SLIDE
## unit vs uat

!SLIDE bullets incremental
## unit
* fast
* fragile
* easy to mock

!SLIDE bullets incremental
## uat
* slower
* harder to mock

!SLIDE
## timing / events

!SLIDE
### <span class="monospace">setTimeout</span> is bad

!SLIDE
<iframe src="tests/timing/opacity.html"> </iframe>

!SLIDE
<pre>
<span class="css-selector">#jackie </span>{
    <span class="css-property">opacity</span>: 0;
}

<span class="css-selector">#jackie.opacity-animation </span>{
    -webkit-transition: opacity <span style="color: red">2s</span> linear;
    <span class="css-property">opacity</span>: 1;
}
</pre>

!SLIDE
<pre>
$( <span class="string">"#show-it"</span> ).click(<span class="keyword">function</span>(<span class="js2-function-param">e</span>) {
  $( <span class="string">"#jackie"</span> ).addClass( <span class="string">"opacity-animation"</span> );
});
</pre>

!SLIDE
<pre>
test( <span class="string">"image becomes opaque on click"</span>, <span class="keyword">function</span>() {
  setTimeout(<span class="keyword">function</span>(){
    same( $(<span class="string">"#jackie"</span>).css(<span class="string">"opacity"</span>), <span class="string">"1"</span> );
    start();
  }, <span style="color: red">2100</span>);

  $( <span class="string">"#show-it"</span> ).click();

  stop();
});
</pre>

!SLIDE
<iframe src="tests/timing/opacity-test.html"> </iframe>

!SLIDE
<pre>
<span class="css-selector">#jackie.opacity-animation </span>{
  -webkit-transition: opacity <span style="color: red">4s</span> linear;
  <span class="css-property">opacity</span>: 1;
}
</pre>

!SLIDE
<iframe src="tests/timing/opacity-test-slow-fail.html"> </iframe>

!SLIDE
### refactor to events

!SLIDE
<pre>
setTimeout(<span class="keyword">function</span>(){
  same( $(<span class="string">"#jackie"</span>).css(<span class="string">"opacity"</span>), <span class="string">"1"</span> );
  start();
}, 2100);
</pre>

!SLIDE
<pre>
$( <span class="string">"#jackie"</span> ).bind( <span class="string">"webkitTransitionEnd"</span>, <span class="keyword">function</span>(){
  same( $(<span class="string">"#jackie"</span>).css(<span class="string">"opacity"</span>), <span class="string">"1"</span> );
  start();
});
</pre>

!SLIDE
<iframe src="tests/timing/opacity-test-slow-succeed.html"> </iframe>

!SLIDE bullets incremental
## ci
* difficult setup
* little library support
* fixtures ☹

!SLIDE
### fixtures?

!SLIDE
### browser automation

!SLIDE
## browser state

!SLIDE
### DOM only

!SLIDE
### jasmine-jquery

!SLIDE
### QUnit fixtures

!SLIDE bullets incremental
## apps

* hash
* url pushstate/replacestate
* localstorage
* event bindings
* doc title

!SLIDE
# possible solutions

!SLIDE
## ci

!SLIDE
### jasmine

!SLIDE
### JSTestDriver

!SLIDE
### browser automation

!SLIDE
### capybara example select pass fail

!SLIDE
## timing / events

!SLIDE
### contrived

!SLIDE
### single page focused

!SLIDE
### jqm page navigation

!SLIDE
## browser state

!SLIDE
### setup / teardown

!SLIDE
### iframes (?)

!SLIDE bullets
# thanks!
* @johnbender
* johnbender.us
