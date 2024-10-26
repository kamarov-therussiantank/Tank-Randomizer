// ==UserScript==
// @name        Tank-Randomizer
// @author      kamarov
// @description Bring an element of surprise to your tank customization experience with the Tank Randomizer,
// @version     1.1.0
// @namespace   https://github.com/kamarov-therussiantank
// @license     GPL-3.0
// @match       https://*.tanktrouble.com/*
// @desc        Randomizes your tank in just one click of a button.
// @run-at      document-end
// @grant       GM_addStyle
// @require     https://update.greasyfork.org/scripts/482092/1297984/TankTrouble%20Development%20Library.js
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/482239/Tank-Randomizer.user.js
// @updateURL https://update.greasyfork.org/scripts/482239/Tank-Randomizer.meta.js
// ==/UserScript==

GM_addStyle(`
.randomize-button {
  margin-bottom: 10px;
  height: 20px;
  width: 100px;
}
`);

whenContentInitialized().then(() => {
    var id = Users.getAllPlayerIds()[0];
    var turret = [];
    var back = [];
    var barrel = [];
    var front = [];
    var colours = [];
    var baseColor = '';

    function randomize() {
        randomizePaint();
        randomizeTankcessories();
    }

    function randomizeTankcessories() {
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
            'back',
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
            'turret',
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
            'front',
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
            'tread',
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
            'barrel',
            barrel[Math.floor(Math.random() * barrel.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizePaint() {
        randomizePaintC();
    }

    function randomizePaintC() {
        var selectedBaseColor = getRandomColorFromGarage();
        var selectedTurretColor = getRandomColorFromGarage();
        var selectedTreadColor = getRandomColorFromGarage();

        function setColorForPart(part, color) {
            Backend.getInstance().setColour(
                function (result) {
                    Users.updateUser(id, true, false);
                },
                function (result) { },
                function (result) { },
                id,
                part,
                color,
                Caches.getPlayerDetailsCache()
            );
        }

        setColorForPart('base', selectedBaseColor);
        setColorForPart('turret', selectedTurretColor);
        setColorForPart('tread', selectedTreadColor);
    }

    Backend.getInstance().getGarageContent(
        function (result) {
            boxes = result['boxes'];
            for (box in boxes) {
                accessories = boxes[box]['accessories'];
                sprays = boxes[box]['sprayCans'];
                for (accessory in accessories) {
                    thing = accessories[accessory];
                    if (thing['type'] == 'front') {
                        front.push(thing['value']);
                    }
                    if (thing['type'] == 'back') {
                        back.push(thing['value']);
                    }
                    if (thing['type'] == 'barrel') {
                        barrel.push(thing['value']);
                    }
                    if (thing['type'] == 'turret') {
                        turret.push(thing['value']);
                    }
                }
                for (spray in sprays) {
                    thing = sprays[spray]['colour'];
                    if (thing['type']) {
                        colours.push(thing['rawValue']);
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

    var snippet = $(`
        <div id="randomizerSnippet" class="snippet">
            <div class="header">Tank Randomizer</div>
            Inject a dash of unpredictability into your tank's appearance
            <hr>
            <div class="header" style="color: #e7c811; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Randomize</div>
        </div>
    `);
    var content = $('<div></div>');
    var allPartsButton = $('<button class="randomize-button button" type="button" tabindex="-1">All Parts</button>');
    var accessoriesButton = $('<button class="randomize-button button" type="button" tabindex="-1">Accessories</button>');
    var paintsButton = $('<button class="randomize-button button" type="button" tabindex="-1">Paints</button>');

    allPartsButton.on('mouseup', () => randomize());
    accessoriesButton.on('mouseup', () => randomizeTankcessoriesA());
    paintsButton.on('mouseup', () => randomizePaintC());

    content.append([allPartsButton, accessoriesButton, paintsButton]);
    snippet.append(content);
    $('#secondaryContent').append(snippet);

    function getRandomColorFromGarage() {
        return colours[Math.floor(Math.random() * colours.length)];
    }
});
