import { getChunksByMatch } from '../src/index';

describe('getChunksByMatch', () => {
    test('default', () => {
        const res = getChunksByMatch();
        expect(res).toEqual([]);
    });
    test('custom', () => {
        const assets = [
            {
                route: {
                    path: '/list',
                    exact: true,
                    component: {
                        chunk: () => 'list'
                    }
                },
                match: {
                    path: '/list',
                    url: '/list',
                    isExact: true,
                    params: {}
                }
            },
            {
                route: {
                    path: '/list/a',
                    exact: true,
                    component: {}
                },
                match: {
                    path: '/list/a',
                    url: '/list/a',
                    isExact: true,
                    params: {}
                }
            }
        ];
        expect(getChunksByMatch(assets)).toEqual(['list']);
    });
});