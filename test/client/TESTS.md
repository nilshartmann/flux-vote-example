Possible Tests
==============

Test non UI-components
----------------------
Test all the non ui stuff (ActionCreators, Dispatcher, Store) within a regular unit test, as long as those components
don't need the `FetchUtils` (requires `fetch` API to communicate with a running server).

* Possible Solution 1: Use (http://sinonjs.org/docs/#stubs-api)[Sinon Stubs] to mock the `FetchUtil`. See directory `integration`.
* Possible Solution 2: Again using sinon to mock FetchUtil but start an embedded server and inject calls from FetchUtil into the running instance.
* Problem: As components are 'singletons', their state is preserved between test runs. Must make sure to reset state after/before each test run


End-2-End-Test
--------------
Start a server, then use `PhantomJS` or (https://github.com/assaf/zombie)[Zombie] to simulate a browser. Run the app as a User would do, check
 the dom to see if it works correctly.
 


Tests UI components
-------------------
Use `jsdom` and  (https://facebook.github.io/react/docs/test-utils.html)[React `TestUtils`] to test the components.
Again a server is needed, as long as Backend can't be mocked.

