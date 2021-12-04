import { map } from "./const";
import { fetchAnchorAirdrop } from "./anchorAirdrop";
import { fetchMirrorAirdrop } from "./mirrorAirdrop";
import { fetchOrionAirdrop } from "./orionAirdrop";
import { fetchPylonAirdrop } from "./pylonAirdrop";
import { fetchValkyrieAirdrop } from "./valkyrieAirdrop";

map.set("Anchor Airdrops", 32);

async function stage_new() {
  await fetchAnchorAirdrop();
  await fetchMirrorAirdrop();
  await fetchOrionAirdrop();
  await fetchPylonAirdrop();
  await fetchValkyrieAirdrop();
}

stage_new();
