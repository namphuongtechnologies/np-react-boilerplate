import { useSearchParams } from '@namphuongtechnologi/react';
import { z } from 'zod';
import { jpAxios } from '~/config/axios';
import { QueryService } from '~/config/query-client';

interface IPost {
  id: number;
}

const getPosts = async (payload?: { signal?: AbortSignal; params?: PostSchema }) => {
  const { signal, params } = payload ?? {};

  const { data } = await jpAxios.instance.get<IPost[]>('/posts', { signal, params });

  return data;
};

const postSchema = z.object({
  _limit: z.number().optional(),
});

type PostSchema = z.infer<typeof postSchema>;

const postsQuery = new QueryService({
  name: 'posts',
  schema: postSchema,
  fn: ({ signal, payload: { _limit } }) => getPosts({ signal, params: { _limit } }),
});

const searchSchema = z.object({
  keyword: z.string().optional(),
});

const Test = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    schema: searchSchema,
  });

  const { data, isLoading } = postsQuery.useQuery({
    _limit: 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className='space-y-10 p-5'>
      <div className='flex flex-col items-start'>
        <p>Post</p>
        <pre className='text-left text-xs'>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className='flex flex-col items-start gap-5'>
        <p>SearchParams</p>
        <button
          className='rounded-md border p-2'
          onClick={() => setSearchParams({ keyword: Math.random().toString(36).substring(7) })}
        >
          Random Keyword
        </button>
        <pre className='text-left text-xs'>{JSON.stringify(searchParams, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Test;
