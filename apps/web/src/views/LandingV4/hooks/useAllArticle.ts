import { AllArticleType, getArticle } from '@pancakeswap/blog'
import { useQuery } from '@tanstack/react-query'

const LIMIT = 10

export const useV4Articles = (): AllArticleType => {
  const { data: articlesData, isPending } = useQuery({
    queryKey: ['/latest-v4-articles'],

    queryFn: async () =>
      getArticle({
        url: '/articles',
        urlParamsObject: {
          populate: 'categories,image',
          sort: 'createAt:desc',
          pagination: { limit: LIMIT },
          filters: {
            $and: [
              {
                newsOutBoundLink: {
                  $null: true,
                },
              },
              {
                categories: {
                  name: {
                    $eq: 'Product', // V4
                  },
                },
              },
            ],
          },
        },
      }),

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    isFetching: isPending,
    articlesData: articlesData ?? {
      data: [],
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    },
  }
}

export const useV4NewsArticle = (): AllArticleType => {
  const { data: articlesData, isPending } = useQuery({
    queryKey: ['/v4-news'],

    queryFn: () =>
      getArticle({
        url: '/articles',
        urlParamsObject: {
          populate: 'categories,image',
          sort: 'createAt:desc',
          filters: {
            $and: [
              {
                categories: {
                  name: {
                    $eq: 'News',
                  },
                },
              },
              {
                categories: {
                  name: {
                    $eq: 'V4',
                  },
                },
              },
            ],
          },
          pagination: { limit: LIMIT },
        },
      }),

    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return {
    isFetching: isPending,
    articlesData: articlesData ?? {
      data: [],
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    },
  }
}