/*

This is the spec file that Jasmine will work with.
Jasmine will test the following:

** RSS Feeds is defined and contains name(s) and link(s) **
** The menu is hidden right on start and gets displayed when menu is clicked **
** Entries is found from the feeds and makeing sure we dont load the same feed twice**

*/
$(function() {

    describe('RSS Feeds', function() {

        // Make sure thats AllFeeds is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds instanceof Array).toBeTruthy(); // Makes sure all in array is not empty
        });

        // Checks if items of AllFeed has link(s)
        it('have links', function() {
			for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            }
        });

        // Checks if items of AllFeed has name(s)
        it('have names', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });



    describe("The menu", function() {

        const menu = $(".menu-icon-link");

        // Checks if the menu is hidden by default
        it('are hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });


        // Checks if the menu is hidden or not on click
        it('are visible/hidden on click', function() {
            menu.click();
            expect($("body").hasClass("menu-hidden")).toEqual(false);

            menu.click();
            expect($("body").hasClass("menu-hidden")).toEqual(true);
        });

    });


    describe("Initial Entries", function() {

        // Avoiding duplicate setup
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Checks if at least one feed is found
        it('found atleast one entry from feed', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });


    });


    describe("New Feed Selection", function() {

        let firstFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {

                // firstFeed is first loaded here and that compared with the other one
                firstFeed = $(".feed").html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Make sure the content is not the same from the feeds
        it('loaded different feeds', function(done) {
            expect(firstFeed).not.toBe($(".feed").html());
            done();
        });

    });

}());
