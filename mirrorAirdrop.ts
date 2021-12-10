import { map, webhookClient, ftch, MessageEmbed, embed } from "./const";

import { Headers } from "node-fetch";

const fetchMirrorAirdrop = async () => {
  var myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");

  const protocolName = "Mirror Airdrops";

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

  ftch("https://graph.mirror.finance/graphql?airdrop", requestOptions)
    .then((response: { json: () => any; }) => response.json())
    .then((res: { data: { airdrop: any; }; }) => {
      const mirrorAirdrops = res.data.airdrop;
      const bbc = mirrorAirdrops.length;
      //console.log(bbc);
      if (bbc > 0) {
        var newPairs = new Map;

        for (var w in mirrorAirdrops) {
          const currentStage = mirrorAirdrops[w].stage;
          const currentAmount = mirrorAirdrops[w].amount;
          newPairs.set(currentStage, currentAmount);
        }

        let sz = newPairs.size;
        sz -= 1;
        const [protName, maxValue] = [...newPairs][sz];

        if (map.has(protocolName)) {
          const prevStage = map.get(protocolName);
          let totalAmount = 0;

          if (maxValue > prevStage) {
            map.delete(protocolName);
            map.set(protocolName, maxValue);

            for (var x = sz; x >= 0; x--) {
              const [key, value] = [...newPairs][x];
              if (value === prevStage) break;
              totalAmount += parseInt(value);
            }

            const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for mirror protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
            webhookClient.send({
              //content: `New Stage has appeared for pylon protocol: ${res}`,
              username: 'Stader-Bot',
              //avatarURL: 'https://imgur.com/4Zi1nQd',
              embeds: [embed, embed1],
            });
          }
        }
        else map.set(protocolName, maxValue);
      }
    });
}

export { fetchMirrorAirdrop };