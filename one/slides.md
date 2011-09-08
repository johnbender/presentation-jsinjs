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

<span class="css-selector">#jackie.opacity-transition </span>{
    -webkit-transition: opacity <span style="color: red">2s</span> linear;
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
  }, <span style="color: red">2100</span>);

  $( <span class="string">"#show-it"</span> ).click();

  stop();
});
</pre>

!SLIDE
<iframe src="tests/timing/opacity-test.html"> </iframe>

!SLIDE
<pre>
<span class="css-selector">#jackie.opacity-transition </span>{
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
$( <span class="string">"#jackie"</span> ).one( <span class="string">"webkitTransitionEnd"</span>, <span class="keyword">function</span>(){
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
### jasmine

!SLIDE
### JSTestDriver

!SLIDE
### fixtures?

!SLIDE
### browser automation

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
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
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
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    <span style="color: red">visit(foos_path)</span>
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    <span style="color: red">wait_for_tests</span>

    fail_desc = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    fail_desc = <span class="keyword">unless</span> <span style="color: red">all_failing.empty?</span>
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    assert(all_failing.empty?, fail_desc)
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">test_qunit_page</span>
    visit(foos_path)
    wait_for_tests

    <span style="color: red">fail_desc</span> = <span class="keyword">unless</span> all_failing.empty?
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
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
      all_failing.find(<span class="string">".test-name"</span>).map(<span class="constant">:&amp;</span>text).join(<span class="string">", "</span>)
    <span class="keyword">end</span>

    <span style="color: red">assert(all_failing.empty?, fail_desc)</span>
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre class="medium">
  <span class="keyword">def</span> <span class="function-name">wait_for_tests</span>(attempts=100)
    attempts.times <span class="keyword">do</span>
      <span class="keyword">break</span> <span class="keyword">if</span> find(<span class="string">"#qunit-banner"</span>)[<span class="constant">:class</span>].include?(<span class="string">"pass"</span>)
      <span class="keyword">break</span> <span class="keyword">unless</span> all_failing.empty?

      sleep 1
    <span class="keyword">end</span>
  <span class="keyword">end</span>
</pre>

!SLIDE
<pre>
  <span class="keyword">def</span> <span class="function-name">all_failing</span>
    all(<span class="string">"#qunit-tests .fail"</span>)
  <span class="keyword">end</span>
</pre>


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
