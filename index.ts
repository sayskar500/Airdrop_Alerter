import { Headers } from "node-fetch";

const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const ftch = require('node-fetch');

const webhookClient = new WebhookClient({ id: config.id, token: config.token });

var map = new Map();
const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');

/* Function to check for new Anchor Airdrop */

const fetchAnchorAirdrop = async (airdropUrl: any, protocolName: any) => {
  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any; }; }) => {

      var newStage = [];

      let mx = -1;
      for (var w in ans) {
        const currentStage = ans[w].stage;
        newStage.push(currentStage);
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        let totalAmount = 0;

        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);

          for (var z in newStage) {
            const currentAmount = newStage[z].amount;
            if (currentAmount > prevStage) totalAmount += currentAmount;
          }

          const embed1 = new MessageEmbed().setTitle(`New Stage/Stages have appeared for anchor protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
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




/* Function to check for new Orion Airdrop */

const fetchOrionAirdrop = async (airdropUrl: any, protocolName: any) => {
  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { claim: any; }) => {
      const oriondrops = ans.claim;
      const mx = oriondrops.stage;
      const totalAmount = oriondrops.amount;

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for anchor protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
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

const fetchMirrorAirdrop = async (airdropUrl: any, protocolName: any) => {
  var myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: "query airdrop(\r\n    $address: String!, \r\n    $network: String!){\r\n        airdrop(\r\n            address: $address, \r\n            network: $network)\r\n        },",
    variables: { "address": "terra1pdpkhjf3lzshe9kv884l6hchdxrulcxy4x2676", "network": "TERRA" }
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeader,
    body: graphql,
    redirect: 'follow'
  };

  ftch(airdropUrl, requestOptions)
    .then((response: { json: () => any; }) => response.json())
    .then((res: { data: { airdrop: any; }; }) => {
      const mirrorAirdrops = res.data.airdrop;
      const bbc = mirrorAirdrops.length;
      //console.log(bbc);
      if (bbc > 0) {
        var newStage = [];

        let mx = -1;

        for (var w in mirrorAirdrops) {
          const currentStage = mirrorAirdrops[w].stage;
          newStage.push(currentStage);
          mx = Math.max(mx, currentStage);
        }

        if (map.has(protocolName)) {
          const prevStage = map.get(protocolName);
          let totalAmount = 0;

          if (mx > prevStage) {
            map.delete(protocolName);
            map.set(protocolName, mx);

            for (var z in newStage) {
              const currentAmount = newStage[z].amount;
              if (currentAmount > prevStage) totalAmount += currentAmount;
            }

            const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for pylon protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
            webhookClient.send({
              //content: `New Stage has appeared for pylon protocol: ${res}`,
              username: 'Stader-Bot',
              avatarURL: 'https://imgur.com/4Zi1nQd',
              embeds: [embed, embed1],
            });
          }
        }
        else map.set(protocolName, mx);
      }
    });
}





/* Function to check for new Pylon Airdrop */

const fetchPylonAirdrop = async (airdropUrl: any, protocolName: any) => {

  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { claimableAirdrops: any; }) => {

      const protocolUrl = ans.claimableAirdrops;
      var newStage = [];
      let mx = -1;

      for (var w in protocolUrl) {
        const currentStage = protocolUrl[w].stage;
        newStage.push(currentStage);
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        let totalAmount = 0;

        for (var z in newStage) {
          const currentAmount = newStage[z].amount;
          if (currentAmount > prevStage) totalAmount += currentAmount;
        }

        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for pylon protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
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

  return ftch(airdropUrl)
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { data: { items: any; }; }) => {

      const protocolUrl = ans.data.items;

      var newStage = [];
      let mx = -1;

      for (var w in protocolUrl) {
        const currentStage = protocolUrl[w].stage;
        newStage.push(currentStage);
        mx = Math.max(mx, currentStage);
      }

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        let totalAmount = 0;

        for (var z in newStage) {
          const currentAmount = newStage[z].amount;
          if (currentAmount > prevStage) totalAmount += currentAmount;
        }

        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);
          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for valkyrie protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
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
        //console.log(postmanUrl[x].name);

        if (postmanUrl[x].name === "Mirror Airdrops") {
          const airdropUrl = postmanUrl[x].request.url.raw;
          const protocolName = postmanUrl[x].name;
          await fetchMirrorAirdrop(airdropUrl, protocolName);
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

        if (postmanUrl[x].name === "Orion Airdrops Proofs") {
          const airdropUrl = postmanUrl[x].request.url.raw;
          const protocolName = postmanUrl[x].name;
          await fetchOrionAirdrop(airdropUrl, protocolName);
        }

      }
    });
}

stage_new();
