!SLIDE intro
# js testing w/ js
### johnbender.github.com/presentation-jsinjs

!SLIDE
### @johnbender
### johnbender.us
### github.com/johnbender

!SLIDE center
<img src="vagrant_chilling.png" style="max-height: 600px; min-height: 450px"></img>

!SLIDE center
<img src="adobe.jpg" style="max-height: 600px"></img>

!SLIDE center
<img src="jquery-logo.png" style="max-height: 600px"></img>

!SLIDE
# motivation

!SLIDE
### open source

!SLIDE
### ship better software

!SLIDE
### scripts ⇒ applications

!SLIDE
### avoid frustration

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
## javascript

!SLIDE
### fast

!SLIDE
### easy mocking

!SLIDE bullets incremental
## libraries
* qunit
* jasmine

!SLIDE
### limited ci

!SLIDE
### single page

!SLIDE
### state/timing

!SLIDE
# problems

!SLIDE
## unit vs uat

!SLIDE bullets incremental
## unit
* fast
* fragile
* easy to mock

!SLIDE
<pre>
<span class="keyword">var</span> <span class="function-name">Notifier</span> = <span class="keyword">function</span>( <span class="js2-function-param">alertSelector</span> ) {
  <span class="builtin">this</span>.elem = $( alertSelector );
};

Notifier.prototype.<span class="function-name">notify</span> = <span class="keyword">function</span>() {
  <span class="keyword">if</span>( <span class="builtin">this</span>.isError(<span class="builtin">this</span>.elem.text()) ){
    <span class="builtin">this</span>.elem.addClass( <span class="string">"error"</span> );
  }

  <span class="builtin">this</span>.elem.show();
};

Notifier.prototype.<span class="function-name">isError</span> = <span class="keyword">function</span>( <span class="js2-function-param">text</span> ) {
  <span class="keyword">return</span> text.search(<span class="string">/Error/</span>) &gt;= 0;
};
</pre>

!SLIDE
<pre>
<span class="keyword">var</span> <span class="function-name">Notifier</span> = <span class="keyword">function</span>( <span class="js2-function-param">alertSelector</span> ) {
  <span class="builtin">this</span>.elem = $( alertSelector );
};

Notifier.prototype.<span class="function-name">notify</span> = <span class="keyword">function</span>() {
  <span class="keyword">if</span>( <span class="builtin">this</span>.isError(<span class="builtin">this</span>.elem.text()) ){
    <span class="builtin">this</span>.elem.addClass( <span class="string">"error"</span> );
  }

  <b><span class="builtin">this</span>.elem.show();</b>
};

Notifier.prototype.<span class="function-name">isError</span> = <span class="keyword">function</span>( <span class="js2-function-param">text</span> ) {
  <span class="keyword">return</span> text.search(<span class="string">/Error/</span>) &gt;= 0;
};
</pre>

!SLIDE
<pre>
test( <span class="string">"notify shows alert element"</span>, <span class="keyword">function</span>() {
  <span class="keyword">var</span> <span class="variable-name">notifier</span> = <span class="keyword">new</span> Notifier( <span class="string">"#alert"</span> );

  <span class="comment">// isolate the show in the notify method
</span>  Notifier.prototype.<span class="function-name">isError</span> = <span class="keyword">function</span>() {
    <span class="keyword">return</span> <span class="constant">false</span>;
  };

  notifier.notify();
  ok( notifier.elem.is(<span class="string">":visible"</span>) );
});</pre>

!SLIDE
<pre>
test( <span class="string">"notify shows alert element"</span>, <span class="keyword">function</span>() {
  <span class="keyword">var</span> <span class="variable-name">notifier</span> = <span class="keyword">new</span> Notifier( <span class="string">"#alert"</span> );

  <span class="comment">// isolate the show in the notify method
</span>  Notifier.prototype.<b><span class="function-name">isError</span></b> = <span class="keyword">function</span>() {
    <span class="keyword">return</span> <span class="constant">false</span>;
  };

  notifier.notify();
  ok( notifier.elem.is(<span class="string">":visible"</span>) );
});</pre>


!SLIDE bullets incremental
## uat
* slower
* harder to mock
* time sensitive

!SLIDE
<pre>
test( <span class="string">"empty input results in alert"</span>, <span class="keyword">function</span>() {
  $( <span class="string">"#username"</span> ).val(<span class="string">""</span>);

  $( <span class="string">"#submit"</span> ).click();

  ok( notifier.elem.is(<span class="string">":visible"</span>) );
});
</pre>

!SLIDE
## timing / events

!SLIDE
### <span class="monospace">setTimeout</span> is bad

!SLIDE iframe_slide
<iframe src="tests/timing/opacity.html"> </iframe>

!SLIDE
<pre>
<span class="css-selector">#jackie </span>{
    <span class="css-property">opacity</span>: 0;
}

<span class="css-selector">#jackie.opacity-transition </span>{
    -moz-transition: opacity <b>2s</b> linear;
    <span class="css-property">opacity</span>: 1;
}
</pre>

