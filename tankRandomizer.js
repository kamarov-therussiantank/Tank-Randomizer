// ==UserScript==
// @name        Tank-Randomizer
// @author      kamarov
// @description Bring an element of surprise to your tank customization experience with the Tank Randomizer,
// @version     4.0.0
// @namespace   https://github.com/kamarov-therussiantank
// @license     GPL-3.0
// @match       https://*.tanktrouble.com/*
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
.partSelectAccessory, .partSelectPaint {
  cursor: pointer;
  outline: none;
  width: 78%;
  border: 1px solid var(--jq-borderColorDefault);
  border-radius: 5px;
  background: var(--jq-bgColorDefault) var(--jq-widget-button-disabled-hovered-or-active-bg) 50% 50% repeat-x;
  font-weight: 600;
  font-size: 11px;
  color: #555;
  margin-bottom: 5px;
  padding: 3px;
}
.partSelectAccessory:hover {
  color: #1a1a1a;
}
.partSelectPaint:hover {
  color: #1a1a1a;
}
:root.dark .partSelectAccessory:hover {
  color: #fff;
}
:root.dark .partSelectPaint:hover {
  color: #fff;
}
:root.dark .partSelectAccessory {
  color: #e7e7e7;
}
:root.dark .partSelectPaint {
  color: #e7e7e7;
}
.partSelectSection {
  font-size: 12px;
}
.partTexts {
  font-family: TankTrouble;
  font-size: 12px;
  color: #e7c811;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  margin-bottom: 5px;
  margin-top: 3px;
}
`);

whenContentInitialized().then(() => {
    var id = Users.getAllPlayerIds()[0];
    var turret = [];
    var back = [];
    var barrel = [];
    var front = [];
    var treads = [];
    var colours = [];
    var baseColor = '';

    function randomizeTurretPaint() {
        randomizeTurretColor();
    }

    function randomizeTurretColor() {
        Backend.getInstance().setColour(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'turret',
            colours[Math.floor(Math.random() * colours.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeBasePaint() {
        randomizeBaseColor();
    }

    function randomizeBaseColor() {
        Backend.getInstance().setColour(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'base',
            colours[Math.floor(Math.random() * colours.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeTreadsPaint() {
        randomizeTreadsColor();
    }

    function randomizeTreadsColor() {
        Backend.getInstance().setColour(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'tread',
            colours[Math.floor(Math.random() * colours.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeTurretAccessory() {
        randomizeTurretA();
    }

    function randomizeTurretA() {
        Backend.getInstance().setAccessory(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'turret',
            turret[Math.floor(Math.random() * turret.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeBarrelAccessory() {
        randomizeBarrelA();
    }

    function randomizeBarrelA() {
        Backend.getInstance().setAccessory(
            function(result) {
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

    function randomizeBackAccessory() {
        randomizeBackA();
    }

    function randomizeBackA() {
        Backend.getInstance().setAccessory(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'back',
            back[Math.floor(Math.random() * back.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeFrontAccessory() {
        randomizeFrontA();
    }

    function randomizeFrontA() {
        Backend.getInstance().setAccessory(
            function(result) {
                Users.updateUser(id, true, false);
            },
            null,
            null,
            id,
            'front',
            front[Math.floor(Math.random() * front.length)],
            Caches.getPlayerDetailsCache()
        );
    }

    function randomizeAllPartsAccessories() {
        randomizeFrontAccessory();
        randomizeBackAccessory();
        randomizeTurretAccessory();
        randomizeBarrelAccessory();
    }

    function randomizeAllPartsPaints() {
        randomizeTurretPaint();
        randomizeBasePaint();
        randomizeTreadsPaint();
    }

    Backend.getInstance().getGarageContent(
        function(result) {
            var boxes = result['boxes'];
            for (var box in boxes) {
                var accessories = boxes[box]['accessories'];
                var sprays = boxes[box]['sprayCans'];
                for (var accessory in accessories) {
                    var thing = accessories[accessory];
                    if (thing['type'] == 'front') {
                        front.push(thing['value']);
                    }
                    if (thing['type'] == 'back') {
                        back.push(thing['value']);
                    }
                    if (thing['type'] == 'tread') {
                        treads.push(thing['value']);
                    }
                    if (thing['type'] == 'barrel') {
                        barrel.push(thing['value']);
                    }
                    if (thing['type'] == 'turret') {
                        turret.push(thing['value']);
                    }
                }
                for (var spray in sprays) {
                    var thing = sprays[spray]['colour'];
                    if (thing['type']) {
                        colours.push(thing['rawValue']);
                    }
                }
            }
            baseColor = colours[Math.floor(Math.random() * colours.length)];
        },
        function(res) {},
        function(res) {},
        id,
        Caches.getGarageContentCache()
    );

    var snippet = $(`
        <div id="randomizerSnippet" class="snippet">
            <div class="header">Tank Randomizer</div>
            <hr>
            </div>
    `);

    var content = $('<div></div>');

    var accessoriesButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var barrelAccessoryButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var turretAccessoryButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var frontAccessoryButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var backAccessoryButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var paintButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var turretPaintButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var basePaintButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var treadsPaintButton = $('<button class="randomize-button button" type="button" tabindex="-1">Randomize</button>');
    var accessoryText = $('<div class="partTexts">Accessories</div>');
    var paintText = $('<div class="partTexts">Paints</div>');

    const createNewWrapper = $('<div class="createNewWrapper"></div>');
    const accessoryPartSelect = $("<select class='partSelectAccessory'></select>");
    const paintPartSelect = $("<select class='partSelectPaint'></select>");

    const allAccessoriesOption = $('<option value="allAccessory">All</option>');
        accessoryPartSelect.append(allAccessoriesOption);
    const barrelAccessoriesOption = $('<option value="barrelAccessory">Barrel</option>');
        accessoryPartSelect.append(barrelAccessoriesOption);
    const turretAccessoriesOption = $('<option value="turretAccessory">Turret</option>');
        accessoryPartSelect.append(turretAccessoriesOption);
    const frontAccessoriesOption = $('<option value="frontAccessory">Front</option>');
        accessoryPartSelect.append(frontAccessoriesOption);
    const backAccessoriesOption = $('<option value="backAccessory">Back</option>');
        accessoryPartSelect.append(backAccessoriesOption);
    const allPaintsOption = $('<option value="allPaints">All</option>');
        paintPartSelect.append(allPaintsOption);
    const turretPaintsOption = $('<option value="turretPaints">Turret</option>');
        paintPartSelect.append(turretPaintsOption);
    const basePaintsOption = $('<option value="basePaints">Base</option>');
        paintPartSelect.append(basePaintsOption);
    const treadsPaintsOption = $('<option value="treadsPaints">Treads</option>');
        paintPartSelect.append(treadsPaintsOption);

    accessoriesButton.on('mouseup', () => randomizeAllPartsAccessories());
    barrelAccessoryButton.on('mouseup', () => randomizeBarrelAccessory());
    turretAccessoryButton.on('mouseup', () => randomizeTurretAccessory());
    frontAccessoryButton.on('mouseup', () => randomizeFrontAccessory());
    backAccessoryButton.on('mouseup', () => randomizeBackAccessory());
    paintButton.on('mouseup', () => randomizeAllPartsPaints());
    turretPaintButton.on('mouseup', () => randomizeTurretPaint());
    basePaintButton.on('mouseup', () => randomizeBasePaint());
    treadsPaintButton.on('mouseup', () => randomizeTreadsPaint());

// Function to toggle buttons based on selection
function toggleButtonsBasedOnSelection() {
    const selectedAccessoryValue = accessoryPartSelect.val();
    const selectedPaintValue = paintPartSelect.val();

// Hide all buttons
    accessoriesButton.show();
    barrelAccessoryButton.hide();
    turretAccessoryButton.hide();
    frontAccessoryButton.hide();
    backAccessoryButton.hide();
    paintButton.show();
    turretPaintButton.hide();
    basePaintButton.hide();
    treadsPaintButton.hide();

// Show accessory buttons based on selection
    if (selectedAccessoryValue === "allAccessories") {
        accessoriesButton.show();
    } else if (selectedAccessoryValue === "barrelAccessory") {
        barrelAccessoryButton.show();
        accessoriesButton.hide();
    } else if (selectedAccessoryValue === "turretAccessory") {
        turretAccessoryButton.show();
        accessoriesButton.hide();
    } else if (selectedAccessoryValue === "frontAccessory") {
        frontAccessoryButton.show();
        accessoriesButton.hide();
    } else if (selectedAccessoryValue === "backAccessory") {
        backAccessoryButton.show();
        accessoriesButton.hide();
    }

// Show paint buttons based on selection
    if (selectedPaintValue === "allPaints") {
        paintButton.show();
    } else if (selectedPaintValue === "turretPaints") {
        turretPaintButton.show();
        paintButton.hide();
    } else if (selectedPaintValue === "basePaints") {
        basePaintButton.show();
        paintButton.hide();
    } else if (selectedPaintValue === "treadsPaints") {
        treadsPaintButton.show();
        paintButton.hide();
    }
}

// Event listeners for selection changes
   accessoryPartSelect.on('change', toggleButtonsBasedOnSelection);
   paintPartSelect.on('change', toggleButtonsBasedOnSelection);

// Append elements to the DOM
   createNewWrapper.append(accessoryText);
   createNewWrapper.append(accessoryPartSelect);
   createNewWrapper.append(accessoriesButton);
   createNewWrapper.append(barrelAccessoryButton);
   createNewWrapper.append(turretAccessoryButton);
   createNewWrapper.append(frontAccessoryButton);
   createNewWrapper.append(backAccessoryButton);
   createNewWrapper.append(paintText);
   createNewWrapper.append(paintPartSelect);
   createNewWrapper.append(paintButton);
   createNewWrapper.append(turretPaintButton);
   createNewWrapper.append(basePaintButton);
   createNewWrapper.append(treadsPaintButton);

 content.append(createNewWrapper);

 snippet.append(content);
$('#secondaryContent').append(snippet);

// Initial toggle based on current selection values
$(document).ready(function() {
    toggleButtonsBasedOnSelection();
});

    function getRandomColorFromGarage() {
        return colours[Math.floor(Math.random() * colours.length)];
    }
});
