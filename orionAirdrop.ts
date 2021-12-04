import { map, webhookClient, config, ftch, MessageEmbed, WebhookClient, embed } from "./const";

const fetchOrionAirdrop = async () => {
  return ftch("https://airdrop-s52me5whda-ue.a.run.app/claim-message?address=terra1x0lstk53h5vmad9fw7d0uk4sxu467gww8vlnvp&stage=1&amount=200506648")
    .then((res: { json: () => any; }) => res.json())
    .then((ans: { claim: any; }) => {

      const protocolName = "Orion Airdrops Proofs";

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
            //avatarURL: 'https://imgur.com/4Zi1nQd',
            embeds: [embed, embed1],
          });
        }
      }
      else map.set(protocolName, mx);
    });
}

export { fetchOrionAirdrop };