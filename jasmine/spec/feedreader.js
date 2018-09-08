/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    //Test RSS feed variable
    describe('RSS Feeds', function() {

        //Check allFeeds var is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Check if a feed's url is defined and not empty
        it('url defined', function() {
          for (let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });

        //Check if a feed's name is defined and not empty
        it('name defined', function() {
          for (let feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
          }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        //Check that the menu if hidden by defualt on page load
        it('menu hidden', function() {
          const body = document.querySelector('body');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        //Check that the menu can toggle on click
        it('menu toggle', function() {
          const body = document.querySelector('body');
          const menu = document.querySelector('.menu-icon-link');

          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
          //hide menu after test
          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

      //Load feed and wait until work is done
      beforeEach(function(done) {
          loadFeed(0,done);
      });

      //Check content exist
      it('load feed', function(){
          const feed = document.querySelector('.feed');
          expect(feed.children.length > 0).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        const feed = document.querySelector('.feed');
        const firstFeed = [];

        //Load feed and store firstFeed data then load second feed
        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){
              firstFeed.push(entry.innerText);
            })
            loadFeed(1, done);
        });

        //Compare current feed data with firstFeed data
        it ('content changes', function(){
            Array.from(feed.children).forEach(function(entry, i){
              expect(entry.innerText === firstFeed[i]).toBe(false);
            });
        });
    });
}());
