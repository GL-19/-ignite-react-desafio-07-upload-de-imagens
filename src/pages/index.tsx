import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  async function fetchData({ pageParam = null }) {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchData, {
    getNextPageParam: lastPage => {
      return lastPage.after || null;
    },
  });

  // console.log('data: ', data);

  const formattedData = useMemo(() => {
    const imagesData = data?.pages
      .map(page => {
        return page.data;
      })
      .flat();

    return imagesData;
  }, [data]);

  // console.log('formattedData: ', formattedData);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && !isLoading) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="1rem"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
