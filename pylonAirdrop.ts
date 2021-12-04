import { map, webhookClient, config, ftch, MessageEmbed, WebhookClient, embed } from "./const";

const fetchPylonAirdrop = async () => {
  const protocolName = "Pylon Airdrops";
  return ftch("https://api.pylon.money/api/mine/v1/airdrop/terra14fcxl657lfusga8emxn923hfdqq8nkkvmve8s6")
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { claimableAirdrops: any; }) => {

      const protocolUrl = ans.claimableAirdrops;

      var newStage = [];
      var newPairs = new Map;

      for (var w in protocolUrl) {
        const currentStage = protocolUrl[w].stage;
        const currentAmount = protocolUrl[w].airdropMineAmount;
        newStage.push(currentStage);
        newPairs.set(currentStage, currentAmount);
      }

      newStage.reverse();
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

          const embed1 = new MessageEmbed().setTitle(`New Stage has appeared for pylon protocol providing a total amount of ${totalAmount}`).setColor('#0099ff');
          webhookClient.send({
            //content: `New Stage has appeared for pylon protocol: ${res}`,
            username: 'Stader-Bot',
            //avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
    });
}

export { fetchPylonAirdrop };