import { exit } from "process";
import { map, webhookClient, ftch, MessageEmbed, embed } from "./const";

const fetchAnchorAirdrop = async () => {
  return ftch("https://airdrop.anchorprotocol.com/api/get?address=terra14fcxl657lfusga8emxn923hfdqq8nkkvmve8s6&chainId=columbus-4")
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any, amount: any; }; }) => {

      const protocolName = "Anchor Airdrops";
      var newPairs = new Map;

      for (var w in ans) {
        const currentStage = ans[w].stage;
        const currentAmount = ans[w].amount;
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

          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for anchor protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for anchor protocol: ${ res } `,
            username: 'Stader-Bot',
            //avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, maxValue);
    });
}

export { fetchAnchorAirdrop };