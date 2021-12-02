const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const ftch = require('node-fetch');

const webhookClient = new WebhookClient({ id: config.id, token: config.token });

var map = new Map();


/* Function to check for new Anchor Airdrop */

const fetchAnchorAirdrop = async (airdropUrl: any, protocolName: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any; }; }) => {

      let mx = -1;
      for (var w in ans) {
        const currentStage = ans[w].stage;
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for anchor protocol:').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for anchor protocol: ${ res } `,
            username: 'Stader - Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
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

const fetchPylonAirdrop = async (airdropUrl: any, protocolName: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { claimableAirdrops: any; }) => {

      const protocolUrl = ans.claimableAirdrops;
      let mx = -1;

      for (var w in protocolUrl) {
        const currentStage = protocolUrl[w].stage;
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);

        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for pylon protocol').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for pylon protocol: ${res}`,
            username: 'Stader-Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
    });
}



/* Function to check for new Valkyrie Airdrop */

const fetchValkyrieAirdrop = async (airdropUrl: any, protocolName: any) => {
  const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');
  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { data: { items: any; }; }) => {

      const protocolUrl = ans.data.items;
      let mx = -1;

      for (var w in protocolUrl) {
        const currentStage = protocolUrl[w].stage;
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle('New Stage has appeared for valkyrie protocol').setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for valkyrie protocol: ${ res } `,
            username: 'Stader-Bot',
            avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
    });
}



function stage_new() {
  return ftch("https://www.postman.com/collections/cc2042cc71d5ce36ef30")
    .then((res: { json: () => any; }) => res.json())
    .then(async (text: { item: any; }) => {
      const postmanUrl = text.item;

      for (var x in postmanUrl) {
        console.log(postmanUrl[x].name);

        if (postmanUrl[x].name === "Mirror Airdrops") {
          const airdropUrl = postmanUrl[x].request.url.raw;
          const protocolName = postmanUrl[x].name;
          //await fetchMirrorAirdrop(fig, protocol_name);
        }

        if (postmanUrl[x].name === "Anchor Airdrops") {
          const airdropUrl = postmanUrl[x].request.url.raw;
          const protocolName = postmanUrl[x].name;
          await fetchAnchorAirdrop(airdropUrl, protocolName);
        }


        if (postmanUrl[x].name === "Pylon Airdrops") {
          const airdropUrl = postmanUrl[x].request.url;
          const protocolName = postmanUrl[x].name;
          await fetchPylonAirdrop(airdropUrl, protocolName);
        }


        if (postmanUrl[x].name === "Valkyrie Airdrops") {
          const airdropUrl = postmanUrl[x].request.url.raw;
          const protocolName = postmanUrl[x].name;
          await fetchValkyrieAirdrop(airdropUrl, protocolName);
        }
      }
    });
}

stage_new();