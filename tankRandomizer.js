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


// List of LockedAccessories
const backAccessories = ['27', '28', '29', '30', '31', '32'];
const frontAccessories = ['27', '28', '29', '30'];
const turretAccessories = ['27'];
const barrelAccessories = ['27', '28', '29', '30', '31', '32'];

// Store objects
var lockedAccessories = {
    back: backAccessories,
    front: frontAccessories,
    turret: turretAccessories,
    barrel: barrelAccessories
};

function randomizeTankcessoriesA() {
    // Function to apply a random accessory while considering locked accessories
    function applyRandomAccessory(part, availableAccessories) {
        let currentAccessory = getCurrentAccessory(part);
        const lockedForPart = lockedAccessories[part] || [];
        if (lockedForPart.includes(currentAccessory)) {
            console.log(`The ${part} accessory (ID: ${currentAccessory}) is locked, no randomization will occur.`);
            return;
        }


        // Filter out the locked accessories from the available ones for randomization
        const available = availableAccessories.filter(accessory => !lockedForPart.includes(accessory));
        if (available.length > 0) {
            const randomAccessory = available[Math.floor(Math.random() * available.length)];
            Backend.getInstance().setAccessory(
                function (result) {
                    Users.updateUser(id, true, false);
                },
                null,
                null,
                id,
                part,
                randomAccessory,
                Caches.getPlayerDetailsCache()
            );
        }
    }

    // Get the currently equipped accessory for a given part
    function getCurrentAccessory(part) {
        switch (part) {
            case 'back':
                return ['27', '28', '29', '30', '31', '32'];
            case 'front':
                return ['27', '28', '29', '30'];
            case 'turret':
                return ['27'];
            case 'barrel':
                return ['27', '28', '29', '30', '31', '32'];
            default:
                return null;
        }
    }

    // Apply accessories, avoiding locked ones for each part
    applyRandomAccessory('back', back);
    applyRandomAccessory('turret', turret);
    applyRandomAccessory('front', front);
    applyRandomAccessory('barrel', barrel);
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
            <hr>
            <div class="header" style="color: #e7c811; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Randomize</div>
        </div>
    `);
    var content = $('<div></div>');
    var accessoriesButton = $('<button class="randomize-button button" type="button" tabindex="-1">Accessories</button>');
    var paintsButton = $('<button class="randomize-button button" type="button" tabindex="-1">Paints</button>');

    accessoriesButton.on('mouseup', () => randomizeTankcessoriesA());
    paintsButton.on('mouseup', () => randomizePaintC());

    content.append([accessoriesButton, paintsButton]);
    snippet.append(content);
    $('#secondaryContent').append(snippet);

    function getRandomColorFromGarage() {
        return colours[Math.floor(Math.random() * colours.length)];
    }
});
