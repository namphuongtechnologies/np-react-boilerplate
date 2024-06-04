import { AxiosService, ReqMiddleWare, ResMiddleWare } from '@namphuongtechnologi/axios';

const JSON_UTF8_TYPE = 'application/json; charset=utf-8';
const JSON_TYPE = 'application/json';

const customResMiddleWare = ResMiddleWare.create<{
  contentTypes: string[];
}>({
  handler: (response, options) => {
    const { contentTypes } = options;

    if (contentTypes?.includes(response.headers['content-type']) && response.status !== 200) {
      throw new Error(response.statusText ?? 'Bad Request');
    }

    return response;
  },
});

export const jpAxios = new AxiosService({
  baseURL: 'https://jsonplaceholder.typicode.com',
  interceptors: {
    req: {
      middlewares: [
        ReqMiddleWare.removeFields({
          methods: ['put', 'delete', 'post'],
          startWithChar: '__',
        }),
      ],
    },
    res: {
      middlewares: [
        customResMiddleWare({
          contentTypes: [JSON_UTF8_TYPE, JSON_TYPE],
        }),
      ],
    },
  },
});
