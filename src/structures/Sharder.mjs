import { ClusterManager } from 'discord-hybrid-sharding';
const validModes = [ "process", "worker "];

const getTotalShards = () => {
    if (!process.env.TOTAL_SHARDS) return "auto";
    if (process.env.TOTAL_SHARDS.toLowerCase() === "auto") return "auto";
    if (!isNaN(process.env.TOTAL_SHARDS) && Number(process.env.TOTAL_SHARDS) > 0) return Number(process.env.TOTAL_SHARDS);
    return "auto";
}

const getShardsPerCluster = () => !isNaN(process.env.SHARDS_PER_CLUSTER) && Number(process.env.SHARDS_PER_CLUSTER) > 0 ? Number(process.env.SHARDS_PER_CLUSTER) : 4;

const getShardingMode = () => process.env.SHARDING_MODE && validModes.includes(process.env.SHARDING_MODE.toLowerCase()) ? process.env.SHARDING_MODE : 'process'

export const CreateManager = () => {
    const manager = new ClusterManager(`${process.cwd()}/src/bot.mjs`, {
        totalShards: getTotalShards(),
        shardsPerClusters: getShardsPerCluster(),
        mode: getShardingMode(),
        token: process.env.DISCORD_TOKEN,
    });
    
    manager.on('clusterCreate', cluster => {
        // cluster.on("message", async (message) => {});
    });

    manager.spawn({ timeout: -1 });
};