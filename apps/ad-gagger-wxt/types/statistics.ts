import { InteractionType } from './configurations';

export interface Statistics {
    [InteractionType.CLICK]: number;
    [InteractionType.GAG]: number;
}

export const emptyStatistics: Statistics = {
    [InteractionType.CLICK]: 0,
    [InteractionType.GAG]: 0,
};
