import { SharedAccessAuthorizationRule } from '../models/sharedAccessAuthorizationRule';

const delay = (milliseconds: number) => new Promise(delayedFunction => setTimeout(delayedFunction, milliseconds));
const DELAY = 200;

export const getHostName = async (): Promise<string> => {
    return delay(DELAY).then(() => 'hostName');
};

export const getSharedAccessAuthorizationRules = async (): Promise<SharedAccessAuthorizationRule[]> => {
    return delay(DELAY).then(() => [
        {
            name: 'sasRule1',
            permissions: 'enumeratedPermissions1',
            primaryKey: 'sasRuleKey1'
        },
        {
            name: 'sasRule2',
            permissions: 'enumeratedPermissions2',
            primaryKey: 'sasRuleKey2'
        }
    ]);
};
