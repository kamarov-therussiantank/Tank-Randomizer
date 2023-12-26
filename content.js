// ==UserScript==
// @name        Tank-Randomizer
// @author      Kamarov
// @description Bring an element of surprise to your tank customization experience with the Tank Randomizer!
// @version     0.0.2
// @namespace   https://github.com/kamarov-therussiantank
// @license     GPL-3.0
// @match       https://*.tanktrouble.com/*
// @desc        Randomize your tank in style!
// @run-at      document-end
// @require     https://update.greasyfork.org/scripts/482092/1297984/TankTrouble%20Development%20Library.js
// @noframes
// ==/UserScript==

whenContentInitialized().then(() => {
    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    var id = Users.getAllPlayerIds()[0];
    var turret = [];
    var back = [];
    var barrel = [];
    var front = [];
    var colours = [];
    var baseColor = "";

    function randomize() {
        randomizePaint();
        randomizeTankcessories();
    }

    function randomizeTankcessories() {
        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "back",
            back[Math.floor(Math.random() * back.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "turret",
            turret[Math.floor(Math.random() * turret.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "front",
            front[Math.floor(Math.random() * front.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "tread",
            Math.floor(Math.random() * 25) + 1,
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "barrel",
            barrel[Math.floor(Math.random() * barrel.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizePaint() {
        var selectedColor = colours[Math.floor(Math.random() * colours.length)];

        function setColorForPart(part) {
            Backend.getInstance().setColour(
                function (result) {
                    Users.updateUser(id, true, false);
                },
                function (result) { },
                function (result) { },
                id,
                part,
                selectedColor,
                Caches.getPlayerDetailsCache()
            );
        }

        setColorForPart("base");
        setColorForPart("turret");
        setColorForPart("tread");
    }

    function randomizeA() {
        randomizeTankcessoriesA();
    }

    function randomizeTankcessoriesA() {
        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "back",
            back[Math.floor(Math.random() * back.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "turret",
            turret[Math.floor(Math.random() * turret.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "front",
            front[Math.floor(Math.random() * front.length)],
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "tread",
            Math.floor(Math.random() * 25) + 1,
            Caches.getPlayerDetailsCache()
        );

        Backend.getInstance().setAccessory(
            function (result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            "barrel",
            barrel[Math.floor(Math.random() * barrel.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeC() {
        randomizePaintC();
    }

    function randomizePaintC() {
        var selectedColor = colours[Math.floor(Math.random() * colours.length)];

        function setColorForPart(part) {
            Backend.getInstance().setColour(
                function (result) {
                    Users.updateUser(id, true, false);
                },
                function (result) { },
                function (result) { },
                id,
                part,
                selectedColor,
                Caches.getPlayerDetailsCache()
            );
        }

        // Generate a new random color for each part
        setColorForPart("base");
        setColorForPart("turret");
        setColorForPart("tread");
    }

    Backend.getInstance().getGarageContent(
        function (result) {
            boxes = result["boxes"];
            for (box in boxes) {
                accessories = boxes[box]["accessories"];
                sprays = boxes[box]["sprayCans"];
                for (accessory in accessories) {
                    thing = accessories[accessory];
                    if (thing["type"] == "front") {
                        front.push(thing["value"]);
                    }
                    if (thing["type"] == "back") {
                        back.push(thing["value"]);
                    }
                    if (thing["type"] == "barrel") {
                        barrel.push(thing["value"]);
                    }
                    if (thing["type"] == "turret") {
                        turret.push(thing["value"]);
                    }
                }
                for (spray in sprays) {
                    thing = sprays[spray]["colour"];
                    if (thing["type"]) {
                        colours.push(thing["rawValue"]);
                    }
                }
            }

            // Randomly select the base color
            baseColor = colours[Math.floor(Math.random() * colours.length)];
        },
        function (res) { },
        function (res) { },
        id,
        Caches.getGarageContentCache()
    );


    $("#tertiaryContent").append(`
        <div class='snippet' tabindex='-1' style='min-width: 100px; background: background: linear-gradient(to bottom, #4c4c4c, black); font-family: "TankTrouble"; font-size: 9px; color: white;'>
            <h2><span class='text' style='font-family: "TankTrouble"; color: white;'>Meet Tank Randomizer!</span></h2>
            <p style='font-size: 11px;'>Inject a dash of unpredictability into your tank's appearance with the Tank Randomizer!</p>
            <p>-----------------------</p>
            <p style='font-size: 13px; color: gold;'>RANDOMIZE</p>
            <div style='text-align: center;'>
                <button class='randomize-button text' type='button' tabindex='-1' style='min-width: 34px; padding: 0 10px; font-family: "TankTrouble"; font-size: 10.5px; color: white;' onclick='randomize()'>All Parts</button>
                <button class='randomize-button text' type='button' tabindex='-1' style='min-width: 34px; padding: 0 10px; font-family: "TankTrouble"; font-size: 10px; color: white;' onclick='randomizeA()'>Accessories</button>
                <button class='randomize-button text' type='button' tabindex='-1' style='min-width: 34px; padding: 0 10px; font-family: "TankTrouble"; font-size: 10.5px; color: white;' onclick='randomizeC()'>Paints</button>
            </div>
        </div>
    `);



    // Apply margin-bottom through CSS to the buttons with the "randomize-button" class
    $(".randomize-button").css({
        'margin-bottom': '10px'
    });

    $("#secondaryContent").append(`
        <div class='snippet' tabindex='-1' style='min-width: 100px; background-image: color(#666666);'>
            <h1 class='text' style='font-family: "TankTrouble"; font-size: 5; color: #333333;'>⚙️FIX ME🔧</h1>
            <p><a class='report-bugs-link' href=https://greasyfork.org/en/scripts/482239-tank-randomizer/feedback' style='text-decoration: underline; color: black; cursor: pointer;'>Reportings here</a></p>
        </div>
    `);
});
