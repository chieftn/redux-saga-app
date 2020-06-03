import { SharedAccessAuthorizationRule } from '../models/sharedAccessAuthorizationRule';

export interface GetCompatibleSharedAccessAuthorizationRuleParameters {
    sharedAccessAuthorizationRules: SharedAccessAuthorizationRule[];
    permissionEnumeration: string;
}

export const getCompatibleSharedAccessAuthorizationRule = (parameters: GetCompatibleSharedAccessAuthorizationRuleParameters): SharedAccessAuthorizationRule => {
    return parameters[0];
};

export interface GenerateSharedAccessKeyParameters {
    sharedAccessAuthorizationRule: SharedAccessAuthorizationRule;
    durationInSeconds: number;
}

export const generateSharedAccessKey = (parameters: GenerateSharedAccessKeyParameters): string => {
    return 'authorizationkey';
};