!SLIDE
<pre>
$( <span class="string">"#show-it"</span> ).click(<span class="keyword">function</span>(<span class="js2-function-param">e</span>) {
  $( <span class="string">"#jackie"</span> ).addClass( <span class="string">"opacity-transition"</span> );
});
</pre>

!SLIDE
<pre>
test( <span class="string">"image becomes opaque on click"</span>, <span class="keyword">function</span>() {
  setTimeout(<span class="keyword">function</span>(){
    same( $(<span class="string">"#jackie"</span>).css(<span class="string">"opacity"</span>), <span class="string">"1"</span> );
    start();
  }, <b>2100</b>);

  $( <span class="string">"#show-it"</span> ).click();

  stop();
});
</pre>

!SLIDE iframe_slide
<iframe data-src="tests/timing/opacity-test.html"> </iframe>

!SLIDE
<pre>
<span class="css-selector">#jackie.opacity-transition </span>{
  -moz-transition: opacity <b>4s</b> linear;
  <span class="css-property">opacity</span>: 1;
}
</pre>

!SLIDE iframe_slide
<iframe data-src="tests/timing/opacity-test-slow-fail.html"> </iframe>

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
$( <span class="string">"#jackie"</span> ).one( <span class="string">"transitionend"</span>, <span class="keyword">function</span>(){
  same( $(<span class="string">"#jackie"</span>).css(<span class="string">"opacity"</span>), <span class="string">"1"</span> );
  start();
});
</pre>

!SLIDE iframe_slide
<iframe data-src="tests/timing/opacity-test-slow-succeed.html"> </iframe>

!SLIDE bullets incremental
## ci
* difficult setup
* little library support
* fixtures ☹

!SLIDE
### jasmine

!SLIDE
### JSTestDriver

!SLIDE
### fixtures ☹

!SLIDE
### auto factories

!SLIDE
### server-side

!SLIDE
<pre class="large">
<span class="keyword">class</span> <span class="type">TestJS</span> &lt; <span class="type">Test</span>::<span class="type">Unit</span>::<span class="type">TestCase</span>
  include <span class="type">Capybara</span>

  <span class="keyword">def</span> <span class="function-name">setup</span>
    <span class="type">Factory</span>(<span class="constant">:foo</span>, <span class="constant">:bar</span> =&gt; <span class="string">"baz"</span>, <span class="constant">:bak</span> =&gt; <span class="string">"bing"</span>)
  <span class="keyword">end</span>

  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
<span class="keyword">end</span>
</pre>

!SLIDE
<pre>
  <span class="keyword">def</span> <span class="function-name">setup</span>
    <span class="type">Factory</span>(<span class="constant">:foo</span>, <span class="constant">:bar</span> =&gt; <span class="string">"baz"</span>, <span class="constant">:bak</span> =&gt; <span class="string">"bing"</span>)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    <b>visit(foos_path)</b>
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    <b>wait_for_tests</b>

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> <b>all_failing.empty?</b>
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    <b>fail_desc</b> = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">&amp;:</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    <b>assert(all_failing.empty?, fail_desc)</b>
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="large">
  <span class="keyword">def</span> <span class="function-name">wait_for_tests</span>(attempts=100)
    attempts.times <span class="keyword">do</span>
      <span class="keyword">break</span> <span class="keyword">if</span> find(<span class="string">"#qunit-banner"</span>)[<span class="constant">:class</span>].include?(<span class="string">"pass"</span>)
      <span class="keyword">break</span> <span class="keyword">unless</span> all_failing.empty?

      sleep 1
    <span class="keyword">end</span>
  <span class="keyword">end</span>
</pre>

!SLIDE iframe_slide
<iframe data-src="tests/timing/opacity-test-slow-succeed.html"> </iframe>

!SLIDE
<pre>
  <span class="keyword">def</span> <span class="function-name">all_failing</span>
    all(<span class="string">"#qunit-tests .fail"</span>)
  <span class="keyword">end</span>
</pre>

!SLIDE iframe_slide
<iframe data-src="tests/timing/opacity-test-slow-fail.html"> </iframe>

!SLIDE
<pre>
<span class="comment-delimiter"># </span><span class="comment">better as a middleware
</span><span class="keyword">def</span> <span class="function-name">inject_tests</span>
  <span class="keyword">if</span> <span class="type">Rails</span>.env.test?
    javascript_include_tag <span class="string">"qunit_tests"</span>
  <span class="keyword">end</span>
<span class="keyword">end</span>
</pre>

!SLIDE
### client-side

!SLIDE
<pre>
$.onlyForPathname( <span class="string">"/foos"</span>, <span class="keyword">function</span>() {
  module( <span class="string">"truthsaying"</span> );

  test( <span class="string">"truthyness"</span>, <span class="keyword">function</span>() {
    assert( <span class="constant">true</span> );
  });
});</pre>

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
### setup / teardown

!SLIDE
### iframes (?)

!SLIDE bullets
# thanks!
* @johnbender
* johnbender.us

<script>
// bind to custom event
$(".iframe_slide").bind("showoff:show", function (event) {
  var $target = $(event.target);
  $target.find("iframe").attr("src", $target.find("iframe").attr("data-src"));
});
</script>

