/**
 * Defines content structure of a message content for empty list
 */
export interface EmptyListMessageContent {
    icon?: string;
    bottomicon?: string;
    styles?: {
        body?: {},
        text?: {},
        bottomiconRow?: {}
        bottomicon?: {}
    };
    messages: EmptyListMesage[];
}

/**
 * Empty List message
 */
export interface EmptyListMesage {
    text: string;
    fontStyle: MessageStyleEnum;
}

export const MessageStyleEnum = {
    light: 'light-font' as MessageStyleEnum,
    regular: 'regular-font' as MessageStyleEnum,
    medium: 'medium-font' as MessageStyleEnum,
    bold: 'bold-font' as MessageStyleEnum,
    italic: 'italic-font' as MessageStyleEnum
};

export type MessageStyleEnum = 'light' | 'regular' | 'italic' | 'bold';

export interface commonText {
	key: string;
	label: string;
}

export type PromptMessageTypeEnum = 'deleteContact' | 'deleteActivity' | 'ok' | 'confirm' | 'newDigitalLead' | 'newDigitalLeadTaken';
export const PromptMessageType = {
    deleteContact: 'deleteContact' as PromptMessageTypeEnum,
    deleteActivity: 'deleteActivity' as PromptMessageTypeEnum,
    ok: 'ok' as PromptMessageTypeEnum,
    confirm: 'confirm' as PromptMessageTypeEnum,
    newDigitalLead: 'newDigitalLead' as PromptMessageTypeEnum,
    newDigitalLeadTaken: 'newDigitalLeadTaken' as PromptMessageTypeEnum
};

export interface DateRange {
	startDate: String;
	endDate: String;
}

