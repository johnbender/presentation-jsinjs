class TestJS < Test::Unit::TestCase
  include Capybara

  def setup
    Factory(:foo, :bar => "baz", :bak => "bing")
  end

  def test_qunit_page
    visit(foos_path)
    wait_for_tests

    fail_desc = unless all_failing.empty?
      all_failing.find(".test-name").map(:&text).join(", ")
    end

    assert(all_failing.empty?, fail_desc)
  end

  def wait_for_tests(attempts=100)
    attempts.times do
      # break if the tests have all passed
      break if find("#qunit-banner")[:class].include?("pass")

      # break of there are failing tests
      break unless all_failing.empty?

      sleep 1
    end
  end

  # get the failing test elements
  def all_failing
    all("#qunit-tests .fail")
  end
end
