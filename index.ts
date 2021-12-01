const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const ftch = require('node-fetch');

const webhookClient = new WebhookClient({ id: config.id, token: config.token });

var map = new Map();


/* Function to check for new Anchor Airdrop */

const fetchAnchorAirdrop = async (airdrop_url: any, protocol_name: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  ftch(airdrop_url)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any; }; }) => {

      let mx = -1;
      for (var w in ans) {
        const current_stage = ans[w].stage;
        mx = Math.max(mx, current_stage);
      }

      if (map.has(protocol_name)) {
        const prev = map.get(protocol_name);
        if (mx > prev) {
          map.delete(protocol_name);
          map.set(protocol_name, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for anchor protocol:').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for anchor protocol: ${ res } `,
            username: 'Stader - Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocol_name, mx);
    });
}


/* Function to check for new Mirror Airdrop */


// const fetchMirrorAirdrop = async (fig, protocol_name) => {
//   return ftch("https://graph.mirror.finance/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//           airdrop($address: String!, $network: String = \"TERRA\") {\n    airdrop(address: $address, network: $network)\n}
//           "{\n    \"address\": \"terra1pdpkhjf3lzshe9kv884l6hchdxrulcxy4x2676\",\n    \"network\": \"TERRA\"\n}"
//           `,
//     }),
//   })
//     .then((body) => {
//       console.log(body); // result
//     });
// }



/* Function to check for new Pylon Airdrop */

const fetchPylonAirdrop = async (airdrop_url: any, protocol_name: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  ftch(airdrop_url)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any; }; }) => {

      let mx = -1;

      for (var w in ans) {
        const current_stage = ans[w].stage;
        mx = Math.max(mx, current_stage);
      }

      if (map.has(protocol_name)) {
        const prev_stage = map.get(protocol_name);

        if (mx > prev_stage) {
          map.delete(protocol_name);
          map.set(protocol_name, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for pylon protocol').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for pylon protocol: ${res}`,
            username: 'Stader-Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocol_name, mx);
    });
}



/* Function to check for new Valkyrie Airdrop */

const fetchValkyrieAirdrop = async (airdrop_url: any, protocol_name: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  ftch(airdrop_url)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { data: { items: any; }; }) => {

      const protocol_url = ans.data.items;
      let mx = -1;

      for (var w in protocol_url) {
        const current_stage = protocol_url[w].stage;
        mx = Math.max(mx, current_stage);
      }

      if (map.has(protocol_name)) {
        const prev = map.get(protocol_name);
        if (mx > prev) {
          map.delete(protocol_name);
          map.set(protocol_name, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for valkyrie protocol').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for valkyrie protocol: ${ res } `,
            username: 'Stader-Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocol_name, mx);
    });
}



function stage_new() {
  ftch("https://www.postman.com/collections/cc2042cc71d5ce36ef30")
    .then((res: { json: () => any; }) => res.json())
    .then(async (text: { item: any; }) => {
      const postman_url = text.item;

      for (var x in postman_url) {
        console.log(postman_url[x].name);

        if (postman_url[x].name === "Mirror Airdrops") {
          const airdrop_url = postman_url[x].request.url.raw;
          const protocol_name = postman_url[x].name;
          //await fetchMirrorAirdrop(fig, protocol_name);
        }

        if (postman_url[x].name === "Anchor Airdrops") {
          const airdrop_url = postman_url[x].request.url.raw;
          const protocol_name = postman_url[x].name;
          await fetchAnchorAirdrop(airdrop_url, protocol_name);
        }


        if (postman_url[x].name === "Pylon Airdrops") {
          const airdrop_url = postman_url[x].claimableAirdrops;
          const protocol_name = postman_url[x].name;
          await fetchPylonAirdrop(airdrop_url, protocol_name);
        }


        if (postman_url[x].name === "Valkyrie Airdrops") {
          const airdrop_url = postman_url[x].request.url.raw;
          const protocol_name = postman_url[x].name;
          await fetchValkyrieAirdrop(airdrop_url, protocol_name);
        }
      }
    });
}

stage_new();