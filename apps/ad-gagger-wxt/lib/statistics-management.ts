import { InteractionType } from '@/types/configurations';
import { statisticsStorage } from './storage-management';
import { emptyStatistics } from '@/types/statistics';

export const incrementInteractionStat = async (type: InteractionType) => {
    const stats = await statisticsStorage.getValue();
    const current = Math.max(0, Number(stats[type] ?? 0));
    const newCount = current + 1;
    await statisticsStorage.setValue({
        ...stats,
        [type]: newCount,
    });
    await statisticsStorage.setMeta({
        lastModified: Date.now(),
    });
    return newCount;
};

export const resetStatistics = async () => {
    await statisticsStorage.setValue(emptyStatistics);
    await statisticsStorage.setMeta({
        lastModified: Date.now(),
    });
};
