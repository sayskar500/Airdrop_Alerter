import { map, webhookClient, config, ftch, MessageEmbed, WebhookClient, embed } from "./const";

const fetchAnchorAirdrop = async () => {
  return ftch("https://airdrop.anchorprotocol.com/api/get?address=terra14fcxl657lfusga8emxn923hfdqq8nkkvmve8s6&chainId=columbus-4")
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { [x: string]: { stage: any, amount: any; }; }) => {

      const protocolName = "Anchor Airdrops";

      var newStage = [];
      var newPairs = new Map;

      for (var w in ans) {
        const currentStage = ans[w].stage;
        const currentAmount = ans[w].amount;
        newStage.push(currentStage);
        newPairs.set(currentStage, currentAmount);
      }

      let sz = newStage.length;
      sz -= 1;
      const mx = newStage[sz];

      if (map.has(protocolName)) {
        const prevStage = map.get(protocolName);
        let totalAmount = 0;

        if (mx > prevStage) {
          map.delete(protocolName);
          map.set(protocolName, mx);

          newPairs.forEach((value: any, key: any) => {
            const currntStg = key;
            const currntAmnt = parseInt(value);
            if (currntStg > prevStage) totalAmount += currntAmnt;
          });

          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for anchor protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for anchor protocol: ${ res } `,
            username: 'Stader-Bot',
            //avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
    });
}

export { fetchAnchorAirdrop };