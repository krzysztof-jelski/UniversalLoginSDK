import {TEST_ACCOUNT_ADDRESS, TEST_PRIVATE_KEY, createSignedMessage, Message} from '@universal-login/commons';

export const getTestSignedMessage = (overrides?: Partial<Message>) => createSignedMessage({from: TEST_ACCOUNT_ADDRESS, to: TEST_ACCOUNT_ADDRESS, ...overrides}, TEST_PRIVATE_KEY);

export default getTestSignedMessage;
