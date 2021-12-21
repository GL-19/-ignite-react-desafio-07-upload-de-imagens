import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = '' }) => {
      const response = await api.get(`api/images?after=${pageParam}`);
      return response.data;
    },
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastData => {
        // console.log('after: ', lastData?.after);

        if (lastData?.after) {
          return lastData.after;
        }
        return undefined;
      },
    }
  );

  // console.log('data: ', data);

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const cardsData = data?.pages
      .map(page => {
        return [...page.data];
      })
      .flat();

    return cardsData;
  }, [data]);

  // console.log('formattedData: ', formattedData);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {
          /* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage ? (
            <Button mt="1rem" onClick={() => fetchNextPage()}>
              Carregar mais
            </Button>
          ) : null
        }
      </Box>
    </>
  );
}
