import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  categoryANDbrandAPI,
  categoryApi,
  getProduct,
  getProducts,
  Productsload,
  searchandFilterItem,
} from "./api";
// ////////////////

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["loadmoreProducts"],
    queryFn: Productsload,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.items.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },

    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
export function ProductsQuery() {
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });
}
export function ProductQuery(id: string) {
  return useQuery({
    queryKey: ["getProduct", { id }],
    queryFn: () => getProduct(id),
  });
}
export function searchProductQuery(debounced: string | undefined) {
  return useInfiniteQuery({
    queryKey: ["loadmoreANDsearch", { debounced }],
    queryFn: (pageParam) => searchandFilterItem(pageParam, debounced),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.items.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },

    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
export function categoryitem(
  Category: string | null | undefined,
  brand: string | null | undefined
) {
  return useInfiniteQuery({
    queryKey: ["category", { Category, brand }],
    queryFn: (pageParam) => categoryApi(pageParam, Category, brand),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.items.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },

    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
export function categoryANDbrand(
  Category: string | null | undefined,
  brand: string | null | undefined,
  sort?: string
) {
  return useQuery({
    queryKey: ["getProduct", { Category, brand, sort }],
    queryFn: () => categoryANDbrandAPI(Category, brand),
  });
}
