import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './store/apiSlice';
import { RootState } from './store/store';
import useSWR from 'swr';

// APIエンドポイント
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const App: React.FC = () => {
  const dispatch = useDispatch<typeof fetchData>();
  const { data, loading, error } = useSelector((state: RootState) => state.api);

  // SWRを使ってデータをフェッチ
  const { data: swrData, error: swrError } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    if (swrData) {
      dispatch(fetchData(apiUrl));
    }
  }, [dispatch, swrData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || swrError) {
    return <div>Error: {error || swrError?.message}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {(data || swrData)?.map((item: { id: number; title: string }) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
