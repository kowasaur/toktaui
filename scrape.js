// This was run on https://rankedboost.com/zelda-tears-of-the-kingdom/armor-upgrade-list/
// in the dev console to get the armour data (data.json)

const data = { armour: [], item_image: {} };

function itemAmount(itemDiv) {
    const [text_amount, name] = itemDiv.textContent.split("x").map(t => t.trim());
    if (!(name in data.item_image)) data.item_image[name] = itemDiv.querySelector("img").src;
    return { name, amount: parseInt(text_amount) };
}

for (const tr of document.querySelector("tbody").children) {
    // If can't upgrade
    if (tr.children.length === 3) continue;

    const a = tr.children[0];
    const name = a.querySelector(".rbss-object-name-pokedex-css-div").textContent.trim();
    const image = a.querySelector("img").src;

    const tiers = [];
    for (let i = 2; i <= 5; i++) {
        const td = tr.children[i];
        const items = [];
        tiers.push(items);

        for (let j = 1; j < td.children.length; j++) {
            items.push(itemAmount(td.children[j]));
        }
    }

    data.armour.push({ name, image, tiers });
}

console.log(JSON.stringify(data));
