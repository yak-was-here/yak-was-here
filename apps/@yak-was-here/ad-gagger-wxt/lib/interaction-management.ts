import { ElementConfiguration, InteractionType } from "@/types/configurations"
import { muteTabConditionally, unmuteTabConditionally } from "./tab-management";
import { ElementPresenceStatus } from "./observer-management";

export const interactWithElement = async (element: Element | null, elementConfiguration: ElementConfiguration, presence: ElementPresenceStatus, tabId: number) => {
    const interactionType = elementConfiguration.type;
    switch (interactionType) {
        case InteractionType.GAG:
            if (presence === ElementPresenceStatus.Appeared) {
                await muteTabConditionally(tabId);
            } else if (presence === ElementPresenceStatus.Disappeared) {
                await unmuteTabConditionally(tabId);
            }
            break;
        case InteractionType.CLICK:
            if (presence === ElementPresenceStatus.Appeared && element !== null) {
                performElementClick(element);
            }
            if (presence === ElementPresenceStatus.Appeared && element === null) {
                console.warn(`Could not perform click because no element was found for selector`, elementConfiguration.selector);
            }
            break;
    }
}

export const performElementClick = (element: Element) => {
    (element as HTMLButtonElement).click();
}
